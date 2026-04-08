export type FourMemeToken = {
  id: number;
  tokenAddress: string;
  name: string;
  fullName?: string;
  shortName?: string;
  imageUrl: string;
  symbol: string;
  dayTrading: number;
  dayIncrease: number;
  marketCapUsd: number;
  holderCount: number;
  progress: number;
  aiCreator: boolean;
  sourceUrl: string;
};

type FourMemePayload = {
  props?: {
    pageProps?: {
      initialData?: Array<{
        id: number;
        tokenAddress: string;
        name: string;
        fullName?: string;
        shortName?: string;
        imageURL?: string;
        symbol?: string;
        aiCreator?: boolean;
        tokenPrice?: {
          dayTrading?: string;
          dayIncrease?: string;
          marketCapUsd?: string;
          holderCount?: number;
          progress?: number;
        };
      }>;
    };
  };
};

const NEXT_DATA_PATTERN =
  /<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/;

function normalizeImageUrl(imageUrl?: string) {
  if (!imageUrl) return "https://four.meme/apple-touch-icon.png";
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }
  return `https://four.meme${imageUrl}`;
}

function toNumber(value?: string | number) {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

export async function fetchTrendingFourMemeTokens(limit = 12) {
  const response = await fetch("https://four.meme", {
    headers: {
      "user-agent":
        "memefusion-bot/1.0 (+https://memefusion.vercel.app)",
      accept: "text/html,application/xhtml+xml",
    },
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`Four.meme request failed with ${response.status}`);
  }

  const html = await response.text();
  const match = html.match(NEXT_DATA_PATTERN);

  if (!match?.[1]) {
    throw new Error("Could not locate Four.meme __NEXT_DATA__ payload");
  }

  const nextData = JSON.parse(match[1]) as FourMemePayload;
  const initialData = nextData.props?.pageProps?.initialData ?? [];

  const tokens: FourMemeToken[] = initialData
    .map((item) => ({
      id: item.id,
      tokenAddress: item.tokenAddress,
      name: item.name,
      fullName: item.fullName,
      shortName: item.shortName,
      imageUrl: normalizeImageUrl(item.imageURL),
      symbol: item.symbol ?? "BNB",
      dayTrading: toNumber(item.tokenPrice?.dayTrading),
      dayIncrease: toNumber(item.tokenPrice?.dayIncrease),
      marketCapUsd: toNumber(item.tokenPrice?.marketCapUsd),
      holderCount: item.tokenPrice?.holderCount ?? 0,
      progress: toNumber(item.tokenPrice?.progress),
      aiCreator: Boolean(item.aiCreator),
      sourceUrl: `https://four.meme/token/${item.tokenAddress}`,
    }))
    .filter((item) => item.tokenAddress && item.name)
    .sort((a, b) => b.dayTrading - a.dayTrading)
    .slice(0, limit);

  return tokens;
}
