"use client";

import { Navbar } from "@/components/layout/Navbar";
import {
  Activity,
  ArrowUpRight,
  BrainCircuit,
  Coins,
  Compass,
  Layers3,
  MessageSquareShare,
  Sparkle,
  Radar,
  Rocket,
  ShieldCheck,
  Swords,
  Waves,
} from "lucide-react";
import { useAccount } from "wagmi";

const fusionInputs = [
  {
    source: "Distracted Boyfriend",
    handle: "template",
    headline: "Instantly readable jealousy triangle with crowd-recognition power",
    velocity: "93% recall",
  },
  {
    source: "Wojak Trader",
    handle: "character",
    headline: "Crypto-native anxiety, cope, conviction and exit-liquidity irony",
    velocity: "11 subcultures",
  },
  {
    source: "Mocking SpongeBob",
    handle: "caption mode",
    headline: "Text rhythm for sarcastic replies, quote-tweets and stitched remix posts",
    velocity: "4.8x remix rate",
  },
];

const pipeline = [
  {
    title: "Meme Intake",
    body: "Users pick two or more templates, captions, or characters while the engine extracts layout grammar, emotional tone, and cultural overlap.",
    icon: Layers3,
  },
  {
    title: "Fusion Engine",
    body: "AI generates a hybrid meme format instead of a single caption, preserving recognizable structure while inventing a new punchline frame.",
    icon: Sparkle,
  },
  {
    title: "SocialFi Ranking",
    body: "Every hybrid earns votes, remixes, and onchain reputation so the funniest crossovers climb a creator-owned leaderboard.",
    icon: MessageSquareShare,
  },
  {
    title: "Four.meme Route",
    body: "Top-performing hybrids can become launch candidates on Four.meme with token metadata, pair choice, and optional tax-token mechanics on BNB Chain.",
    icon: Rocket,
  },
  {
    title: "Memory Graph",
    body: "The system stores which meme DNA actually converts, helping future fusions avoid dead formats and repeat breakout combinations.",
    icon: BrainCircuit,
  },
];

const launchMetrics = [
  { label: "Fusion score", value: "96.2%", tone: "text-lime-300" },
  { label: "Remix time", value: "22 sec", tone: "text-white" },
  { label: "SocialFi boost", value: "+318 votes", tone: "text-amber-200" },
  { label: "Launch path", value: "Four.meme ready", tone: "text-sky-300" },
];

const memoryLog = [
  "Rejected a Pepe x Drake blend because the caption grammar collapsed on mobile crops.",
  "Boosted a SpongeBob x Wojak hybrid after quote-tweet sarcasm outperformed original posts 2.4x.",
  "Flagged a token launch candidate for Four.meme because a similar ticker already traded this week.",
];

const socialRails = [
  {
    label: "Creator ownership",
    body: "Mint provenance for the original fusion prompt, contributors, and remix lineage.",
    icon: Compass,
  },
  {
    label: "Ranked attention",
    body: "Votes, saves, repost velocity, and wallet-linked engagement shape the daily ladder.",
    icon: Radar,
  },
  {
    label: "Tokenization",
    body: "Winning hybrids can route into a launch flow with base-pair selection and tax-token options.",
    icon: Coins,
  },
];

