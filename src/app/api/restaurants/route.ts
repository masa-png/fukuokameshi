import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const restaurants = await prisma.restaurant.findMany({
      include: {
        category: true,
        reviews: true,
      },
    });

    const highlyRatedRestaurants = restaurants
      .map((restaurant) => ({
        ...restaurant,
        averageRating:
          restaurant.reviews.reduce((acc, review) => acc + review.rating, 0) /
            restaurant.reviews.length || 0,
      }))
      .sort((a, b) => b.averageRating - a.averageRating)
      .slice(0, 6);

    const newRestaurants = await prisma.restaurant.findMany({
      take: 6,
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      highlyRatedRestaurants,
      newRestaurants,
    });
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return NextResponse.json(
      { error: "Failed to fetch restaurants" },
      { status: 500 }
    );
  }
}
