"use client";

import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/ui/terminal";
import { useEffect, useState } from "react";

export function OperationFlow() {
  const [key, setKey] = useState(0);

  const LOOP_DURATION = 7000;

  useEffect(() => {
    const interval = setInterval(() => {
      setKey((prev) => prev + 1);
    }, LOOP_DURATION);

    return () => clearInterval(interval);
  }, []);

  return (
    <Terminal>
      <AnimatedOperationFlow key={key} />
    </Terminal>
  );
}

function AnimatedOperationFlow() {
  return (
    <>
      <div className="mt-1">
        <AnimatedSpan delay={2000} className="text-green-500">
          <span>✔ Voice Input Received.</span>
        </AnimatedSpan>

        <AnimatedSpan delay={2500} className="text-green-500">
          <span>✔ Realtime Transcription.</span>
        </AnimatedSpan>

        <AnimatedSpan delay={3000} className="text-green-500">
          <span>✔ Intent Parsing + Contextualization.</span>
        </AnimatedSpan>

        <AnimatedSpan delay={3500} className="text-green-500">
          <span>✔ Model Routing (AI Model Selector).</span>
        </AnimatedSpan>

        <AnimatedSpan delay={4000} className="text-green-500">
          <span>✔ Response Generation.</span>
        </AnimatedSpan>

        <AnimatedSpan delay={4500} className="text-green-500">
          <span>✔ Realtime Response + Display.</span>
        </AnimatedSpan>

        <AnimatedSpan delay={5000} className="text-green-500">
          <span>✔ Integration Sync.</span>
        </AnimatedSpan>

        <AnimatedSpan delay={5500} className="text-green-500">
          <span>✔ Conversation Saved.</span>
        </AnimatedSpan>
      </div>
    </>
  );
}
