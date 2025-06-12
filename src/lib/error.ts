import { NextResponse } from "next/server";

export class ApiError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const ErrorHandler = (error: unknown) => {
  if (error instanceof ApiError) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode }
    );
  }
  return NextResponse.json(
    { message: "Something went wrong", error: error },
    { status: 500 }
  );
};
