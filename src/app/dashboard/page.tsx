"use client";

import Loader from "@/components/ui/loader";
import VoiceCardContainer from "@/components/voice-card-container";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <Loader />;
  }
  if (!session) {
    return <div>Unauth</div>;
  }

  return (
    <div className="flex-1">
      <VoiceCardContainer session={session} />
    </div>
  );
}
