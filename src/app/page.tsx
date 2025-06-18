"use client";

import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Magnet from "@/components/ui/magnet";
import AppNavbar from "@/components/ui/navbar";
import { Navbar } from "@/components/ui/resizable-navbar";
import Threads from "@/components/ui/threads";
import { ArrowUpRight, MoveUpRight } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, Search, ArrowLeft, Bot, Zap } from "lucide-react";
import Link from "next/link";
import HeroSection from "@/components/landing/hero-section";
import HowItWorks from "@/components/landing/how-it-works";

export default function Page() {
  return (
    <div className="w-full">
      <HeroSection />
      <HowItWorks />
    </div>
  );
}
