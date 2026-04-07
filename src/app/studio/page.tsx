"use client";

import { Navbar } from "@/components/layout/Navbar";
import { ArrowUpRight, Layers3, Sparkles, WandSparkles } from "lucide-react";

const sourceMemes = [
  {
    label: "Template A",
    value: "Distracted Boyfriend",
    note: "Triangular attention dynamic",
  },
  {
    label: "Template B",
    value: "Wojak Trader",
    note: "Crypto panic and cope energy",
  },
  {
    label: "Caption mode",
    value: "Mocking SpongeBob",
    note: "Sarcastic quote-tweet cadence",
  },
];

const outputFrames = [
  "Layout grammar preserved for instant recognition.",
  "Punchline rewritten for a finance-native audience.",
  "Exportable as static meme, thread asset, or launch concept.",
];

export default function StudioPage() {
  return (
    <main className="min-h-screen pb-20">
      <Navbar />

      <section className="mx-auto max-w-[1500px] px-6 py-10 sm:px-8 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-8">
            <p className="text-[10px] uppercase tracking-[0.3em] text-orange-200/70">
              Fusion Studio
            </p>
            <h1 className="mt-4 text-4xl font-black uppercase tracking-[-0.05em] text-white sm:text-5xl">
              Build the crossover before the timeline does.
            </h1>
            <p className="mt-4 max-w-lg text-base leading-7 text-white/66">
              Select recognizable meme references, blend their structure and tone,
              then generate a reusable hybrid format with creator ownership built in.
            </p>

            <div className="mt-8 space-y-4">
              {sourceMemes.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[24px] border border-white/8 bg-black/20 p-5"
                >
                  <p className="text-[10px] uppercase tracking-[0.26em] text-white/40">
                    {item.label}
                  </p>
                  <p className="mt-2 text-xl font-black uppercase tracking-[-0.04em] text-white">
                    {item.value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/58">{item.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="launch-surface p-8">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-white/42">
                  Output Canvas
                </p>
                <h2 className="mt-2 text-3xl font-black uppercase tracking-[-0.05em] text-white">
                  WOJAKTED BOYFRIEND
                </h2>
              </div>
              <div className="rounded-full border border-lime-300/25 bg-lime-300/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-lime-200">
                Draft ready
              </div>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="rounded-[28px] border border-white/8 bg-white/[0.04] p-6">
                <Layers3 className="h-5 w-5 text-orange-200" />
                <h3 className="mt-5 text-xl font-black uppercase tracking-[-0.04em] text-white">
                  Structural Blend
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/62">
                  The engine merges visual composition, emotional contrast, and
                  caption rhythm into a single remixable format.
                </p>
              </div>

              <div className="rounded-[28px] border border-white/8 bg-white/[0.04] p-6">
                <WandSparkles className="h-5 w-5 text-sky-200" />
                <h3 className="mt-5 text-xl font-black uppercase tracking-[-0.04em] text-white">
                  Creator Controls
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/62">
                  Tune irony level, caption density, launch intent, and export mode
                  before the fusion enters ranking.
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-[28px] border border-white/8 bg-black/20 p-6">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-amber-200" />
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/80">
                  What ships out
                </p>
              </div>
              <div className="mt-5 space-y-3">
                {outputFrames.map((line) => (
                  <div
                    key={line}
                    className="rounded-[20px] border border-white/8 bg-white/[0.03] px-4 py-4 text-sm leading-6 text-white/62"
                  >
                    {line}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button className="launch-button">
                Generate hybrid
                <ArrowUpRight className="h-4 w-4" />
              </button>
              <button className="ghost-launch-button">Save to vault</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
