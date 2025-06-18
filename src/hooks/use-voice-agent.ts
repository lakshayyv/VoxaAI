import Vapi from "@vapi-ai/web";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface VoiceAgentHook {
  isConnected: boolean;
  isSpeaking: boolean;
  callEnded: boolean;
  startCall: () => void;
  endCall: () => void;
  loading: boolean;
  transcript: Array<{ role: string; text: string }>;
}

export default function useVoiceAgent(): VoiceAgentHook {
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [transcript, setTranscript] = useState<
    Array<{ role: string; text: string }>
  >([]);
  const [loading, setLoading] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_VAPI_API_KEY!;
  const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID!;

  useEffect(() => {
    const vapiInstance = new Vapi(apiKey);
    setVapi(vapiInstance);

    vapiInstance.on("call-start", () => {
      setIsConnected(true);
      setLoading(false);
      setTranscript([]);
      setCallEnded(false);
    });

    vapiInstance.on("call-end", () => {
      setIsConnected(false);
      setIsSpeaking(false);
      setCallEnded(true);
    });

    vapiInstance.on("speech-start", () => {
      setIsSpeaking(true);
    });

    vapiInstance.on("speech-end", () => {
      setIsSpeaking(false);
    });

    vapiInstance.on("message", (message) => {
      setTranscript((prev) => {
        if (message.type === "conversation-update") {
          return message.messages.map((msg: any) => {
            if (msg.role !== "system") {
              return { role: msg.role, text: msg.message };
            }
          });
        }

        return [...prev];
      });
    });

    vapiInstance.on("error", (error) => {
      toast.error("Error connecting to agent");
    });

    return () => {
      vapiInstance?.stop();
    };
  }, [apiKey]);

  const startCall = () => {
    setLoading(true);
    if (vapi) {
      vapi.start(assistantId);
    }
  };

  const endCall = () => {
    if (vapi) {
      vapi.stop();
    }
  };

  return {
    isConnected,
    isSpeaking,
    callEnded,
    startCall,
    endCall,
    loading,
    transcript,
  };
}
