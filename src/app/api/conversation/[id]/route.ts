import { ErrorHandler } from "@/lib/error";
import { NextRequest, NextResponse } from "next/server";
import client from "@/config/db";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;

    await client.message.deleteMany({
      where: { conversationId: id },
    });

    await client.conversation.delete({
      where: { id: id },
    });

    return NextResponse.json(
      { message: "Conversation deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return ErrorHandler(error);
  }
};
