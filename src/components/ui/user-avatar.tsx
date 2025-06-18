import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { getInitials } from "@/lib/utils";

export default function UserAvatar({ open }: { open: boolean }) {
  const { data: session, status } = useSession();

  return (
    <motion.div
      animate={{ x: open ? 0 : 24 }}
      initial={{ x: 24 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Avatar>
        {session?.user.image && <AvatarImage src={session?.user.image} />}
        <AvatarFallback>{getInitials(session?.user.name as string)}</AvatarFallback>
      </Avatar>
    </motion.div>
  );
}