export default function HomePage() {
  const { isConnected, address } = useAccount();

  return (
    <main className="min-h-screen pb-20">
      <Navbar />

      <section className="relative overflow-hidden px-6 pb-14 pt-8 sm:px-8 lg:px-10">
        <div className="hero-noise pointer-events-none absolute inset-0 opacity-60" />
        <div className="absolute inset-x-0 top-0 h-[38rem] bg-[radial-gradient(circle_at_18%_18%,rgba(255,122,26,0.24),transparent_34%),radial-gradient(circle_at_78%_22%,rgba(242,201,76,0.16),transparent_30%),radial-gradient(circle_at_60%_58%,rgba(79,172,254,0.16),transparent_28%)]" />

        <div className="relative mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div className="max-w-3xl py-8 lg:py-14">
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/72 backdrop-blur">
              <span className="inline-block h-2 w-2 rounded-full bg-lime-300 shadow-[0_0_18px_rgba(190,242,100,0.9)]" />
              Meme-Fusion AI / SocialFi remix engine on BNB Chain
            </div>

            <p className="text-sm uppercase tracking-[0.32em] text-orange-200/70">
              Content generation + SocialFi + Web3
            </p>
            <h1 className="mt-5 max-w-4xl text-5xl font-black uppercase leading-[0.94] tracking-[-0.05em] text-white sm:text-6xl lg:text-8xl">
              Fuse the meme,
              <br />
              rank the culture,
              <br />
              launch the winner.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/72 sm:text-lg">
              Users combine two or more meme formats, AI rebuilds them into a
              hybrid that still feels culturally legible, and community traction
              decides which fusion deserves to graduate into a Four.meme launch
              flow.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button className="launch-button">
                Start a fusion
                <ArrowUpRight className="h-4 w-4" />
              </button>
              <button className="ghost-launch-button">
                View SocialFi loop
              </button>
            </div>

            <div className="mt-12 grid gap-6 border-t border-white/10 pt-8 text-sm text-white/72 sm:grid-cols-3">
              {launchMetrics.map((metric) => (
                <div key={metric.label}>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-white/42">
                    {metric.label}
                  </p>
                  <p className={`mt-2 text-2xl font-black tracking-tight ${metric.tone}`}>
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[36rem] lg:pb-6">
            <div className="absolute left-[8%] top-[8%] h-36 w-36 rounded-full bg-orange-500/20 blur-3xl" />
            <div className="absolute bottom-[16%] right-[2%] h-40 w-40 rounded-full bg-sky-500/20 blur-3xl" />
            <div className="fusion-orb left-[6%] top-[14%] h-40 w-40 bg-[radial-gradient(circle_at_28%_28%,#ffe3ba,#ff8b2b_54%,#301406_100%)]" />
            <div className="fusion-orb right-[8%] top-[8%] h-52 w-52 bg-[radial-gradient(circle_at_32%_28%,#d5f4ff,#45b9ff_56%,#071724_100%)]" />
            <div className="fusion-orb bottom-[8%] left-[22%] h-56 w-56 bg-[radial-gradient(circle_at_32%_28%,#fff2a8,#ff6f61_52%,#1c0814_100%)]" />
            <div className="fusion-beam left-[24%] top-[34%] w-[52%] rotate-[14deg]" />
            <div className="fusion-beam left-[28%] top-[54%] w-[36%] -rotate-[28deg]" />

            <div className="launch-surface absolute inset-x-[8%] bottom-0 top-[26%]">
              <div className="flex items-start justify-between gap-4 border-b border-white/10 px-6 py-5">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-white/42">
                    Active fusion
                  </p>
                  <h2 className="mt-2 text-2xl font-black uppercase tracking-[-0.04em] text-white">
                    WOJAKTED BOYFRIEND
                  </h2>
                  <p className="mt-2 max-w-sm text-sm leading-6 text-white/58">
                    Hybrid format that splices triangle jealousy framing with
                    crypto-trader panic, producing a reusable template for
                    market-rotation jokes.
                  </p>
                </div>

                <div className="rounded-full border border-lime-300/25 bg-lime-300/10 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-lime-200">
                  Ready to rank
                </div>
              </div>

              <div className="grid gap-6 px-6 py-6 md:grid-cols-[1.1fr_0.9fr]">
                <div className="space-y-5">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.28em] text-white/42">
                      Fusion DNA
                    </p>
                    <div className="mt-4 space-y-3">
                      {fusionInputs.map((item) => (
                        <div
                          key={`${item.source}-${item.handle}`}
                          className="rounded-[20px] border border-white/8 bg-white/[0.045] p-4 backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-white/16 hover:bg-white/[0.07]"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-100/80">
                                {item.source} / {item.handle}
                              </p>
                              <p className="mt-2 text-sm leading-6 text-white/78">
                                {item.headline}
                              </p>
                            </div>
                            <div className="rounded-full bg-orange-400/12 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-orange-100">
                              {item.velocity}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[24px] border border-white/8 bg-black/20 p-5">
                      <p className="text-[10px] uppercase tracking-[0.26em] text-white/42">
                        Meme outcome
                      </p>
                      <p className="mt-3 text-xl font-black uppercase tracking-[-0.04em] text-white">
                        Stageable format
                      </p>
                      <p className="mt-2 text-sm leading-6 text-white/62">
                        “One frame for regret, one frame for cope, one frame for
                        the next shiny narrative.”
                      </p>
                    </div>

                    <div className="rounded-[24px] border border-white/8 bg-black/20 p-5">
                      <p className="text-[10px] uppercase tracking-[0.26em] text-white/42">
                        Launch route
                      </p>
                      <p className="mt-3 text-xl font-black uppercase tracking-[-0.04em] text-white">
                        Four.meme bridge
                      </p>
                      <p className="mt-2 text-sm leading-6 text-white/62">
                        If community traction persists, convert the winning
                        fusion into metadata, ticker, pair settings and an
                        optional tax-token design.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.03))] p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-white/42">
                      Agent console
                    </p>
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-lime-200">
                      <Activity className="h-3.5 w-3.5" />
                      Live loop
                    </div>
                  </div>

                  <div className="mt-5 space-y-4">
                    <div className="rounded-[22px] border border-white/8 bg-black/20 p-4">
                      <div className="flex items-center gap-3">
                        <Swords className="h-4 w-4 text-orange-300" />
                        <p className="text-sm font-semibold text-white">
                          Structural overlap confirmed
                        </p>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-white/58">
                        Caption rhythm, panel geometry, and emotional contrast
                        aligned above the minimum fusion threshold.
                      </p>
                    </div>

                    <div className="rounded-[22px] border border-white/8 bg-black/20 p-4">
                      <div className="flex items-center gap-3">
                        <Coins className="h-4 w-4 text-amber-200" />
                        <p className="text-sm font-semibold text-white">
                          Four.meme payload assembled
                        </p>
                      </div>
                      <div className="mt-3 space-y-2 text-sm text-white/58">
                        <p>Name: Wojakted Boyfriend</p>
                        <p>Ticker: WOBO</p>
                        <p>Supply: 1,000,000,000</p>
                        <p>Pair: BNB or USDT</p>
                      </div>
                    </div>

                    <div className="rounded-[22px] border border-sky-300/18 bg-sky-300/8 p-4">
                      <div className="flex items-center gap-3">
                        <ShieldCheck className="h-4 w-4 text-sky-200" />
                        <p className="text-sm font-semibold text-white">
                          Protocol checks applied
                        </p>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-white/62">
                        Concept passed duplicate screening, creator provenance,
                        and a launch-mode review based on current Four.meme
                        integration docs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-divider mx-auto grid max-w-[1500px] gap-8 px-6 py-10 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
        <div className="pt-6">
          <p className="text-[10px] uppercase tracking-[0.32em] text-orange-200/65">
            How it works
          </p>
          <h2 className="mt-4 max-w-lg text-3xl font-black uppercase tracking-[-0.05em] text-white sm:text-4xl">
            A meme pipeline built for collision, not copy-paste templates.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-white/64">
            Each stage owns one job: ingest references, fuse their cultural
            codes, let the crowd validate the result, then route the winners
            into monetization and launch infrastructure.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
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
                The hybrid spreads first, then the economy wraps around it.
              </h3>
            </div>
            <div className="rounded-full border border-amber-200/20 bg-amber-200/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-100">
              Community-owned virality
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {socialRails.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.label}>
                  <Icon className="h-5 w-5 text-orange-200" />
                  <p className="mt-4 text-[10px] uppercase tracking-[0.26em] text-white/38">
                    {item.label}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-white/58">
                    {item.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-[32px] border border-white/8 bg-black/20 p-6 sm:p-8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/42">Fusion memory</p>
          <h3 className="mt-3 text-3xl font-black uppercase tracking-[-0.05em] text-white">
            It remembers which meme genes actually survive the timeline.
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
                Integration-ready concept
              </p>
              <h2 className="mt-4 text-3xl font-black uppercase tracking-[-0.05em] text-white sm:text-4xl">
                Built to showcase AI meme fusion with a believable Four.meme endpoint.
              </h2>
              <p className="mt-4 text-base leading-7 text-white/70">
                The product story now connects content creation, community
                competition, and token launch mechanics without feeling like
                three separate apps taped together.
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
