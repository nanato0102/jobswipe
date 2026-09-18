import { NextResponse } from "next/server";
import { sendContactEmails, ContactEmailPayload } from "@/lib/mail";
 
export async function POST(req: Request) {
  try {
    const body: ContactEmailPayload = await req.json();
 
    if (!body.receiptNumber || !body.senderName || !body.email || !body.message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
 
    const result = await sendContactEmails(body);
 
    return NextResponse.json({
      success: true,
      message: "Contact inquiry processed",
      receiptNumber: body.receiptNumber,
      mode: result.mode || "unknown",
    });
  } catch (error: any) {
    console.error("[Contact API Error]:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
