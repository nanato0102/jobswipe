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
          desiredRoles: "法人営業・ソリューション提案, 総合職・ビジネス総合",
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
          desiredRoles: "マーケティング・SNS・広報, 企画・ディレクター",
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

  // 4. 初期オファー & チャット履歴データの作成
  const existingOffers = await prisma.offer.count();
  if (existingOffers === 0) {
    // 佐藤健太への承諾済みオファーとチャット履歴
    const offer1 = await prisma.offer.create({
      data: {
        companyId: companyUser1.id,
        studentId: studentUser1.id,
        message: "佐藤さんの自己PR動画を拝見しました！体育会サッカー部主将として100名規模の組織を牽引された行動力と熱量に大変魅力を感じました。ぜひ一度カジュアル面談でお話しさせてください。",
        status: "ACCEPTED",
      },
    });

    await prisma.message.createMany({
      data: [
        {
          offerId: offer1.id,
          senderId: companyUser1.id,
          receiverId: studentUser1.id,
          content: "佐藤さん、オファーのご承諾ありがとうございます！テックイノベーション株式会社 採用担当の山田です。動画でのハキハキとした話し方がとても印象的でした。",
          sentAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
        },
        {
          offerId: offer1.id,
          senderId: studentUser1.id,
          receiverId: companyUser1.id,
          content: "山田様、温かいオファーをいただきありがとうございます！早稲田大学の佐藤健太です。御社のプロダクト開発と営業組織の連携にとても興味があります。ぜひ一度お話しさせてください！",
          sentAt: new Date(Date.now() - 1000 * 60 * 60 * 20),
        },
        {
          offerId: offer1.id,
          senderId: companyUser1.id,
          receiverId: studentUser1.id,
          content: "ご返信ありがとうございます！ぜひ来週あたりオンライン（30分程度）でカジュアル面談を実施できればと思いますが、ご都合のよい日時はございますでしょうか？",
          sentAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
        },
      ],
    });

    // 高橋美咲への承諾済みオファーとチャット履歴
    const offer2 = await prisma.offer.create({
      data: {
        companyId: companyUser1.id,
        studentId: studentUser2.id,
        message: "高橋さんのプレゼンテーション動画、素晴らしい表現力でした！カナダ留学で培われた異文化コミュニケーション力を当社のマーケティング部門で活かしていただきたくご連絡いたしました。",
        status: "ACCEPTED",
      },
    });

    await prisma.message.createMany({
      data: [
        {
          offerId: offer2.id,
          senderId: companyUser1.id,
          receiverId: studentUser2.id,
          content: "高橋さん、マッチングありがとうございます！当社のグローバルマーケティングチームについてぜひご紹介させてください。",
          sentAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
        },
        {
          offerId: offer2.id,
          senderId: studentUser2.id,
          receiverId: companyUser1.id,
          content: "オファーありがとうございます！上智大学の高橋美咲です。ぜひ詳しくお話をお聞きしたいです。よろしくお願いいたします！",
          sentAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
        },
      ],
    });
  }

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
