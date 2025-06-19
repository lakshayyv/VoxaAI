import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { motion } from "framer-motion";

const faq = [
  {
    question: "What is Voxa AI?",
    answer:
      "Voxa AI is a voice-first AI assistant that allows you to have natural, spoken conversations to get answers, insights, or support—hands-free and in real time.",
  },
  {
    question: "How do I start using Voxa AI?",
    answer:
      "Simply sign in to your account, tap “Start Call,” and begin speaking. Voxa listens, understands your questions, and responds instantly.",
  },
  {
    question: "Do I need to install anything?",
    answer:
      "No downloads required. Voxa AI runs directly in your browser or app, so you can start using it without installing any additional software.",
  },
  {
    question: "What can I ask Voxa AI?",
    answer:
      "You can ask anything—from general knowledge questions to specific help with tasks, processes, or information unique to your business or context.",
  },
  {
    question: "Is my voice data secure?",
    answer:
      "Yes. All conversations are encrypted and securely stored. We prioritize user privacy and follow strict data protection protocols.",
  },
  {
    question: "Can Voxa AI understand different accents or languages?",
    answer:
      "Voxa AI is designed to understand a wide range of English accents. Support for multiple languages and localized speech models is coming soon.",
  },
  {
    question: "Can I integrate Voxa AI with other tools or platforms?",
    answer:
      "Yes, Voxa AI can be integrated with your internal tools, CRMs, or databases using APIs—enabling smarter, contextual voice interactions.",
  },
];

export default function FAQs() {
  return (
    <div>
      <div className="flex flex-col items-center text-center space-y-3">
        <motion.h1
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="text-2xl md:text-4xl tracking-[-0.050em]"
        >
          Frequently Asked Questions
        </motion.h1>
        <motion.p
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="max-w-[20rem] text-sm md:text-base md:max-w-2xl text-neutral-500 font-balanced"
        >
          Explore common questions about how Voxa AI works, what it can do, and
          how to get the most out of your voice assistant experience.
        </motion.p>
      </div>
      <div className="px-5 py-10 md:px-104 md:py-24">
        <Accordion type="single" collapsible className="space-y-3">
          {faq.map((item, i) => {
            return (
              <motion.div
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                initial={{
                  opacity: 0,
                  x: faq.indexOf(item) % 2 === 0 ? 50 : -50,
                  y: 50,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                key={i}
              >
                <AccordionItem
                  className="max-w-[20rem] md:max-w-none px-5 shadow-md rounded-md"
                  value={`faq-${faq.indexOf(item)}`}
                >
                  <AccordionTrigger className="hover:cursor-pointer font-semibold">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              </motion.div>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
}
