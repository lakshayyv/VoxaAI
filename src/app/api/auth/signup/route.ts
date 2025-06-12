import { ErrorHandler } from "@/lib/error";
import { NextRequest, NextResponse } from "next/server";
import client from "@/config/db";
import bcrypt from "bcrypt";

export const POST = async (req: NextRequest) => {
  try {
    const payload = await req.json();
    payload.password = bcrypt.hashSync(
      payload.password,
      Number(process.env.SALT_ROUNDS) || 10
    );
    const response = await client.user.create({
      data: payload,
      select: { email: true },
    });

    return NextResponse.json({
      message: "Signup successful",
      data: response,
    });
  } catch (error) {
    return ErrorHandler(error);
  }
};
