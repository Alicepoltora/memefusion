"use client";

import { useEffect, useMemo, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import {
  Activity,
  ArrowUpRight,
  BrainCircuit,
  Check,
  Compass,
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

const pipeline = [
  {
    title: "Top 24h intake",
    body: "Memes are pulled live from Four.meme and ranked by current 24h trading activity.",
    icon: Radar,
  },
  {
    title: "Multi-select fusion",
    body: "You can select several live memes and tell the engine to merge their strongest traits.",
    icon: Sparkle,
  },
  {
    title: "SocialFi output",
    body: "The result is built to be legible, remixable, and launch-aware instead of just random text blending.",
    icon: MessageSquareShare,
  },
  {
    title: "Launch path",
    body: "The hybrid keeps a token/launch angle so it can later route into Four.meme workflows.",
    icon: Rocket,
  },
];

const memoryLog = [
  "Live rankings are sourced server-side from Four.meme page data instead of hardcoded demo cards.",
  "Fusion works with multi-select input so the output inherits strengths from several active memes.",
  "If OPENAI_API_KEY is configured in Vercel, the backend uses a real OpenAI fusion pass instead of fallback synthesis.",
];

function formatCompact(value: number) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export default function HomePage() {
  const { isConnected, address } = useAccount();
  const [tokens, setTokens] = useState<FourMemeToken[]>([]);
  const [selected, setSelected] = useState<FourMemeToken[]>([]);
  const [fusion, setFusion] = useState<FusionResult | null>(null);
  const [fusionMode, setFusionMode] = useState<"openai" | "fallback" | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [fusing, setFusing] = useState(false);
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
        setSelected(data.tokens.slice(0, 2));
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

  const selectedIds = useMemo(
    () => new Set(selected.map((token) => token.tokenAddress)),
    [selected],
  );

  const totalSelectedVolume = useMemo(
    () => selected.reduce((sum, token) => sum + token.dayTrading, 0),
    [selected],
  );

  const bestGrowth = useMemo(
    () =>
      selected.reduce(
        (best, token) => (token.dayIncrease > best ? token.dayIncrease : best),
        0,
      ),
    [selected],
  );

  function toggleSelection(token: FourMemeToken) {
    setFusion(null);
    setFusionMode(null);
    setWarning(null);

    setSelected((current) => {
      const exists = current.some(
        (item) => item.tokenAddress === token.tokenAddress,
      );

      if (exists) {
        return current.filter((item) => item.tokenAddress !== token.tokenAddress);
      }

      if (current.length >= 4) {
        return [...current.slice(1), token];
      }

      return [...current, token];
    });
  }

  async function runFusion() {
    if (selected.length < 2) return;

    try {
      setFusing(true);
      setWarning(null);
      const response = await fetch("/api/fusion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selected }),
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
      setFusing(false);
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
              Live Four.meme intake + real fusion flow
            </div>

            <p className="text-sm uppercase tracking-[0.32em] text-orange-200/70">
              Content generation + SocialFi + Web3
            </p>
            <h1 className="mt-5 max-w-4xl text-5xl font-black uppercase leading-[0.94] tracking-[-0.05em] text-white sm:text-6xl lg:text-8xl">
              Pick the hot memes,
              <br />
              fuse the strengths,
              <br />
              ship the hybrid.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/72 sm:text-lg">
              Meme-Fusion AI now pulls live Four.meme tokens ranked by current
              24h activity, lets you multi-select the strongest candidates, and
              generates a new hybrid concept by combining the best parts of each.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button
                className="launch-button"
                onClick={runFusion}
                disabled={selected.length < 2 || fusing}
              >
                {fusing ? (
                  <>
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    Fusing now
                  </>
                ) : (
                  <>
                    Fusion
                    <ArrowUpRight className="h-4 w-4" />
                  </>
                )}
              </button>
              <button
                className="ghost-launch-button"
                onClick={() => window.scrollTo({ top: 900, behavior: "smooth" })}
              >
                Explore top 24h memes
              </button>
            </div>

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
                  Selected now
                </p>
                <p className="mt-2 text-2xl font-black tracking-tight text-white">
                  {selected.length}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-white/42">
                  Fusion mode
                </p>
                <p className="mt-2 text-2xl font-black tracking-tight text-sky-300">
                  {fusionMode ? fusionMode : "awaiting run"}
                </p>
              </div>
            </div>
          </div>

          <div className="launch-surface">
            <div className="flex items-start justify-between gap-4 border-b border-white/10 px-6 py-5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-white/42">
                  Fusion console
                </p>
                <h2 className="mt-2 text-2xl font-black uppercase tracking-[-0.04em] text-white">
                  {fusion?.title || "Select several live memes"}
                </h2>
                <p className="mt-2 max-w-sm text-sm leading-6 text-white/58">
                  {fusion?.summary ||
                    "Choose at least two tokens from the live Four.meme top list. The backend will merge strengths like volume pull, growth momentum, and community traction into one new hybrid."}
                </p>
              </div>

              <div className="rounded-full border border-lime-300/25 bg-lime-300/10 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-lime-200">
                {fusing ? "Working" : selected.length >= 2 ? "Ready" : "Pick 2+"}
              </div>
            </div>

              <div className="grid gap-6 px-6 py-6 md:grid-cols-[1.05fr_0.95fr]">
                <div className="space-y-5">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-white/42">
                    Selected input
                  </p>
                  <div className="mt-4 space-y-3">
                    {selected.length === 0 ? (
                      <div className="rounded-[20px] border border-white/8 bg-white/[0.045] p-4 text-sm leading-6 text-white/58">
                        No memes selected yet.
                      </div>
                    ) : (
                      selected.map((item) => (
                        <div
                          key={item.tokenAddress}
                          className="rounded-[20px] border border-white/8 bg-white/[0.045] p-4 backdrop-blur-sm"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-100/80">
                                {item.name}
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
                      The hybrid receives a launch-ready shorthand after fusion.
                    </p>
                  </div>

                  <div className="rounded-[24px] border border-white/8 bg-black/20 p-5">
                    <p className="text-[10px] uppercase tracking-[0.26em] text-white/42">
                      Launch angle
                    </p>
                    <p className="mt-3 text-sm leading-6 text-white/62">
                      {fusion?.launchAngle ||
                        "After fusion, the concept keeps a clear angle for SocialFi spread and eventual Four.meme routing."}
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
                        <Activity className="h-3.5 w-3.5" />
                        Live output
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      <span className="fusion-chip">
                        <Swords className="h-3.5 w-3.5 text-orange-200" />
                        {selected.length} source memes
                      </span>
                      <span className="fusion-chip">
                        <Flame className="h-3.5 w-3.5 text-amber-200" />
                        {formatCompact(totalSelectedVolume)} 24h volume
                      </span>
                      <span className="fusion-chip">
                        <Rocket className="h-3.5 w-3.5 text-sky-200" />
                        {bestGrowth.toFixed(2)}x best growth
                      </span>
                    </div>

                    <div className="mt-5 rounded-[28px] border border-white/10 bg-black/20 p-5">
                      <p className="text-[10px] uppercase tracking-[0.24em] text-white/40">
                        Hybrid title
                      </p>
                      <h3 className="mt-3 text-3xl font-black uppercase tracking-[-0.05em] text-white">
                        {fusion?.title || "Awaiting fusion run"}
                      </h3>
                      <div className="mt-4 inline-flex rounded-full border border-orange-200/20 bg-orange-200/10 px-4 py-2 text-sm font-black uppercase tracking-[0.22em] text-orange-100">
                        ${fusion?.ticker || "PENDING"}
                      </div>
                      <p className="mt-4 text-sm leading-6 text-white/64">
                        {fusion?.summary ||
                          "The generated concept will appear here with a stronger presentation once you run fusion."}
                      </p>
                    </div>

                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <div className="fusion-stat">
                        <p className="text-[10px] uppercase tracking-[0.22em] text-white/38">
                          Inherited strengths
                        </p>
                        <div className="mt-3 space-y-2 text-sm leading-6 text-white/60">
                          {(fusion?.strongPoints || [
                            "The engine will list which strengths were inherited from each selected meme.",
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
                            "The resulting blueprint will explain how the hybrid should look, read, and spread.",
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
                          "After synthesis, the card will include a clearer SocialFi and Four.meme launch angle."}
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
              Live top 24h memes
            </p>
            <h2 className="mt-4 max-w-2xl text-3xl font-black uppercase tracking-[-0.05em] text-white sm:text-4xl">
              Select several trending Four.meme entries, then fuse them into one sharper concept.
            </h2>
          </div>

          <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/70">
            Up to 4 inputs at once
          </div>
        </div>

        {loading ? (
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-64 animate-pulse rounded-[28px] border border-white/8 bg-white/[0.035]"
              />
            ))}
          </div>
        ) : error ? (
          <div className="mt-8 rounded-[28px] border border-rose-300/18 bg-rose-300/8 p-6 text-sm leading-6 text-white/72">
            {error}
          </div>
        ) : (
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {tokens.map((token) => {
              const isSelected = selectedIds.has(token.tokenAddress);

              return (
                <button
                  key={token.tokenAddress}
                  type="button"
                  onClick={() => toggleSelection(token)}
                  className={`group rounded-[28px] border p-5 text-left transition duration-300 ${
                    isSelected
                      ? "border-orange-200/60 bg-orange-300/[0.08]"
                      : "border-white/8 bg-white/[0.035] hover:-translate-y-1 hover:border-white/18 hover:bg-white/[0.055]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <img
                      src={token.imageUrl}
                      alt={token.name}
                      className="h-16 w-16 rounded-2xl border border-white/10 object-cover"
                    />
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full border ${
                        isSelected
                          ? "border-orange-200/50 bg-orange-200/20 text-orange-100"
                          : "border-white/12 bg-white/[0.04] text-white/40"
                      }`}
                    >
                      {isSelected ? <Check className="h-4 w-4" /> : null}
                    </div>
                  </div>

                  <div className="mt-5">
                    <p className="text-xl font-black uppercase tracking-[-0.04em] text-white">
                      {token.name}
                    </p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-white/40">
                      {token.shortName || token.fullName || token.symbol}
                    </p>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.22em] text-white/38">
                        24h volume
                      </p>
                      <p className="mt-2 text-lg font-black text-white">
                        {formatCompact(token.dayTrading)}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.22em] text-white/38">
                        24h growth
                      </p>
                      <p className="mt-2 text-lg font-black text-lime-300">
                        {token.dayIncrease.toFixed(2)}x
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.22em] text-white/38">
                        Holders
                      </p>
                      <p className="mt-2 text-lg font-black text-white">
                        {formatCompact(token.holderCount)}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.22em] text-white/38">
                        Market cap
                      </p>
                      <p className="mt-2 text-lg font-black text-white">
                        ${formatCompact(token.marketCapUsd)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3 text-[10px] uppercase tracking-[0.22em]">
                    <span className="text-white/50">
                      {token.aiCreator ? "AI-created" : "Community-created"}
                    </span>
                    <a
                      href={token.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-orange-100"
                      onClick={(event) => event.stopPropagation()}
                    >
                      Open source
                    </a>
                  </div>
                </button>
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
            Real live intake, then real fusion.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-white/64">
            The app ingests live Four.meme ranking data server-side, lets you
            select multiple candidates, and turns them into one new hybrid with
            inherited strengths rather than random averaging.
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
                The hybrid is built to travel, not just exist.
              </h3>
            </div>
            <div className="rounded-full border border-amber-200/20 bg-amber-200/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-100">
              Wallet-aware virality
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div>
              <Compass className="h-5 w-5 text-orange-200" />
              <p className="mt-4 text-[10px] uppercase tracking-[0.26em] text-white/38">
                Creator ownership
              </p>
              <p className="mt-3 text-sm leading-6 text-white/58">
                The fusion preserves source attribution so remixes can still point
                back to the strongest upstream inputs.
              </p>
            </div>
            <div>
              <Radar className="h-5 w-5 text-orange-200" />
              <p className="mt-4 text-[10px] uppercase tracking-[0.26em] text-white/38">
                Ranked attention
              </p>
              <p className="mt-3 text-sm leading-6 text-white/58">
                Use live market attention from Four.meme as one of the selection
                signals before the fusion even starts.
              </p>
            </div>
            <div>
              <Rocket className="h-5 w-5 text-orange-200" />
              <p className="mt-4 text-[10px] uppercase tracking-[0.26em] text-white/38">
                Tokenization
              </p>
              <p className="mt-3 text-sm leading-6 text-white/58">
                The resulting concept already includes a title, ticker, and launch
                angle for downstream Four.meme workflows.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[32px] border border-white/8 bg-black/20 p-6 sm:p-8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/42">
            Fusion memory
          </p>
          <h3 className="mt-3 text-3xl font-black uppercase tracking-[-0.05em] text-white">
            It keeps track of what is now real.
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
                Live Four.meme intake is wired. Fusion is now executable.
              </h2>
              <p className="mt-4 text-base leading-7 text-white/70">
                The app now does more than describe the idea: it fetches trending
                memes, supports multi-select, and runs a real backend fusion pass.
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
