"use client";

import { BotMessageSquare, MessageCircleCode } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import SidebarAvatar from "./sidebar-avatar";
import Loader from "./loader";
import { usePathname } from "next/navigation";

const items = [
  {
    title: "Voice Chat",
    url: "/dashboard",
    icon: BotMessageSquare,
  },
  {
    title: "Conversations",
    url: "/conversations",
    icon: MessageCircleCode,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  const { data: session, status } = useSession();
  if (status === "loading") {
    return null;
  }

  if (status === "unauthenticated") {
    return null;
  }

  if (!session?.user.name || !session?.user.email) {
    return <div>Unauth</div>;
  }

  return (
    <Sidebar className="bg-white border-r-2 border-orange-300 shadow-xl w-64 min-h-screen relative overflow-hidden pb-3">
      <SidebarContent className="p-6">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <SidebarGroup>
            <SidebarGroupLabel className="text-xl font-bold text-orange-600 mb-6 tracking-wide">
              Application
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu className="space-y-2">
                {items.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 + 0.2, duration: 0.3 }}
                  >
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a
                          href={item.url}
                          className={cn(
                            "group flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300 text-gray-700",
                            "hover:bg-orange-100 hover:text-orange-600 hover:shadow-md",
                            "active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                          )}
                        >
                          <item.icon className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
                          <span className="font-medium text-base tracking-tight">
                            {item.title}
                          </span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </motion.div>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </motion.div>
      </SidebarContent>
      <SidebarAvatar
        user={{
          name: session.user.name,
          email: session.user.email,
          avatar: session.user.image || "",
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-orange-300 to-orange-400 animate-pulse" />
    </Sidebar>
  );
}
