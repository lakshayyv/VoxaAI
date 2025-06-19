"use client";

import { Session } from "next-auth";
import { Button } from "./ui/button";
import VoiceCard from "./ui/voice-card";
import useVoiceAgent from "@/hooks/use-voice-agent";
import ButtonLoader from "./ui/loader/button-loader";
import ChatHistory from "./ui/chat-history";

export default function VoiceCardContainer({ session }: { session: Session }) {
  const {
    isConnected,
    isSpeaking,
    callEnded,
    startCall,
    endCall,
    loading,
    transcript,
  } = useVoiceAgent();
  const { user } = session;

  if (!user?.name) {
    return <div>Unauth or incomplete data</div>;
  }

  return (
    <div className="space-y-5 md:space-y-0 md:flex items-center h-full p-5 md:space-x-5">
      <div className="relative md:w-1/2 h-full flex flex-col items-center justify-center space-y-5">
        <VoiceCard
          name="Voxa"
          src="/voxa-ai-logo.svg"
          speaking={isConnected && isSpeaking}
        />
        <VoiceCard
          name={user.name}
          src={user.image || ""}
          speaking={isConnected && !isSpeaking}
        />

        <Button
          onClick={isConnected ? endCall : startCall}
          variant={isConnected ? "destructive" : "default"}
          className="w-full hover:cursor-pointer font-semibold"
        >
          {isConnected ? "Disconnect" : loading ? <ButtonLoader /> : "Connect"}
        </Button>
      </div>
      <ChatHistory transcript={transcript} ended={callEnded} />
    </div>
  );
}
