import { PrismaClient } from "@prisma/client";
import HeroSection from "../../components/hero-section";
import SearchForm from "../../components/search-form";
import RestaurantCard from "../../components/restaurant-card";
import CategoryGrid from "../../components/category-grid";

const prisma = new PrismaClient();

export default async function Home() {
  const [highlyRatedRestaurants, newRestaurants, categories] =
    await Promise.all([
      prisma.restaurant.findMany({
        take: 6,
        include: {
          category: true,
        },
        orderBy: {
          createdAt: "desc",
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

  const featuredCategories = [
    { id: washoku?.id, name: "和食", image: "/images/washoku.jpg" },
    { id: udon?.id, name: "うどん", image: "/images/udon.jpg" },
    { id: don?.id, name: "丼物", image: "/images/don.jpg" },
    { id: ramen?.id, name: "ラーメン", image: "/images/ramen.jpg" },
    { id: oden?.id, name: "おでん", image: "/images/oden.jpg" },
    { id: fried?.id, name: "揚げ物", image: "/images/fried.jpg" },
  ];

  return (
    <div className="min-h-screen">
      <header></header>

      <main>
        <HeroSection />
        <SearchForm />

        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">評価が高いお店</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-12">
            {highlyRatedRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>

          <CategoryGrid
            categories={categories}
            featuredCategories={featuredCategories}
          />

          <h2 className="text-2xl font-bold mb-6">新規掲載店</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-12">
            {newRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </div>
      </main>

      <footer></footer>
    </div>
  );
}
