import { ApiError, ErrorHandler } from "@/lib/error";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const param = await req.json();
    const payload = {
      contents: [
        {
          role: "user",
          parts: [{ text: param.transcript }],
        },
      ],
    };

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDCVakFelmyZ16wvH75vf0M-Vzfz-rEi6U`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    const audioPayload = {
      text: data.candidates[0].content.parts[0].text,
      model_id: "eleven_multilingual_v2",
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75,
      },
    };

    const audioResponse = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/nPczCjzI2devNBz1zQrb`,
      {
        method: "POST",
        headers: {
          Accept: "audio/mpeg",
          "Content-Type": "application/json",
          "xi-api-key": "sk_dfc42c8cae256c0b6d849d2f07494c18c94c8a9da7843235",
        },
        body: JSON.stringify(audioPayload),
      }
    );

    if (!response.ok) {
      throw new ApiError("Internal server error", 500);
    }

    const audioBuffer = await audioResponse.arrayBuffer();
    const audioBase64 = Buffer.from(audioBuffer).toString("base64");

    return NextResponse.json({ audio: audioBase64 }, { status: 200 });
  } catch (error) {
    return ErrorHandler(error);
  }
};
