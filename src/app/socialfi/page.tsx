"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Flame, MessageSquareShare, Trophy, Users } from "lucide-react";

const ladder = [
  { name: "WOJAKTED BOYFRIEND", score: "12.4k", remixes: "418", wallets: "1.8k" },
  { name: "BRAINROT DRAKE", score: "9.7k", remixes: "296", wallets: "1.1k" },
  { name: "SIGMA SPONGEBOB", score: "8.9k", remixes: "251", wallets: "932" },
];

export default function SocialFiPage() {
  return (
    <main className="min-h-screen pb-20">
      <Navbar />

      <section className="mx-auto max-w-[1500px] px-6 py-10 sm:px-8 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="rounded-[32px] border border-white/10 bg-black/20 p-8">
            <p className="text-[10px] uppercase tracking-[0.3em] text-orange-200/70">
              SocialFi Ladder
            </p>
            <h1 className="mt-4 text-4xl font-black uppercase tracking-[-0.05em] text-white sm:text-5xl">
              Attention becomes a measurable asset.
            </h1>
            <p className="mt-4 max-w-lg text-base leading-7 text-white/66">
              Each hybrid meme competes on repost velocity, remix depth, wallet
              participation, and creator attribution instead of vanity likes alone.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5">
                <Flame className="h-5 w-5 text-orange-200" />
                <p className="mt-4 text-[10px] uppercase tracking-[0.24em] text-white/42">Heat</p>
                <p className="mt-2 text-2xl font-black text-white">94.1</p>
              </div>
              <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5">
                <Users className="h-5 w-5 text-sky-200" />
                <p className="mt-4 text-[10px] uppercase tracking-[0.24em] text-white/42">Wallets</p>
                <p className="mt-2 text-2xl font-black text-white">6,482</p>
              </div>
              <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5">
                <MessageSquareShare className="h-5 w-5 text-amber-200" />
                <p className="mt-4 text-[10px] uppercase tracking-[0.24em] text-white/42">Remixes</p>
                <p className="mt-2 text-2xl font-black text-white">1,233</p>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-8">
            <div className="flex items-center gap-3">
              <Trophy className="h-5 w-5 text-amber-200" />
              <h2 className="text-2xl font-black uppercase tracking-[-0.04em] text-white">
                Daily Ranking
              </h2>
            </div>

            <div className="mt-6 space-y-4">
              {ladder.map((item, index) => (
                <div
                  key={item.name}
                  className="grid gap-4 rounded-[26px] border border-white/8 bg-black/20 p-5 md:grid-cols-[72px_1fr_auto_auto_auto]"
                >
                  <div className="text-4xl font-black tracking-[-0.05em] text-white/24">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <p className="text-lg font-black uppercase tracking-[-0.03em] text-white">
                      {item.name}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-white/58">
                      Ranked by meme retention, wallet-backed interaction, and remix survival.
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.24em] text-white/40">Score</p>
                    <p className="mt-2 text-xl font-black text-white">{item.score}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.24em] text-white/40">Remixes</p>
                    <p className="mt-2 text-xl font-black text-white">{item.remixes}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.24em] text-white/40">Wallets</p>
                    <p className="mt-2 text-xl font-black text-white">{item.wallets}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
