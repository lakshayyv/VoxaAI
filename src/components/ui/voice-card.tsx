import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { VoiceCardProps } from "@/lib/props";
import { getInitials } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function VoiceCard({ name, src, speaking }: VoiceCardProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
        className="relative w-full md:h-full bg-neutral-100 shadow-lg rounded-2xl p-6 border border-orange-100 flex flex-col items-center justify-center text-center overflow-hidden"
      >
        <div className="relative">
          {speaking && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 1, opacity: 0.4 }}
                  animate={{
                    scale: [1, 2.5],
                    opacity: [0.4, 0],
                  }}
                  transition={{
                    duration: 2 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: i * 0.4,
                  }}
                  className="absolute inset-0 w-28 h-28 mx-auto my-auto rounded-full border border-orange-400"
                />
              ))}
            </>
          )}

          <motion.div
            animate={
              speaking
                ? {
                    scale: [1, 1.12, 1.06, 1.15, 1],
                    rotate: [0, 1.5, -1.5, 0],
                    boxShadow: [
                      "0 0 0px rgba(255,165,0,0.4)",
                      "0 0 40px rgba(255,140,0,0.7)",
                      "0 0 20px rgba(255,100,0,0.5)",
                      "0 0 10px rgba(255,165,0,0.5)",
                    ],
                    filter: [
                      "brightness(100%) contrast(100%)",
                      "brightness(115%) contrast(130%)",
                      "brightness(110%) contrast(120%)",
                      "brightness(100%) contrast(100%)",
                    ],
                  }
                : {
                    scale: 1,
                    rotate: 0,
                    boxShadow: "none",
                    filter: "brightness(100%) contrast(100%)",
                  }
            }
            transition={{
              duration: 3,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="rounded-full p-1 relative"
          >
            <Avatar className="w-28 h-28 border-4 border-orange-300 shadow-md ring ring-orange-100 ring-offset-4">
              <AvatarImage
                src={src}
                alt={name}
                className="w-full h-full object-contain rounded-full"
              />
              <AvatarFallback>{getInitials(name)}</AvatarFallback>
            </Avatar>
          </motion.div>
        </div>

        <div className="mt-6">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="bg-orange-50 px-5 py-2 rounded-full text-xl font-bold text-orange-500 tracking-wide"
          >
            {name}
          </motion.h2>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
