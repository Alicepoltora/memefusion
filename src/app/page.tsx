"use client";

import { useEffect, useMemo, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import {
  ArrowUpRight,
  BrainCircuit,
  Flame,
  LoaderCircle,
  MessageSquareShare,
  Radar,
  Rocket,
  Sparkle,
  Swords,
  Waves,
} from "lucide-react";
import { useAccount } from "wagmi";
import type { FourMemeToken } from "@/lib/fourmeme";
import type { FusionResult } from "@/lib/fusion";

type TrendingResponse = {
  tokens?: FourMemeToken[];
  error?: string;
};

type FusionResponse = {
  fusion?: FusionResult;
  mode?: "openai" | "fallback";
  warning?: string;
  error?: string;
};

type MemePair = {
  id: string;
  left: FourMemeToken;
  right: FourMemeToken;
};

const pipeline = [
  {
    title: "Live Four.meme intake",
    body: "The homepage pulls the hottest current memes directly from Four.meme.",
    icon: Radar,
  },
  {
    title: "Pairs of two",
    body: "Popular memes are grouped into direct head-to-head fusion blocks for faster decisions.",
    icon: Swords,
  },
  {
    title: "Best-of-both fusion",
    body: "The backend combines the strongest traits from each meme into one sharper hybrid concept.",
    icon: Sparkle,
  },
  {
    title: "Launch-aware output",
    body: "The generated result still keeps a title, ticker, and launch angle for downstream use.",
    icon: Rocket,
  },
];

const memoryLog = [
  "The homepage now shows Four.meme entries in fusion-ready pairs instead of a generic selection grid.",
  "Each pair gets its own Fusion action so the user can compare and merge two memes instantly.",
  "The result card is optimized to describe what was inherited from the left meme and the right meme.",
];

function formatCompact(value: number) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function makePairs(tokens: FourMemeToken[]) {
  const pairs: MemePair[] = [];

  for (let index = 0; index < tokens.length - 1; index += 2) {
    const left = tokens[index];
    const right = tokens[index + 1];

    if (!left || !right) continue;

    pairs.push({
      id: `${left.tokenAddress}-${right.tokenAddress}`,
      left,
      right,
    });
  }

  return pairs;
}

export default function HomePage() {
  const { isConnected, address } = useAccount();
  const [tokens, setTokens] = useState<FourMemeToken[]>([]);
  const [activePairId, setActivePairId] = useState<string | null>(null);
  const [fusion, setFusion] = useState<FusionResult | null>(null);
  const [fusionMode, setFusionMode] = useState<"openai" | "fallback" | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [fusingPairId, setFusingPairId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadTrending() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/api/fourmeme/trending", {
          cache: "no-store",
        });
        const data = (await response.json()) as TrendingResponse;

        if (!response.ok || !data.tokens) {
          throw new Error(data.error || "Could not load Four.meme trending list.");
        }

        if (!active) return;
        setTokens(data.tokens);
      } catch (loadError) {
        if (!active) return;
        setError(
          loadError instanceof Error
            ? loadError.message
            : "Could not load Four.meme trending list.",
        );
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadTrending();

    return () => {
      active = false;
    };
  }, []);

  const pairs = useMemo(() => makePairs(tokens), [tokens]);
  const activePair = useMemo(
    () => pairs.find((pair) => pair.id === activePairId) ?? pairs[0] ?? null,
    [activePairId, pairs],
  );

  async function runFusion(pair: MemePair) {
    try {
      setFusingPairId(pair.id);
      setActivePairId(pair.id);
      setWarning(null);

      const response = await fetch("/api/fusion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selected: [pair.left, pair.right] }),
      });

      const data = (await response.json()) as FusionResponse;

      if (!response.ok || !data.fusion) {
        throw new Error(data.error || "Fusion failed.");
      }

      setFusion(data.fusion);
      setFusionMode(data.mode ?? null);
      setWarning(data.warning ?? null);
    } catch (fusionError) {
      setWarning(
        fusionError instanceof Error ? fusionError.message : "Fusion failed.",
      );
    } finally {
      setFusingPairId(null);
    }
  }

  return (
    <main className="min-h-screen pb-20">
      <Navbar />

      <section className="relative overflow-hidden px-6 pb-14 pt-8 sm:px-8 lg:px-10">
        <div className="hero-noise pointer-events-none absolute inset-0 opacity-60" />
        <div className="absolute inset-x-0 top-0 h-[38rem] bg-[radial-gradient(circle_at_18%_18%,rgba(255,122,26,0.24),transparent_34%),radial-gradient(circle_at_78%_22%,rgba(242,201,76,0.16),transparent_30%),radial-gradient(circle_at_60%_58%,rgba(79,172,254,0.16),transparent_28%)]" />

        <div className="relative mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div className="max-w-3xl py-8 lg:py-14">
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/72 backdrop-blur">
              <span className="inline-block h-2 w-2 rounded-full bg-lime-300 shadow-[0_0_18px_rgba(190,242,100,0.9)]" />
              Four.meme hot pairs + one-click fusion
            </div>

            <p className="text-sm uppercase tracking-[0.32em] text-orange-200/70">
              Content generation + SocialFi + Web3
            </p>
            <h1 className="mt-5 max-w-4xl text-5xl font-black uppercase leading-[0.94] tracking-[-0.05em] text-white sm:text-6xl lg:text-8xl">
              Take two hot memes,
              <br />
              merge the best,
              <br />
              output one winner.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/72 sm:text-lg">
              The homepage now pulls popular memes from Four.meme, groups them
              into blocks of two, and lets you press <span className="font-semibold text-white">Fusion</span> to create
              one improved hybrid that keeps the strongest parts from both.
            </p>

            <div className="mt-12 grid gap-6 border-t border-white/10 pt-8 text-sm text-white/72 sm:grid-cols-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-white/42">
                  Live source
                </p>
                <p className="mt-2 text-2xl font-black tracking-tight text-lime-300">
                  Four.meme
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-white/42">
                  Pair blocks
                </p>
                <p className="mt-2 text-2xl font-black tracking-tight text-white">
                  {pairs.length}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-white/42">
                  Fusion mode
                </p>
                <p className="mt-2 text-2xl font-black tracking-tight text-sky-300">
                  {fusionMode || "awaiting run"}
                </p>
              </div>
            </div>
          </div>

          <div className="launch-surface">
            <div className="flex items-start justify-between gap-4 border-b border-white/10 px-6 py-5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-white/42">
                  Best-of-two result
                </p>
                <h2 className="mt-2 text-2xl font-black uppercase tracking-[-0.04em] text-white">
                  {fusion?.title || "Pick any pair and press Fusion"}
                </h2>
                <p className="mt-2 max-w-sm text-sm leading-6 text-white/58">
                  {fusion?.summary ||
                    "Each pair combines two live Four.meme entries. Fusion creates one sharper concept by inheriting the strongest attributes from both sides."}
                </p>
              </div>

              <div className="rounded-full border border-lime-300/25 bg-lime-300/10 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-lime-200">
                {fusingPairId ? "Fusing" : activePair ? "Ready" : "Loading"}
              </div>
            </div>

            <div className="grid gap-6 px-6 py-6 md:grid-cols-[1.05fr_0.95fr]">
              <div className="space-y-5">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-white/42">
                    Active pair
                  </p>
                  <div className="mt-4 space-y-3">
                    {activePair ? (
                      [activePair.left, activePair.right].map((item, index) => (
                        <div
                          key={item.tokenAddress}
                          className="rounded-[20px] border border-white/8 bg-white/[0.045] p-4 backdrop-blur-sm"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-100/80">
                                Source {index + 1} / {item.name}
                              </p>
                              <p className="mt-2 text-sm leading-6 text-white/66">
                                24h volume {formatCompact(item.dayTrading)} • growth{" "}
                                {item.dayIncrease.toFixed(2)}x • holders{" "}
                                {formatCompact(item.holderCount)}
                              </p>
                            </div>
                            <div className="rounded-full bg-orange-400/12 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-orange-100">
                              {item.aiCreator ? "AI" : "Community"}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-[20px] border border-white/8 bg-white/[0.045] p-4 text-sm leading-6 text-white/58">
                        No pair available yet.
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[24px] border border-white/8 bg-black/20 p-5">
                    <p className="text-[10px] uppercase tracking-[0.26em] text-white/42">
                      Ticker
                    </p>
                    <p className="mt-3 text-xl font-black uppercase tracking-[-0.04em] text-white">
                      {fusion?.ticker || "Pending"}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-white/62">
                      The fused concept gets one cleaner launch-ready identity.
                    </p>
                  </div>

                  <div className="rounded-[24px] border border-white/8 bg-black/20 p-5">
                    <p className="text-[10px] uppercase tracking-[0.26em] text-white/42">
                      Pair logic
                    </p>
                    <p className="mt-2 text-sm leading-6 text-white/62">
                      The engine takes the best volume pull, fastest momentum,
                      and strongest community hook from the two selected memes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="fusion-result-card p-5">
                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-white/42">
                      Generated concept card
                    </p>
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-lime-200">
                      <Sparkle className="h-3.5 w-3.5" />
                      Best of two
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="fusion-chip">
                      <Swords className="h-3.5 w-3.5 text-orange-200" />
                      2 source memes
                    </span>
                    {activePair ? (
                      <>
                        <span className="fusion-chip">
                          <Flame className="h-3.5 w-3.5 text-amber-200" />
                          {formatCompact(
                            activePair.left.dayTrading + activePair.right.dayTrading,
                          )}{" "}
                          24h volume
                        </span>
                        <span className="fusion-chip">
                          <Rocket className="h-3.5 w-3.5 text-sky-200" />
                          {Math.max(
                            activePair.left.dayIncrease,
                            activePair.right.dayIncrease,
                          ).toFixed(2)}
                          x best growth
                        </span>
                      </>
                    ) : null}
                  </div>

                  <div className="mt-5 rounded-[28px] border border-white/10 bg-black/20 p-5">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-white/40">
                      Hybrid title
                    </p>
                    <h3 className="mt-3 text-3xl font-black uppercase tracking-[-0.05em] text-white">
                      {fusion?.title || "Awaiting fusion"}
                    </h3>
                    <div className="mt-4 inline-flex rounded-full border border-orange-200/20 bg-orange-200/10 px-4 py-2 text-sm font-black uppercase tracking-[0.22em] text-orange-100">
                      ${fusion?.ticker || "PENDING"}
                    </div>
                    <p className="mt-4 text-sm leading-6 text-white/64">
                      {fusion?.summary ||
                        "Press Fusion on any pair below to generate one stronger combined meme concept."}
                    </p>
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div className="fusion-stat">
                      <p className="text-[10px] uppercase tracking-[0.22em] text-white/38">
                        Left + right strengths
                      </p>
                      <div className="mt-3 space-y-2 text-sm leading-6 text-white/60">
                        {(fusion?.strongPoints || [
                          "The result will list exactly what was inherited from both source memes.",
                        ]).map((point) => (
                          <p key={point}>{point}</p>
                        ))}
                      </div>
                    </div>

                    <div className="fusion-stat">
                      <p className="text-[10px] uppercase tracking-[0.22em] text-white/38">
                        Blueprint
                      </p>
                      <div className="mt-3 space-y-2 text-sm leading-6 text-white/60">
                        {(fusion?.formatBlueprint || [
                          "The blueprint will describe how the two source memes become one cleaner hybrid.",
                        ]).map((point) => (
                          <p key={point}>{point}</p>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 rounded-[24px] border border-sky-300/18 bg-sky-300/8 p-4">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-sky-100/70">
                      Launch angle
                    </p>
                    <p className="mt-3 text-sm leading-6 text-white/64">
                      {fusion?.launchAngle ||
                        "After fusion, the app keeps one unified launch angle instead of two competing meme directions."}
                    </p>
                  </div>

                  {warning ? (
                    <div className="mt-4 rounded-[22px] border border-amber-200/18 bg-amber-200/8 p-4 text-sm leading-6 text-white/62">
                      {warning}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-divider mx-auto max-w-[1500px] px-6 py-10 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.32em] text-orange-200/65">
              Four.meme hot pairs
            </p>
            <h2 className="mt-4 max-w-2xl text-3xl font-black uppercase tracking-[-0.05em] text-white sm:text-4xl">
              Popular memes, grouped into blocks of two with direct one-click fusion.
            </h2>
          </div>

          <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/70">
            One fusion per pair
          </div>
        </div>

        {loading ? (
          <div className="mt-8 grid gap-6 xl:grid-cols-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-80 animate-pulse rounded-[30px] border border-white/8 bg-white/[0.035]"
              />
            ))}
          </div>
        ) : error ? (
          <div className="mt-8 rounded-[28px] border border-rose-300/18 bg-rose-300/8 p-6 text-sm leading-6 text-white/72">
            {error}
          </div>
        ) : (
          <div className="mt-8 grid gap-6 xl:grid-cols-2">
            {pairs.map((pair) => {
              const isActive = activePair?.id === pair.id;
              const isFusing = fusingPairId === pair.id;

              return (
                <div
                  key={pair.id}
                  className={`rounded-[30px] border p-6 transition duration-300 ${
                    isActive
                      ? "border-orange-200/35 bg-orange-300/[0.06]"
                      : "border-white/8 bg-white/[0.035]"
                  }`}
                >
                  <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
                    {[pair.left, pair.right].map((token, index) => (
                      <div
                        key={token.tokenAddress}
                        className="rounded-[24px] border border-white/8 bg-black/20 p-4"
                      >
                        <img
                          src={token.imageUrl}
                          alt={token.name}
                          className="h-16 w-16 rounded-2xl border border-white/10 object-cover"
                        />
                        <p className="mt-4 text-lg font-black uppercase tracking-[-0.03em] text-white">
                          {token.name}
                        </p>
                        <p className="mt-2 text-[10px] uppercase tracking-[0.22em] text-white/40">
                          source {index + 1}
                        </p>

                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-white/38">
                              24h volume
                            </p>
                            <p className="mt-2 text-sm font-black text-white">
                              {formatCompact(token.dayTrading)}
                            </p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-white/38">
                              growth
                            </p>
                            <p className="mt-2 text-sm font-black text-lime-300">
                              {token.dayIncrease.toFixed(2)}x
                            </p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-white/38">
                              holders
                            </p>
                            <p className="mt-2 text-sm font-black text-white">
                              {formatCompact(token.holderCount)}
                            </p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-white/38">
                              mcap
                            </p>
                            <p className="mt-2 text-sm font-black text-white">
                              ${formatCompact(token.marketCapUsd)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="flex items-center justify-center">
                      <button
                        className="launch-button"
                        onClick={() => void runFusion(pair)}
                        disabled={Boolean(fusingPairId)}
                      >
                        {isFusing ? (
                          <>
                            <LoaderCircle className="h-4 w-4 animate-spin" />
                            Fusing
                          </>
                        ) : (
                          <>
                            Fusion
                            <ArrowUpRight className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section className="mx-auto grid max-w-[1500px] gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
        <div className="border-t border-white/10 pt-6">
          <p className="text-[10px] uppercase tracking-[0.32em] text-orange-200/65">
            How it works
          </p>
          <h2 className="mt-4 max-w-lg text-3xl font-black uppercase tracking-[-0.05em] text-white sm:text-4xl">
            Two in, one stronger concept out.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-white/64">
            Instead of manually curating a basket, the homepage gives you direct
            pair blocks so every click means one specific best-of-two fusion.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {pipeline.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="rounded-[28px] border border-white/8 bg-white/[0.035] p-6 transition duration-300 hover:-translate-y-1 hover:border-white/18 hover:bg-white/[0.055]"
              >
                <Icon className="h-5 w-5 text-orange-200" />
                <h3 className="mt-5 text-xl font-black uppercase tracking-[-0.04em] text-white">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/62">
                  {step.body}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto grid max-w-[1500px] gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">
        <div className="rounded-[32px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/42">
                SocialFi loop
              </p>
              <h3 className="mt-3 text-3xl font-black uppercase tracking-[-0.05em] text-white">
                Every fusion starts from live market attention.
              </h3>
            </div>
            <div className="rounded-full border border-amber-200/20 bg-amber-200/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-100">
              Pair-by-pair signal
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div>
              <Flame className="h-5 w-5 text-orange-200" />
              <p className="mt-4 text-[10px] uppercase tracking-[0.26em] text-white/38">
                Volume pull
              </p>
              <p className="mt-3 text-sm leading-6 text-white/58">
                Each pair carries current 24h attention instead of stale reference data.
              </p>
            </div>
            <div>
              <Swords className="h-5 w-5 text-orange-200" />
              <p className="mt-4 text-[10px] uppercase tracking-[0.26em] text-white/38">
                Best-vs-best
              </p>
              <p className="mt-3 text-sm leading-6 text-white/58">
                Fusion compares two candidates directly and takes the strongest angle from each.
              </p>
            </div>
            <div>
              <MessageSquareShare className="h-5 w-5 text-orange-200" />
              <p className="mt-4 text-[10px] uppercase tracking-[0.26em] text-white/38">
                Remix output
              </p>
              <p className="mt-3 text-sm leading-6 text-white/58">
                The result is written as one cleaner meme concept ready for reposting or launch framing.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[32px] border border-white/8 bg-black/20 p-6 sm:p-8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/42">
            Fusion memory
          </p>
          <h3 className="mt-3 text-3xl font-black uppercase tracking-[-0.05em] text-white">
            It now thinks in pairs.
          </h3>

          <div className="mt-6 space-y-3">
            {memoryLog.map((entry) => (
              <div
                key={entry}
                className="flex gap-3 rounded-[20px] border border-white/8 bg-white/[0.03] px-4 py-4"
              >
                <Waves className="mt-0.5 h-4 w-4 shrink-0 text-sky-200" />
                <p className="text-sm leading-6 text-white/62">{entry}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-6 py-10 sm:px-8 lg:px-10">
        <div className="rounded-[36px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,122,26,0.18),rgba(12,18,28,0.92)_34%,rgba(79,172,254,0.16))] px-6 py-8 sm:px-10 sm:py-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-[10px] uppercase tracking-[0.32em] text-orange-100/72">
                Runtime status
              </p>
              <h2 className="mt-4 text-3xl font-black uppercase tracking-[-0.05em] text-white sm:text-4xl">
                Hot memes are now displayed in fusion-ready pairs.
              </h2>
              <p className="mt-4 text-base leading-7 text-white/70">
                The homepage is optimized for quick comparisons: look at a pair,
                press Fusion, and get one stronger combined concept.
              </p>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-black/20 px-5 py-4 text-sm text-white/70 backdrop-blur">
              <p>
                Wallet status:{" "}
                <span className="font-semibold text-white">
                  {isConnected && address
                    ? `${address.slice(0, 6)}...${address.slice(-4)}`
                    : "not connected"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
