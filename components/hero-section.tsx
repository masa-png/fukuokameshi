import Image from "next/image";

const HERO_IMAGES = [
  { src: "/images/main1.jpg", alt: "メイン画像1" },
  { src: "/images/main2.jpg", alt: "メイン画像2" },
  { src: "/images/main3.jpg", alt: "メイン画像3" },
] as const;

export default function HeroSection() {
  return (
    <div className="relative">
      <div className="relative w-full h-[500px]">
        <div className="flex">
          {HERO_IMAGES.map(({ src, alt }) => (
            <div key={src} className="relative w-full h-[500px]">
              <Image
                src={src}
                alt={alt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          ))}
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
  );
}
