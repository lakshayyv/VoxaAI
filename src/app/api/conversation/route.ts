import { AUTH_OPTIONS } from "@/lib/auth";
import { ErrorHandler } from "@/lib/error";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import client from "@/config/db";

export const GET = async (req: NextRequest) => {
  try {
    const session = await getServerSession(AUTH_OPTIONS);
    const response = await client.conversation.findMany({
      where: { userId: session?.user.id },
      include: { messages: true },
    });
    return NextResponse.json(
      { message: "Conversations fetched successfully", data: response },
      { status: 200 }
    );
  } catch (error) {
    return ErrorHandler(error);
  }
};