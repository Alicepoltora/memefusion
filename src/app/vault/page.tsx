"use client";

import { Navbar } from "@/components/layout/Navbar";
import { BrainCircuit, LockKeyhole, ScrollText, Waves } from "lucide-react";

const assets = [
  {
    title: "Prompt DNA",
    body: "Store the exact meme ingredients, tone sliders, and launch intent behind every successful fusion.",
    icon: ScrollText,
  },
  {
    title: "Remix Rights",
    body: "Track creator lineage so high-performing derivatives still credit and reward upstream contributors.",
    icon: LockKeyhole,
  },
  {
    title: "Performance Memory",
    body: "Keep the scoreboard of which meme genes convert into reposts, remixes, and tokenizable momentum.",
    icon: BrainCircuit,
  },
];

const snapshots = [
  "SpongeBob sarcasm variants retained 41% better in quote-tweet chains.",
  "Three-panel formats outperformed single-image memes in wallet-linked sharing.",
  "Animal-finance hybrids cooled faster once more than four forks hit the feed.",
];

export default function VaultPage() {
  return (
    <main className="min-h-screen pb-20">
      <Navbar />

      <section className="mx-auto max-w-[1500px] px-6 py-10 sm:px-8 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-8">
            <p className="text-[10px] uppercase tracking-[0.3em] text-orange-200/70">Vault</p>
            <h1 className="mt-4 text-4xl font-black uppercase tracking-[-0.05em] text-white sm:text-5xl">
              Keep the meme memory, not just the output file.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-white/66">
              Meme-Fusion AI stores the hidden system behind every breakout:
              prompt structure, source pairing, remix lineage, and community response.
            </p>

            <div className="mt-8 space-y-4">
              {assets.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-[24px] border border-white/8 bg-black/20 p-6"
                  >
                    <Icon className="h-5 w-5 text-orange-200" />
                    <h2 className="mt-4 text-xl font-black uppercase tracking-[-0.04em] text-white">
                      {item.title}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-white/60">{item.body}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-black/20 p-8">
            <div className="flex items-center gap-3">
              <Waves className="h-5 w-5 text-sky-200" />
              <p className="text-[10px] uppercase tracking-[0.28em] text-white/42">
                Signal Archive
              </p>
            </div>

            <div className="mt-6 space-y-4">
              {snapshots.map((entry) => (
                <div
                  key={entry}
                  className="rounded-[24px] border border-white/8 bg-white/[0.03] px-5 py-5"
                >
                  <p className="text-sm leading-6 text-white/62">{entry}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[28px] border border-sky-300/18 bg-sky-300/8 p-6">
              <p className="text-[10px] uppercase tracking-[0.24em] text-sky-100/72">
                Recommendation
              </p>
              <p className="mt-3 text-2xl font-black uppercase tracking-[-0.04em] text-white">
                Re-run parody-heavy hybrids with cleaner mobile crops.
              </p>
              <p className="mt-3 text-sm leading-6 text-white/62">
                The memory engine predicts a higher hold rate when the hybrid keeps
                one familiar silhouette and moves the novelty into text rhythm.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
