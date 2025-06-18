"use client";

import { Ripple } from "@/components/ui/ripple";
import { MorphingText } from "@/components/ui/morphing-text";

export function Persistence() {
  const texts = ["Persistence", "Continuity", "Retention"];

  return (
    <div className="relative flex h-[250px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-transparent">
      <MorphingText texts={texts} />
      <Ripple
        mainCircleOpacity={0.5}
        mainCircleSize={160}
        numCircles={7}
        className="text-orange-600"
      />
    </div>
  );
}
