"use client";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const keyword = formData.get("keyword");
      router.push(
        `/restaurants?keyword=${encodeURIComponent(String(keyword))}`
      );
    },
    [router]
  );

  return (
    <div className="bg-gray-50 py-8 mb-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">キーワードから探す</h2>
        <form onSubmit={handleSubmit} className="max-w-2xl">
          <div className="flex">
            <input
              type="text"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-500 max-w-2xs"
              placeholder="店舗名・エリア・カテゴリ"
              name="keyword"
              defaultValue={searchParams.get("keyword") ?? ""}
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
  );
}
