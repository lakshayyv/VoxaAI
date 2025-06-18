"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { SidebarProvider } from "./ui/sidebar";
import { AppSidebar } from "./ui/app-sidebar";
import { useStore } from "@/store/loader";
import Loader from "./ui/loader";

export default function Providers({ children }: { children: React.ReactNode }) {
  const loader = useStore();
  return (
    <SessionProvider>
      <SidebarProvider>
        {loader.isLoading && <Loader />}
        <AppSidebar />
        <Toaster richColors />
        {children}
      </SidebarProvider>
    </SessionProvider>
  );
}
