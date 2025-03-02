-- CreateTable
CREATE TABLE "会員情報" (
    "id" TEXT NOT NULL,
    "名前" TEXT NOT NULL,
    "メールアドレス" TEXT NOT NULL,
    "パスワード" TEXT NOT NULL,
    "郵便番号" TEXT,
    "住所" TEXT,
    "電話番号" TEXT,
    "登録日" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "更新日" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "会員情報_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "店舗情報" (
    "id" TEXT NOT NULL,
    "カテゴリID" TEXT NOT NULL,
    "店名" TEXT NOT NULL,
    "画像" TEXT,
    "説明" TEXT,
    "価格帯（下限）" INTEGER,
    "価格帯（上限）" INTEGER,
    "営業時間" TIMESTAMP(3),
    "閉店時間" TIMESTAMP(3),
    "郵便番号" TEXT,
    "住所" TEXT,
    "電話番号" TEXT,
    "定休日" TEXT,
    "登録日" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "更新日" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "店舗情報_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "予約" (
    "id" TEXT NOT NULL,
    "会員ID" TEXT NOT NULL,
    "店舗ID" TEXT NOT NULL,
    "予約日" TIMESTAMP(3) NOT NULL,
    "人数" INTEGER NOT NULL,
    "登録日" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "更新日" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "予約_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "レビュー" (
    "id" TEXT NOT NULL,
    "会員ID" TEXT NOT NULL,
    "店舗ID" TEXT NOT NULL,
    "星の数" INTEGER NOT NULL,
    "コメント" TEXT,
    "登録日" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "更新日" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "レビュー_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "カテゴリ" (
    "id" TEXT NOT NULL,
    "カテゴリ名" TEXT NOT NULL,
    "登録日" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "更新日" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "カテゴリ_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "会社情報" (
    "id" TEXT NOT NULL,
    "会社名" TEXT NOT NULL,
    "代表" TEXT,
    "設立日" TIMESTAMP(3),
    "郵便番号" TEXT,
    "住所" TEXT,
    "事業内容" TEXT,
    "登録日" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "更新日" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "会社情報_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "会員情報_メールアドレス_key" ON "会員情報"("メールアドレス");

-- AddForeignKey
ALTER TABLE "店舗情報" ADD CONSTRAINT "店舗情報_カテゴリID_fkey" FOREIGN KEY ("カテゴリID") REFERENCES "カテゴリ"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "予約" ADD CONSTRAINT "予約_会員ID_fkey" FOREIGN KEY ("会員ID") REFERENCES "会員情報"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "予約" ADD CONSTRAINT "予約_店舗ID_fkey" FOREIGN KEY ("店舗ID") REFERENCES "店舗情報"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "レビュー" ADD CONSTRAINT "レビュー_会員ID_fkey" FOREIGN KEY ("会員ID") REFERENCES "会員情報"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "レビュー" ADD CONSTRAINT "レビュー_店舗ID_fkey" FOREIGN KEY ("店舗ID") REFERENCES "店舗情報"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
