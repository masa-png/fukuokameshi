import Image from "next/image";
import Link from "next/link";
import { Restaurant, Category } from "@prisma/client";

interface RestaurantCardProps {
  restaurant: Pick<Restaurant, "id" | "name" | "description" | "image"> & {
    category: Pick<Category, "id" | "name">;
  };
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const imageUrl = restaurant.image
    ? `/storage/${restaurant.image}`
    : "/images/no_image.jpg";

  return (
    <div>
      <Link
        href={`/restaurants/${restaurant.id}`}
        className="block hover:opacity-80 transition-opacity"
      >
        <div className="bg-white rounded-lg shadow-sm overflow-hidden h-full">
          <div className="relative h-40">
            <Image
              src={imageUrl}
              alt={restaurant.image ? "店舗画像" : "画像なし"}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 16vw"
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="font-medium mb-1 line-clamp-1">{restaurant.name}</h3>
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
      </Link>
    </div>
  );
}
