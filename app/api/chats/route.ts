import { NextResponse } from "next/server";
import { getDefaultUser, listChatsForApi } from "@/lib/data";

export async function GET() {
  try {
    const user = await getDefaultUser();
    const chats = await listChatsForApi(user.id);

    return NextResponse.json({ chats });
  } catch (error) {
    console.error("Chats API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
