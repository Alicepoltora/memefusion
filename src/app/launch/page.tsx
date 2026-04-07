"use client";

import { Navbar } from "@/components/layout/Navbar";
import { ArrowUpRight, Coins, Orbit, Rocket, ShieldCheck } from "lucide-react";
import { useAccount } from "wagmi";

const launchCards = [
  {
    title: "Launch Candidate",
    value: "WOBO",
    body: "Winning fusion promoted into token metadata, ticker check, and launch brief.",
    icon: Rocket,
  },
  {
    title: "Base Pair",
    value: "BNB / USDT",
    body: "Select the path that best matches current community and liquidity expectations.",
    icon: Orbit,
  },
  {
    title: "Tax Token Mode",
    value: "Optional",
    body: "Reserve space for reflection, LP reinforcement, or holder utility if the format fits.",
    icon: ShieldCheck,
  },
];

export default function LaunchPage() {
  const { isConnected, address } = useAccount();

  return (
    <main className="min-h-screen pb-20">
      <Navbar />

      <section className="mx-auto max-w-[1500px] px-6 py-10 sm:px-8 lg:px-10">
        <div className="rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,122,26,0.18),rgba(12,18,28,0.94)_38%,rgba(79,172,254,0.16))] p-8 sm:p-10">
          <p className="text-[10px] uppercase tracking-[0.32em] text-orange-100/72">
            Four.meme Route
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black uppercase tracking-[-0.05em] text-white sm:text-5xl">
            When a hybrid proves itself, route it into launch infrastructure.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/70">
            This surface is where meme performance turns into a launch-ready concept:
            ticker, supply assumptions, pair choice, creator ownership, and protocol checks.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {launchCards.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-[28px] border border-white/10 bg-black/20 p-6 backdrop-blur"
                >
                  <Icon className="h-5 w-5 text-orange-200" />
                  <p className="mt-4 text-[10px] uppercase tracking-[0.24em] text-white/40">
                    {item.title}
                  </p>
                  <p className="mt-3 text-2xl font-black uppercase tracking-[-0.04em] text-white">
                    {item.value}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-white/60">{item.body}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="rounded-[24px] border border-white/10 bg-black/20 px-5 py-4 text-sm text-white/70">
              Wallet status:{" "}
              <span className="font-semibold text-white">
                {isConnected && address
                  ? `${address.slice(0, 6)}...${address.slice(-4)}`
                  : "not connected"}
              </span>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <button className="launch-button">
                Prepare launch brief
                <ArrowUpRight className="h-4 w-4" />
              </button>
              <button className="ghost-launch-button">
                <Coins className="h-4 w-4" />
                View token model
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
