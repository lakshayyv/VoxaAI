"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { AppSidebar } from "./ui/app-sidebar";
import { useStore } from "@/store/loader";
import Loader from "./ui/loader";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Providers({ children }: { children: React.ReactNode }) {
  const loader = useStore();
  const pathname = usePathname();
  return (
    <SessionProvider>
      <SidebarProvider>
        {loader.isLoading && <Loader />}

        {pathname !== "/" && (
          <div className="md:hidden fixed top-0 w-full bg-white z-40">
            <div className="p-5 flex items-center justify-between">
              <Image
                src="/voxa-ai-logo.svg"
                alt="logo"
                width={24}
                height={24}
              />
              <SidebarTrigger />
            </div>
          </div>
        )}

        <AppSidebar />
        <Toaster richColors />
        <main className="w-full pt-[72px] md:pt-0">{children}</main>
      </SidebarProvider>
    </SessionProvider>
  );
}
