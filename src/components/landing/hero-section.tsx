"use client";

import Image from "next/image";
import Threads from "../ui/threads";
import { ContainerScroll } from "../ui/container-scroll-animation";
import { InteractiveHoverButton } from "../ui/interactive-hover-button";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const mobile = useIsMobile();
  const router = useRouter();

  return (
    <motion.div className="w-full flex flex-col overflow-hidden md:h-[100rem]">
      {mobile ? (
        <div className="relative w-full h-screen overflow-hidden bg-white">
          <div className="absolute inset-0 z-0">
            <Threads />
            <div className="absolute inset-0 backdrop-blur-sm pointer-events-none" />
          </div>

          <div className="absolute inset-0 z-40 flex items-center justify-center">
            <div className="text-center px-6 py-10 max-w-4xl rounded-2xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="inline-flex items-center gap-2 text-xs font-semibold text-orange-800 border border-orange-500 bg-orange-100 px-4 py-1.5 rounded-full mb-5 tracking-wide"
              >
                <span className="w-4 h-4 flex items-center justify-center overflow-hidden">
                  <Image
                    src="/voxa-ai-logo.svg"
                    alt="AI"
                    width={0}
                    height={0}
                    className="w-full h-full object-cover"
                  />
                </span>
                Your Voice-Enabled Web Assistant
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-7xl font-extralight text-black mb-6 leading-tight tracking-tight"
              >
                Speak. Assist. Engage. Powered by Voxa AI.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-xs md:text-lg text-gray-700 mb-8"
              >
                Your voice-first experience for smarter, humanlike web
                interactions.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <InteractiveHoverButton>Start Talking</InteractiveHoverButton>
              </motion.div>
            </div>
          </div>
        </div>
      ) : (
        <ContainerScroll
          titleComponent={
            <div className="relative w-full h-screen overflow-hidden bg-white">
              {/* Background Threads and Blur */}
              <div className="absolute inset-0 z-0">
                <Threads />
                <div className="absolute inset-0 backdrop-blur-sm pointer-events-none" />
              </div>

              <div className="absolute inset-0 z-40 flex items-center justify-center">
                <div className="text-center px-6 py-10 max-w-4xl rounded-2xl">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-orange-800 border border-orange-500 bg-orange-100 px-4 py-1.5 rounded-full mb-5 tracking-wide"
                  >
                    <span className="w-4 h-4 flex items-center justify-center overflow-hidden">
                      <Image
                        src="/voxa-ai-logo.svg"
                        alt="AI"
                        width={0}
                        height={0}
                        className="w-full h-full object-cover"
                      />
                    </span>
                    Your Voice-Enabled Web Assistant
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl font-extralight text-black backdrop-blur-lg mb-6 leading-tight tracking-tight"
                  >
                    Speak. Assist. Engage. Powered by Voxa AI.
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-xs md:text-lg text-gray-700 mb-8"
                  >
                    Your voice-first experience for smarter, humanlike web
                    interactions.
                  </motion.p>

                  <motion.div
                    onClick={() => router.push("/auth/signup")}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <InteractiveHoverButton>
                      Start Talking
                    </InteractiveHoverButton>
                  </motion.div>
                </div>
              </div>
            </div>
          }
        >
          <img
            src="/voxa-ai-dashboard.png"
            alt="hero"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
          />
        </ContainerScroll>
      )}
    </motion.div>
  );
}
