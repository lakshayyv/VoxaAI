import { useEffect, useRef, useState } from "react";
import { Separator } from "./separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Button } from "./button";
import { saveConversation } from "@/actions/user.actions";
import { toast } from "sonner";
import ButtonLoader from "./loader/button-loader";
import Loader from "./loader";
import { getInitials } from "@/lib/utils";

export default function ChatHistory({
  transcript,
  ended,
}: {
  transcript: Array<{ role: string; text: string }>;
  ended: boolean;
}) {
  const endRef = useRef<HTMLDivElement | null>(null);
  const { data: session, status } = useSession();
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  if (status === "loading") {
    return <Loader />;
  }

  if (!session?.user.name) {
    return <div>Error</div>;
  }

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [transcript]);

  useEffect(() => {
    setSaved(false);
  }, [ended]);

  const handleSave = async () => {
    setLoading(true);
    const response = await saveConversation(transcript);
    if (response.error) {
      toast.error(response.error);
    }
    if (response.data) {
      toast.success(response.data.message);
      setSaved(true);
    }
    setLoading(false);
  };
  return (
    <div className="w-1/2 h-full p-5 border border-orange-500">
      <h1 className="text-orange-600 font-semibold text-xl">Chat History</h1>
      <Separator className="bg-orange-500 mt-4" />
      {transcript.length <= 0 ? (
        <div className="w-full h-full flex justify-center items-center">
          <h2 className="text-neutral-400 font-medium">No chat history</h2>
        </div>
      ) : (
        <ScrollArea
          className="mt-5 overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 150px)" }}
        >
          <div className="space-y-3">
            {transcript.map((msg, index) =>
              msg !== undefined ? (
                <div
                  key={index}
                  className={`flex items-start ${
                    msg.role === "bot" ? "justify-start" : "justify-end"
                  } space-x-3`}
                >
                  {msg.role === "bot" && (
                    <Avatar className="w-8 h-8 mt-2">
                      <AvatarImage
                        src="/voxa-ai-logo.svg"
                        alt={msg.role}
                        className="w-full h-full object-contain rounded-full"
                      />
                      <AvatarFallback>
                        {getInitials(session?.user.name as string)}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    key={index}
                    className={`p-3 bg-neutral-200 space-y-3 rounded-xl ${
                      msg.role === "bot" ? "text-left" : "text-right"
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.role === "user" && (
                    <Avatar className="w-8 h-8 mt-2">
                      <AvatarImage
                        src={session.user.image || ""}
                        alt={msg.role}
                        className="w-full h-full object-contain rounded-full"
                      />
                      <AvatarFallback>
                        {getInitials(session?.user.name as string)}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ) : null
            )}
            {!saved && ended && (
              <Button className="w-full font-semibold" onClick={handleSave}>
                {loading ? <ButtonLoader /> : "Save Conversation"}
              </Button>
            )}
          </div>
          <div ref={endRef} />
        </ScrollArea>
      )}
    </div>
  );
}
