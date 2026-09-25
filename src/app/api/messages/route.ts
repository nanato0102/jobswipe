import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sanitizeString } from "@/lib/sanitizer";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const offerId = searchParams.get("offerId");

    if (!offerId) {
      return NextResponse.json({ error: "offerId は必須です。" }, { status: 400 });
    }

    const offer = await prisma.offer.findUnique({
      where: { id: offerId },
      include: {
        messages: {
          orderBy: { sentAt: "asc" },
        },
      },
    });

    if (!offer) {
      return NextResponse.json({ messages: [] });
    }

    // もしメッセージテーブルに初期メッセージがなければ、Offer.message を最初のメッセージとして含める
    let resultMessages = offer.messages.map((m) => ({
      id: m.id,
      offerId: m.offerId,
      senderId: m.senderId,
      receiverId: m.receiverId,
      content: m.content,
      sentAt: m.sentAt.toISOString(),
      timestamp: m.sentAt.toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" }),
    }));

    if (resultMessages.length === 0 && offer.message) {
      resultMessages = [
        {
          id: `offer-init-${offer.id}`,
          offerId: offer.id,
          senderId: offer.companyId,
          receiverId: offer.studentId,
          content: offer.message,
          sentAt: offer.createdAt.toISOString(),
          timestamp: offer.createdAt.toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" }),
        },
      ];
    }

    return NextResponse.json({ messages: resultMessages });
  } catch (error) {
    console.error("Messages GET API error:", error);
    return NextResponse.json({ messages: [] }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { offerId, senderId, receiverId, content, attachment } = body;

    if (!offerId || !content || !senderId) {
      return NextResponse.json({ error: "必須項目が不足しています。" }, { status: 400 });
    }

    const sanitizedContent = sanitizeString(content);

    // オファーの存在確認とreceiverIdの解決
    const offer = await prisma.offer.findUnique({
      where: { id: offerId },
    });

    if (!offer) {
      return NextResponse.json({ error: "該当するオファーが見つかりません。" }, { status: 404 });
    }

    const resolvedReceiverId =
      receiverId || (senderId === offer.companyId ? offer.studentId : offer.companyId);

    // 添付ファイルがある場合はコンテンツに付加または整形
    let finalContent = sanitizedContent;
    if (attachment && attachment.url) {
      finalContent = `[添付ファイル: ${attachment.name || "ファイル"}](${attachment.url})\n\n${sanitizedContent}`;
    }

    const newMessage = await prisma.message.create({
      data: {
        offerId,
        senderId,
        receiverId: resolvedReceiverId,
        content: finalContent,
      },
    });

    return NextResponse.json({
      success: true,
      message: {
        id: newMessage.id,
        offerId: newMessage.offerId,
        senderId: newMessage.senderId,
        receiverId: newMessage.receiverId,
        content: newMessage.content,
        sentAt: newMessage.sentAt.toISOString(),
        timestamp: newMessage.sentAt.toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" }),
      },
    });
  } catch (error) {
    console.error("Messages POST API error:", error);
    return NextResponse.json({ error: "メッセージ送信に失敗しました。" }, { status: 500 });
  }
}
