import { Separator } from "../ui/separator";
import { AutonomousAIChat } from "./chat-with-ai";
import { OperationFlow } from "./operation-flow";
import { OrbitingCirclesDemo } from "./orbiting-circles";
import { Persistence } from "./persistence";

export default function HowItWorks() {
  return (
    <div className="w-full">
      <div className="w-full flex flex-col items-center text-center space-y-3">
        <h1 className="text-4xl tracking-[-0.050em]">
          Talk to Voxa. Get Things Done.
        </h1>
        <p className="max-w-2xl text-neutral-500 font-balanced">
          Voxa AI is your voice-first productivity partner. Just speak to plan,
          delegate, and gain insights—hands-free, in real time.
        </p>
      </div>
      <div className="grid grid-cols-2 px-44 py-24 space-x-5 space-y-5">
        <div className="col-span-1 max-h-[28rem] border rounded-xl">
          <div className="h-2/3 overflow-hidden relative">
            <OrbitingCirclesDemo />
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
        </div>
        <div className="col-span-1 max-h-[28rem] border rounded-xl">
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
        </div>
        <div className="col-span-1 max-h-[28rem] border rounded-xl">
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
        </div>
        <div className="col-span-1 max-h-[28rem] border rounded-xl">
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
        </div>
      </div>
    </div>
  );
}
