import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sanitizeString } from "@/lib/sanitizer";

export const dynamic = "force-dynamic";

const DEMO_FALLBACK_VIDEOS = [
  {
    id: "v-s1",
    studentId: "s1",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnailUrl: null,
    title: "体育会サッカー部主将としての挑戦と組織推進力",
    description: "100名規模のサッカー部主将として、チームを鼓舞しリーグ昇格を成し遂げたエピソードです。",
    tags: "発信・オープン型,現実・着実型,論理・合理型,柔軟・スピード型",
    uploadedAt: "2026-08-28T10:00:00.000Z",
    student: {
      id: "s1",
      fullName: "佐藤 健太",
      university: "早稲田大学 商学部",
      graduationYear: 2027,
      bio: "体育会サッカー部で100名規模の組織主将を務めています。「誰よりも声を出し、背中で引っ張る」を行動指針に、部員一人ひとりと対話を重ねながらリーグ昇格を果たしました。",
      skills: "チームリーダーシップ, 営業推進, 目標達成力",
      experience: "体育会サッカー部主将",
      desiredRoles: "法人営業・ソリューション提案, 総合職・ビジネス総合",
      user: { id: "u-s1", email: "kenta.sato@example.com" },
    },
  },
  {
    id: "v-s2",
    studentId: "s2",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    thumbnailUrl: null,
    title: "SNSマーケティング長期インターンとデータ分析",
    description: "月間100万PVを達成したコンテンツ企画力と、ユーザーインサイト分析についてお話しします。",
    tags: "発信・オープン型,ビジョン・発想型,共感・調和型,計画・完遂型",
    uploadedAt: "2026-08-28T11:00:00.000Z",
    student: {
      id: "s2",
      fullName: "高橋 美咲",
      university: "慶應義塾大学 総合政策学部",
      graduationYear: 2027,
      bio: "大学1年次よりSNSマーケティングベンチャーでインターンを行い、TikTok・Instagramの企画・分析を担当。ユーザーの心理を徹底的に分析し、再現性のあるコンテンツ設計を実践してきました。",
      skills: "SNSマーケティング, データ分析, コミュニケーション",
      experience: "SNSマーケティングベンチャー インターン1年半",
      desiredRoles: "マーケティング・SNS・広報, 企画・ディレクター",
      user: { id: "u-s2", email: "misaki.takahashi@example.com" },
    },
  },
  {
    id: "v-s3",
    studentId: "s3",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    thumbnailUrl: null,
    title: "カナダ留学と国際交流イベントでの挑戦",
    description: "1年間のカナダ留学と、多様なバックグラウンドを持つメンバーと協働したイベント運営の経験です。",
    tags: "発信・オープン型,ビジョン・発想型,共感・調和型,柔軟・スピード型",
    uploadedAt: "2026-08-27T14:00:00.000Z",
    student: {
      id: "s3",
      fullName: "伊藤 翼",
      university: "明治大学 経営学部",
      graduationYear: 2028,
      bio: "カナダへの1年間留学を経て、大学では留学生支援イベントを企画・運営。言語やバックグラウンドの異なるメンバーと協働し、信頼関係を築いてきました。",
      skills: "日常英会話(TOEIC 860), イベント企画, ファシリテーション",
      experience: "カナダ留学1年間, 国際交流サークル代表",
      desiredRoles: "総合職・ビジネス総合, 法人営業・ソリューション提案",
      user: { id: "u-s3", email: "tsubasa.ito@example.com" },
    },
  },
  {
    id: "v-s4",
    studentId: "s4",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
    thumbnailUrl: null,
    title: "AI画像解析アルゴリズムの研究とハッカソン挑戦",
    description: "生成AIを活用した画像解析システムの研究と、学生ハッカソンで最優秀賞を受賞した開発ストーリーです。",
    tags: "傾聴・集中型,ビジョン・発想型,論理・合理型,計画・完遂型",
    uploadedAt: "2026-08-26T09:30:00.000Z",
    student: {
      id: "s4",
      fullName: "渡辺 葵",
      university: "東京工業大学 情報理工学院",
      graduationYear: 2027,
      bio: "大学の研究室で機械学習および生成AIアルゴリズムを研究中。学生ハッカソンでは要件定義からバックエンド設計まで主導し最優秀賞を獲得しました。",
      skills: "Python, PyTorch, Next.js, アルゴリズム設計",
      experience: "学生AIハッカソン最優秀賞, 研究所インターン",
      desiredRoles: "エンジニア・IT技術職, 企画・ディレクター",
      user: { id: "u-s4", email: "aoi.watanabe@example.com" },
    },
  },
  {
    id: "v-s5",
    studentId: "s5",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    thumbnailUrl: null,
    title: "財務データ分析と業務自動化プロジェクト",
    description: "日商簿記1級の知見を活かし、フィンテックベンチャーでデータ集計の自動化をやり切った経験です。",
    tags: "傾聴・集中型,現実・着実型,論理・合理型,計画・完遂型",
    uploadedAt: "2026-08-25T16:00:00.000Z",
    student: {
      id: "s5",
      fullName: "鈴木 拓海",
      university: "一橋大学 経済学部",
      graduationYear: 2027,
      bio: "大学在学中に簿記1級を取得し、フィンテックベンチャーにて財務データの自動集計スクリプトを構築。数字のファクトに基づき、着実かつ誠実に成果を積み上げることが得意です。",
      skills: "日商簿記1級, 財務モデリング, Python/SQL",
      experience: "フィンテック企業 財務インターン",
      desiredRoles: "コンサルタント, 事務・バックオフィス",
      user: { id: "u-s5", email: "takumi.suzuki@example.com" },
    },
  },
  {
    id: "v-s6",
    studentId: "s6",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    thumbnailUrl: null,
    title: "使う人に寄り添うUI/UXデザインとプロトタイピング",
    description: "地域活性化プロジェクトで住民向けモバイルアプリのUI設計を行い、使いやすさを追求したプロセスです。",
    tags: "傾聴・集中型,現実・着実型,共感・調和型,柔軟・スピード型",
    uploadedAt: "2026-08-24T12:00:00.000Z",
    student: {
      id: "s6",
      fullName: "小林 結衣",
      university: "武蔵野美術大学 造形構想学部",
      graduationYear: 2027,
      bio: "使い手の心理に寄り添う直感的なUI/UXデザインを追求しています。地域活性化プロジェクトにて住民向けモバイルアプリの画面設計を担当し、利用率向上に貢献しました。",
      skills: "Figma, UI/UXデザイン, ユーザーインタビュー, プロトタイピング",
      experience: "デザインコンテスト入賞, 自治体連携プロジェクト",
      desiredRoles: "デザイナー・クリエイティブ, マーケティング・SNS・広報",
      user: { id: "u-s6", email: "yui.kobayashi@example.com" },
    },
  },
];

