"use client";

import { Conversation } from "@/config/generated/prisma";
import { fetcher, getInitials } from "@/lib/utils";
import Link from "next/link";
import useSWR, { mutate } from "swr";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageType } from "@/lib/types";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { deleteConversation } from "@/actions/user.actions";
import { toast } from "sonner";
import { useState } from "react";
import ButtonLoader from "@/components/ui/loader/button-loader";
import Loader from "@/components/ui/loader";

export default function Page() {
  const {
    data: conversations,
    error,
    isLoading,
  } = useSWR<{
    data: (Conversation & { messages: MessageType[] })[];
  }>(`/api/conversation`, fetcher);
  const [loading, setLoading] = useState(false);

  const { data: session, status } = useSession();

  if (isLoading || status === "loading") {
    return <Loader />;
  }
  if (!session?.user.name) {
    return <div>Error</div>;
  }

  const handleDelete = async (id: string) => {
    setLoading(true);
    const response = await deleteConversation(id);
    if (response.error) {
      toast.error(response.error);
    }
    if (response.data) {
      toast.success(response.data.message);
      mutate("/api/conversation");
    }
    setLoading(false);
  };

  return (
    <div className="w-full space-y-3">
      <h1 className="text-xl font-semibold text-orange-600">
        Your conversations
      </h1>
      <div className="w-full">
        {!conversations?.data || conversations?.data.length <= 0 ? (
          <div>
            No conversations.{" "}
            <Link href="/dashboard" className="text-orange-600 font-semibold">
              Start chatting now!
            </Link>
          </div>
        ) : (
          conversations.data.map((conversation, index) => (
            <Accordion type="single" collapsible key={index}>
              <AccordionItem value="item-1">
                <AccordionTrigger className="font-semibold">
                  {new Date(conversation.createdAt).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </AccordionTrigger>

                <AccordionContent className="border-2 border-orange-600 rounded-xl p-5 space-y-5">
                  <ScrollArea
                    className="overflow-y-auto"
                    style={{ maxHeight: "calc(100vh - 400px)" }}
                  >
                    <div className="space-y-3">
                      {conversation.messages.map((msg, index) =>
                        msg !== undefined ? (
                          <div
                            key={index}
                            className={`flex items-start ${
                              msg.role === "bot"
                                ? "justify-start"
                                : "justify-end"
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
                    </div>
                  </ScrollArea>
                  <Button
                    variant="destructive"
                    disabled={loading}
                    className="w-full cursor-pointer"
                    onClick={async () => await handleDelete(conversation.id)}
                  >
                    {loading ? <ButtonLoader /> : "Delete Conversation"}
                  </Button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))
        )}
      </div>
    </div>
  );
}
