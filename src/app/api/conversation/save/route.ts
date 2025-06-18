import { ApiError, ErrorHandler } from "@/lib/error";
import { NextRequest, NextResponse } from "next/server";
import client from "@/config/db";
import { MessageType } from "@/lib/types";
import { getServerSession } from "next-auth";
import { AUTH_OPTIONS } from "@/lib/auth";

export const POST = async (req: NextRequest) => {
  try {
    const payload = await req.json();
    const session = await getServerSession(AUTH_OPTIONS);
    const filteredMessages = payload.messages.filter(
      (msg: MessageType): msg is MessageType =>
        msg !== null && msg !== undefined
    );

    const response = await client.conversation.create({
      data: {
        userId: session?.user.id,
        messages: {
          create: filteredMessages.map(
            (msg: MessageType) =>
              msg !== null && {
                role: msg.role,
                text: msg.text,
              }
          ),
        },
      },
      include: {
        messages: true,
      },
    });
    if (!response) {
      throw new ApiError("Error saving conversations", 500);
    }
    return NextResponse.json(
      {
        message: "Conversations saved successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return ErrorHandler(error);
  }
};
