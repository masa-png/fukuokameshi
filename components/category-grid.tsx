import Image from "next/image";
import Link from "next/link";
import { Category } from "@prisma/client";

interface FeaturedCategory {
  id: string | undefined;
  name: string;
  image: string;
}

interface CategoryGridProps {
  categories: Pick<Category, "id" | "name">[];
  featuredCategories: FeaturedCategory[];
}

const EXCLUDED_CATEGORIES = [
  "和食",
  "うどん",
  "丼物",
  "ラーメン",
  "おでん",
  "揚げ物",
] as const;

export default function CategoryGrid({
  categories,
  featuredCategories,
}: CategoryGridProps) {
  return (
    <>
      <h2 className="text-2xl font-bold mb-6">カテゴリから探す</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {featuredCategories.map((category) => (
          <div key={category.id ?? category.name}>
            <Link
              href={`/restaurants?categoryId=${category.id}`}
              className="block hover:opacity-80 transition-opacity"
            >
              <div className="relative h-40 rounded-lg overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 16vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <h3 className="text-white text-xl font-medium">
                    {category.name}
                  </h3>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="mb-12 flex flex-wrap gap-2">
        {categories.map(
          (category) =>
            !EXCLUDED_CATEGORIES.includes(category.name as any) && (
              <Link
                key={category.id}
                href={`/restaurants?categoryId=${category.id}`}
                className="px-4 py-2 text-sm border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
              >
                {category.name}
              </Link>
            )
        )}
      </div>
    </>
  );
}