export async function GET() {
  try {
    const dbVideos = await prisma.video.findMany({
      include: {
        student: {
          include: {
            user: {
              select: { id: true, email: true },
            },
          },
        },
      },
      orderBy: { uploadedAt: "desc" },
    });

    if (dbVideos && dbVideos.length > 0) {
      return NextResponse.json(dbVideos);
    }
    return NextResponse.json(DEMO_FALLBACK_VIDEOS);
  } catch (error) {
    console.warn("DB not connected or query error in videos API:", error);
    return NextResponse.json(DEMO_FALLBACK_VIDEOS);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, tags, videoUrl, studentId } = body;

    if (!title || !videoUrl) {
      return NextResponse.json(
        { message: "タイトルと動画URLは必須です。" },
        { status: 400 }
      );
    }

    try {
      // 登録処理
      let targetProfile = null;
      if (studentId) {
        targetProfile = await prisma.studentProfile.findFirst({
          where: {
            OR: [
              { id: studentId },
              { userId: studentId },
              { user: { email: studentId } },
            ],
          },
        });
      }

      if (!targetProfile) {
        targetProfile = await prisma.studentProfile.findFirst();
      }

      if (!targetProfile) {
        const dummyUser = await prisma.user.create({
          data: {
            email: `student_${Date.now()}@jobswipe.jp`,
            password: "hashed_dummy_password",
            userType: "STUDENT",
            studentProfile: {
              create: {
                fullName: "デモ学生",
                university: "サンプル大学",
                graduationYear: 2026,
              },
            },
          },
          include: { studentProfile: true },
        });
        targetProfile = dummyUser.studentProfile;
      }

      const targetStudentId = targetProfile ? targetProfile.id : "";

      const newVideo = await prisma.video.create({
        data: {
          studentId: targetStudentId,
          title: sanitizeString(title),
          description: sanitizeString(description),
          tags: sanitizeString(tags),
          videoUrl: sanitizeString(videoUrl),
        },
      });

      return NextResponse.json({ success: true, video: newVideo });
    } catch (dbError) {
      console.warn("DB error on video upload:", dbError);
      return NextResponse.json({
        success: true,
        demoMode: true,
        video: {
          id: "vid-" + Date.now(),
          title,
          description,
          tags,
          videoUrl,
        },
      });
    }
  } catch (error) {
    console.error("Video POST error:", error);
    return NextResponse.json(
      { message: "サーバーエラーが発生しました。" },
      { status: 500 }
    );
  }
}
