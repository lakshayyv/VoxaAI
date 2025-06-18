"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import Image from "next/image";
import { useInView } from "framer-motion";

type Message = {
  sender: "user" | "ai";
  text: string;
};

const chatScript: Message[] = [
  {
    sender: "ai",
    text: "Hey There! I am Voxa AI. How can I help you?",
  },
  { sender: "user", text: "What's the weather today?" },
  {
    sender: "ai",
    text: "Today’s forecast shows clear skies with a high of 26°C.",
  },
  { sender: "user", text: "Great! And what about tomorrow?" },
  {
    sender: "ai",
    text: "Tomorrow will be partly cloudy with a chance of rain in the evening.",
  },
  { sender: "user", text: "Thanks! Can you set a reminder?" },
  { sender: "ai", text: "Absolutely. Your reminder has been set for 6 PM." },
];

export function AutonomousAIChat({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { amount: 0.3, once: false });

  const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typingText, setTypingText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (isInView) {
      setVisibleMessages([]);
      setCurrentIndex(0);
      setTypingText("");
      setIsTyping(false);
    }
  }, [isInView]);

  useEffect(() => {
    if (!isInView || currentIndex >= chatScript.length) return;

    const currentMessage = chatScript[currentIndex];
    let charIndex = 0;
    setTypingText("");
    setIsTyping(true);

    const typingInterval = setInterval(() => {
      charIndex++;
      setTypingText(currentMessage.text.slice(0, charIndex));

      if (charIndex >= currentMessage.text.length) {
        clearInterval(typingInterval);
        setTimeout(() => {
          setVisibleMessages((prev) => [...prev, currentMessage]);
          setTypingText("");
          setCurrentIndex((prev) => prev + 1);
          setIsTyping(false);
        }, 600);
      }
    }, 30);

    return () => clearInterval(typingInterval);
  }, [currentIndex, isInView]);

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-[360px] w-full max-w-md flex-col overflow-hidden rounded-xl p-4 shadow dark:border-white/10 dark:bg-zinc-900",
        className
      )}
    >
      <div className="scrollbar-hide flex-1 space-y-3 overflow-y-auto pr-1 text-sm leading-relaxed">
        {visibleMessages.map((msg, i) => (
          <div key={i} className="flex space-x-2">
            {msg.sender === "user" ? (
              <User className="mt-2 shrink-0" />
            ) : (
              <Image
                src="/voxa-ai-logo.svg"
                alt="logo"
                width={24}
                height={24}
              />
            )}
            <div
              className={cn("max-w-[80%] rounded-lg px-4 py-2", {
                "self-end bg-orange-500 text-white": msg.sender === "user",
                "self-start bg-gray-100 text-black dark:bg-white/10 dark:text-white":
                  msg.sender === "ai",
              })}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex space-x-2">
            {chatScript[currentIndex]?.sender === "user" ? (
              <User className="mt-2 shrink-0" />
            ) : (
              <Image
                src="/voxa-ai-logo.svg"
                alt="logo"
                width={24}
                height={24}
              />
            )}
            <div
              className={cn(
                "max-w-[80%] rounded-lg px-4 py-2",
                chatScript[currentIndex]?.sender === "ai"
                  ? "self-start bg-gray-100 text-black dark:bg-white/10 dark:text-white"
                  : "self-end bg-orange-500 text-white"
              )}
            >
              {typingText}
              <span className="animate-pulse">▍</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
