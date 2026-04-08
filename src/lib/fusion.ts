import type { FourMemeToken } from "@/lib/fourmeme";

export type FusionResult = {
  title: string;
  ticker: string;
  summary: string;
  strongPoints: string[];
  formatBlueprint: string[];
  launchAngle: string;
};

function unique<T>(values: T[]) {
  return Array.from(new Set(values));
}

export function buildFallbackFusion(tokens: FourMemeToken[]): FusionResult {
  const names = tokens.map((token) => token.name);
  const shortNames = tokens
    .map((token) => token.shortName || token.name)
    .filter(Boolean);

  const title = unique(shortNames)
    .slice(0, 3)
    .join(" x ")
    .slice(0, 80);

  const ticker = unique(
    names
      .map((name) =>
        name
          .replace(/[^a-zA-Z0-9]/g, "")
          .toUpperCase()
          .slice(0, 3),
      )
      .filter(Boolean),
  )
    .join("")
    .slice(0, 8) || "FUSION";

  const strongestVolume = [...tokens].sort((a, b) => b.dayTrading - a.dayTrading)[0];
  const strongestGrowth = [...tokens].sort((a, b) => b.dayIncrease - a.dayIncrease)[0];
  const strongestCommunity = [...tokens].sort(
    (a, b) => b.holderCount - a.holderCount,
  )[0];

  return {
    title,
    ticker,
    summary: `${title} combines the highest 24h trading pull from ${strongestVolume.name}, the fastest growth impulse from ${strongestGrowth.name}, and the widest holder traction from ${strongestCommunity.name}.`,
    strongPoints: [
      `${strongestVolume.name}: strongest current market attention by 24h trading volume.`,
      `${strongestGrowth.name}: strongest short-term momentum by 24h percentage growth.`,
      `${strongestCommunity.name}: strongest wallet-based participation by holder count.`,
    ],
    formatBlueprint: [
      "Keep the most recognizable visual motif from the highest-volume meme.",
      "Inject the fastest-growing meme's tone as the main punchline energy.",
      "Use the widest-holder meme as the community-facing hook for remixes and replies.",
    ],
    launchAngle:
      "Position it as a crowd-legible crossover that inherits liquidity attention, momentum language, and social replayability from the selected source memes.",
  };
}

export async function buildOpenAIFusion(tokens: FourMemeToken[]) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return buildFallbackFusion(tokens);
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-5.4-mini",
      reasoning: { effort: "low" },
      text: {
        format: {
          type: "json_schema",
          name: "meme_fusion_result",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              title: { type: "string" },
              ticker: { type: "string" },
              summary: { type: "string" },
              strongPoints: {
                type: "array",
                items: { type: "string" },
                minItems: 3,
                maxItems: 5,
              },
              formatBlueprint: {
                type: "array",
                items: { type: "string" },
                minItems: 3,
                maxItems: 5,
              },
              launchAngle: { type: "string" },
            },
            required: [
              "title",
              "ticker",
              "summary",
              "strongPoints",
              "formatBlueprint",
              "launchAngle",
            ],
          },
        },
      },
      input: [
        {
          role: "system",
          content: [
            {
              type: "input_text",
              text: "You are a meme fusion strategist. Combine the strongest traits of selected memes into one new hybrid. Preserve only the strongest recognizable elements, avoid bland averaging, and optimize for virality, remixability, and launch-readiness. Return concise structured JSON.",
            },
          ],
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: `Selected Four.meme tokens:\n${JSON.stringify(tokens, null, 2)}\n\nCreate a new hybrid meme/token concept by identifying the strongest elements from each selection and synthesizing them into one sharper concept. StrongPoints must explicitly attribute what is inherited from each source meme.`,
            },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI fusion request failed: ${response.status} ${errorText}`);
  }

  const payload = (await response.json()) as { output_text?: string };
  const outputText = payload.output_text?.trim();

  if (!outputText) {
    throw new Error("OpenAI fusion response was empty");
  }

  return JSON.parse(outputText) as FusionResult;
}
