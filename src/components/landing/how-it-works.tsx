"use client";

import { motion } from "framer-motion";
import { AutonomousAIChat } from "./chat-with-ai";
import { OperationFlow } from "./operation-flow";
import { OrbitingCirclesCardComp } from "./orbiting-circles";
import { Persistence } from "./persistence";
import { useIsMobile } from "@/hooks/use-mobile";

export default function HowItWorks() {
  const mobile = useIsMobile();
  return (
    <div className="w-full">
      <div className="w-full flex flex-col items-center text-center space-y-3">
        <motion.h1
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-4xl tracking-[-0.050em]"
        >
          Talk to Voxa. Get Things Done.
        </motion.h1>
        <motion.p
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="max-w-[20rem] text-sm md:text-base md:max-w-2xl text-neutral-500 font-balanced"
        >
          Voxa AI is your voice-first productivity partner. Just speak to plan,
          delegate, and gain insights—hands-free, in real time.
        </motion.p>
      </div>
      <div className="grid md:grid-cols-2 px-5 py-10 md:px-44 md:py-24 md:space-x-5 space-y-5">
        <motion.div
          whileInView={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.5 }}
          className="col-span-1 max-h-[28rem] border rounded-xl"
        >
          <div className="h-2/3 overflow-hidden relative">
            <OrbitingCirclesCardComp />
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          </div>
          <div className="flex flex-col justify-center px-5 h-1/3">
            <h1 className="text-lg font-semibold">
              AI Models, Unified by Voice
            </h1>
            <p className="text-sm text-justify">
              Voxa connects to GPT, Claude, Gemini, and more—delivering the best
              responses through voice.
            </p>
          </div>
        </motion.div>
        <motion.div
          whileInView={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.5 }}
          className="col-span-1 max-h-[28rem] border rounded-xl"
        >
          <div className="h-2/3 overflow-hidden relative">
            <AutonomousAIChat />
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          </div>
          <div className="flex flex-col justify-center px-5 h-1/3">
            <h1 className="text-lg font-semibold">Never Miss a Word</h1>
            <p className="text-sm text-justify">
              Voxa captures every word as you speak—instantly transcribing
              meetings, notes, and conversations with high accuracy.
            </p>
          </div>
        </motion.div>
        <motion.div
          whileInView={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.5 }}
          className="col-span-1 max-h-[28rem] border rounded-xl"
        >
          <div className="h-2/3 overflow-hidden relative">
            <OperationFlow />
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          </div>
          <div className="flex flex-col justify-center px-5 h-1/3">
            <h1 className="text-lg font-semibold">
              Realtime Collaboration, Supercharged
            </h1>
            <p className="text-sm text-justify">
              Voxa listens, understands, and acts in real time—coordinating
              tasks, surfacing answers, and syncing with your team effortlessly.
            </p>
          </div>
        </motion.div>
        <motion.div
          whileInView={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.5 }}
          className="col-span-1 max-h-[28rem] border rounded-xl"
        >
          <div className="h-2/3 overflow-hidden relative">
            <Persistence />
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          </div>
          <div className="flex flex-col justify-center px-5 h-1/3">
            <h1 className="text-lg font-semibold">
              Context That Stays With You
            </h1>
            <p className="text-sm text-justify">
              Conversations in Voxa are memory-aware—picking up where you left
              off, recalling decisions, and understanding the full picture.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
