import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const defaultPassword = await bcrypt.hash("password123", 10);

  // 1. 学生ユーザーの作成
  const studentUser1 = await prisma.user.upsert({
    where: { email: "sato@example.com" },
    update: {},
    create: {
      email: "sato@example.com",
      password: defaultPassword,
      userType: "STUDENT",
      studentProfile: {
        create: {
          fullName: "佐藤 健太",
          university: "早稲田大学 商学部",
          graduationYear: 2026,
          bio: "体育会サッカー部主将。組織づくりと目標達成に向けた推進力に自信があります。",
          skills: "リーダーシップ, 組織マネジメント, 課題解決力, 英語日常会話",
          experience: "体育会サッカー部 主将 / カフェ店舗リーダー",
          videos: {
            create: {
              title: "体育会サッカー部主将 / チームを牽引する行動力",
              description: "大学4年間、体育会サッカー部の主将として100名規模の組織マネジメントを経験しました。困難な状況でも周囲を巻き込み、粘り強く結果を出す行動力が私の強みです！",
              tags: "体育会, リーダーシップ, 粘り強さ, 行動力",
              videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            },
          },
        },
      },
    },
  });

  const studentUser2 = await prisma.user.upsert({
    where: { email: "takahashi@example.com" },
    update: {},
    create: {
      email: "takahashi@example.com",
      password: defaultPassword,
      userType: "STUDENT",
      studentProfile: {
        create: {
          fullName: "高橋 美咲",
          university: "上智大学 外国語学部",
          graduationYear: 2026,
          bio: "カナダ留学経験者。TOEIC 920点。異文化コミュニケーションと明るい接客が得意です。",
          skills: "ビジネス英語, 異文化理解, ファシリテーション",
          experience: "カナダ交換留学 / インバウンド観光案内ボランティア",
          videos: {
            create: {
              title: "1年間のカナダ留学と英語でのプレゼンテーション力",
              description: "カナダでの1年間の交換留学を経て、多国籍なチームでのプロジェクト推進やプレゼンを多数経験しました。何事にも前向きに挑戦する明るい笑顔がチャームポイントです。",
              tags: "留学経験, 英語対応可, 笑顔, コミュニケーション",
              videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            },
          },
        },
      },
    },
  });

  // 2. 企業ユーザーの作成
  const companyUser1 = await prisma.user.upsert({
    where: { email: "hr@tech-innovations.jp" },
    update: {},
    create: {
      email: "hr@tech-innovations.jp",
      password: defaultPassword,
      userType: "COMPANY",
      companyProfile: {
        create: {
          companyName: "テックイノベーション株式会社",
          industry: "IT / Webサービス",
          websiteUrl: "https://example.com",
          description: "次世代のHR TechおよびAIソリューションを開発する急成長スタートアップ企業です。",
        },
      },
    },
  });

  // 3. 管理者ユーザーの作成
  await prisma.user.upsert({
    where: { email: "admin@jobswipe.jp" },
    update: {},
    create: {
      email: "admin@jobswipe.jp",
      password: defaultPassword,
      userType: "ADMIN",
    },
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
