import Image from "next/image";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Category {
  id: string;
  name: string;
}

interface Restaurant {
  id: string;
  name: string;
  image: string | null;
  description?: string;
  category: Category;
}

export default async function Home() {
  // APIからデータを取得
  const [highlyRatedRestaurants, newRestaurants, categories] =
    await Promise.all([
      prisma.restaurant.findMany({
        take: 6,
        include: {
          category: true,
        },
        orderBy: {
          createdAt: "desc", // 一時的に作成日時でソート
        },
      }),
      prisma.restaurant.findMany({
        take: 6,
        include: {
          category: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.category.findMany(),
    ]);

  // カテゴリーの定数
  const washoku = categories.find((c) => c.name === "和食");
  const udon = categories.find((c) => c.name === "うどん");
  const don = categories.find((c) => c.name === "丼物");
  const ramen = categories.find((c) => c.name === "ラーメン");
  const oden = categories.find((c) => c.name === "おでん");
  const fried = categories.find((c) => c.name === "揚げ物");

  return (
    <div className="min-h-screen">
      <header></header>

      <main>
        <div className="relative">
          <div className="relative w-full h-[500px]">
            <div className="flex">
              <div className="relative w-full h-[500px]">
                <Image
                  src="/images/main1.jpg"
                  alt="メイン画像1"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-full h-[500px]">
                <Image
                  src="/images/main2.jpg"
                  alt="メイン画像2"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-full h-[500px]">
                <Image
                  src="/images/main3.jpg"
                  alt="メイン画像3"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="absolute inset-0 flex items-center bg-black/50">
              <div className="container mx-auto px-4">
                <h1 className="text-4xl md:text-5xl text-white font-bold mb-4">
                  福岡ならではの味を、
                  <br />
                  見つけよう
                </h1>
                <p className="text-lg md:text-xl text-white">
                  FUKUOKAMESHIは、
                  <br />
                  福岡県のB級グルメ専門のレビューサイトです。
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 py-8 mb-8">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">キーワードから探す</h2>
            <form
              method="get"
              action="/restaurants"
              className="max-w-2xl mx-auto"
            >
              <div className="flex">
                <input
                  type="text"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="店舗名・エリア・カテゴリ"
                  name="keyword"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-orange-500 text-white rounded-r-lg hover:bg-orange-600 transition-colors"
                >
                  検索
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">評価が高いお店</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-12">
            {highlyRatedRestaurants.map((restaurant) => (
              <div key={restaurant.id}>
                <a
                  href={`/restaurants/${restaurant.id}`}
                  className="block hover:opacity-80 transition-opacity"
                >
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden h-full">
                    <div className="relative h-40">
                      <Image
                        src={
                          restaurant.image
                            ? `/storage/${restaurant.image}`
                            : "/images/no_image.jpg"
                        }
                        alt={restaurant.image ? "店舗画像" : "画像なし"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium mb-1 line-clamp-1">
                        {restaurant.name}
                      </h3>
                      <div className="text-sm text-gray-500">
                        {restaurant.category.name}
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold mb-6">カテゴリから探す</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
            {[
              { id: washoku?.id, name: "和食", image: "/images/washoku.jpg" },
              { id: udon?.id, name: "うどん", image: "/images/udon.jpg" },
              { id: don?.id, name: "丼物", image: "/images/don.jpg" },
              { id: ramen?.id, name: "ラーメン", image: "/images/ramen.jpg" },
              { id: oden?.id, name: "おでん", image: "/images/oden.jpg" },
              { id: fried?.id, name: "揚げ物", image: "/images/fried.jpg" },
            ].map((category) => (
              <div key={category.id}>
                <a
                  href={`/restaurants?categoryId=${category.id}`}
                  className="block hover:opacity-80 transition-opacity"
                >
                  <div className="relative h-40 rounded-lg overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <h3 className="text-white text-xl font-medium">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>

          <div className="mb-12 flex flex-wrap gap-2">
            {categories.map(
              (category) =>
                ![
                  "和食",
                  "うどん",
                  "丼物",
                  "ラーメン",
                  "おでん",
                  "揚げ物",
                ].includes(category.name) && (
                  <a
                    key={category.id}
                    href={`/restaurants?categoryId=${category.id}`}
                    className="px-4 py-2 text-sm border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    {category.name}
                  </a>
                )
            )}
          </div>

          <h2 className="text-2xl font-bold mb-6">新規掲載店</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-12">
            {newRestaurants.map((restaurant) => (
              <div key={restaurant.id}>
                <a
                  href={`/restaurants/${restaurant.id}`}
                  className="block hover:opacity-80 transition-opacity"
                >
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden h-full">
                    <div className="relative h-40">
                      <Image
                        src={
                          restaurant.image
                            ? `/storage/${restaurant.image}`
                            : "/images/no_image.jpg"
                        }
                        alt={restaurant.image ? "店舗画像" : "画像なし"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium mb-1 line-clamp-1">
                        {restaurant.name}
                      </h3>
                      <div className="text-sm text-gray-500 mb-2">
                        {restaurant.category.name}
                      </div>
                      {restaurant.description && (
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {restaurant.description}
                        </p>
                      )}
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer></footer>
    </div>
  );
}
