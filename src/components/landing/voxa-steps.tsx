"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const items = [
  {
    title: "1. Sign In",
    description:
      "Create an account or log in to your Voxa AI dashboard. Your conversations are securely stored and synced across devices for seamless access.",
    src: "/voxa-ai-signin.png",
  },
  {
    title: "2. Start a Call",
    description:
      " No typing required—just speak naturally, and Voxa will listen, understand, and respond in real time. It’s like having a smart assistant ready to help, anytime you need.",
    src: "/voxa-ai-start-call.png",
  },
  {
    title: "3. Have a Conversation",
    description:
      " Ask your questions and get instant, spoken answers. Voxa understands your voice and responds clearly—like talking to a smart, helpful assistant.",
    src: "/voxa-ai-dashboard.png",
  },
];

export default function VoxaSteps() {
  const [turn, setTurn] = useState(1);
  const mobile = useIsMobile();

  useEffect(() => {
    const interval = setInterval(() => {
      setTurn((prev) => {
        const next = prev === 3 ? 1 : prev + 1;
        return next;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pb-5 md:pb-0">
      <div className="flex flex-col items-center">
        <motion.h1
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="text-center text-2xl md:text-4xl tracking-[-0.050em]"
        >
          Just 3 Steps to Get Started with Voxa AI
        </motion.h1>
      </div>
      {mobile && (
        <motion.div
          whileInView={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="w-full px-5 pt-5"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={turn}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full shadow-xl rounded-lg"
            >
              <Image
                src={items[turn - 1].src}
                alt={items[turn - 1].title}
                width={0}
                height={0}
                sizes="1"
                className="w-full rounded-lg"
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
      <div className="flex flex-col md:flex-row px-5 py-10 md:px-40 md:py-24 items-center md:space-x-7">
        <div className="md:w-1/2 space-y-14">
          {items.map((item, i) => {
            const isActive = turn === i + 1;
            if (mobile && !isActive) return null;

            return (
              <motion.div
                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                transition={{
                  duration: 0.5 + i / 10,
                  ease: "easeInOut",
                }}
                key={i}
                className="md:flex items-start space-y-3 md:space-y-0 md:space-x-5 max-w-lg h-[6rem]"
              >
                <div className="w-full h-[0.2rem] md:w-[0.3rem] md:h-full bg-neutral-300">
                  <motion.div
                    animate={
                      !mobile
                        ? {
                            height: isActive ? "100%" : "0",
                          }
                        : {
                            width: isActive ? "100%" : "0",
                          }
                    }
                    initial={{
                      height: mobile ? "100%" : "0",
                      width: mobile ? "0" : "100%",
                    }}
                    transition={{
                      duration: isActive ? 5 : 0,
                    }}
                    className="md:w-full bg-orange-500 rounded-full"
                  />
                </div>
                <div>
                  <h1 className="text-lg md:text-xl font-semibold">
                    {item.title}
                  </h1>
                  <p className="text-sm md:text-base text-neutral-500">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
        {!mobile && (
          <motion.div
            whileInView={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-1/2"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={turn}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.5 }}
                className="w-full shadow-xl rounded-lg"
              >
                <Image
                  src={items[turn - 1].src}
                  alt={items[turn - 1].title}
                  width={0}
                  height={0}
                  sizes="1"
                  className="w-full rounded-lg"
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
