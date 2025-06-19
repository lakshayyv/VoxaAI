import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-between">
      <div className="space-y-7 md:space-y-0 md:flex items-start justify-between px-5 py-20 md:px-40">
        <div className="space-y-5 max-w-md">
          <motion.div
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex items-center space-x-3"
          >
            <Image src="/voxa-ai-logo.svg" alt="logo" width={36} height={36} />
            <h1 className="text-xl font-semibold">Voxa AI</h1>
          </motion.div>
          <motion.p
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            initial={{ opacity: 0, x: -30, y: 20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="text-justify md:text-left"
          >
            Voxa AI is a voice-first AI assistant that allows you to have
            natural, spoken conversations to get answers, insights, or
            support—hands-free and in real time.
          </motion.p>
          <motion.div
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            initial={{ opacity: 0, x: -30, y: 20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <Button
              onClick={() => router.push("/auth/signup")}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Get started today
            </Button>
          </motion.div>
        </div>
        <div className="space-y-3 md:space-y-7">
          <motion.h1
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="font-semibold"
          >
            Product
          </motion.h1>
          <div className="md:space-y-3">
            <motion.p
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              initial={{ opacity: 0, x: 50, y: 20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              Home
            </motion.p>
            <motion.p
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              initial={{ opacity: 0, x: 50, y: 20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              Features
            </motion.p>
            <motion.p
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              initial={{ opacity: 0, x: 50, y: 20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              How it works
            </motion.p>
            <motion.p
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              initial={{ opacity: 0, x: 50, y: 20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              FAQs
            </motion.p>
          </div>
        </div>
      </div>
      <div className="text-center py-3 bg-orange-100">
        <motion.h1
          whileInView={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="text-sm"
        >
          Copyright © 2025 Voxa AI - Developed by{" "}
          <Link
            className="text-orange-600 font-semibold"
            href="https://github.com/lakshayyv"
            target="_black"
          >
            Lakshay Verma
          </Link>
        </motion.h1>
      </div>
    </div>
  );
}
