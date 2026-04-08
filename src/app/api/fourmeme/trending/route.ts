import { NextResponse } from "next/server";
import { fetchTrendingFourMemeTokens } from "@/lib/fourmeme";

export const revalidate = 300;

export async function GET() {
  try {
    const tokens = await fetchTrendingFourMemeTokens(12);
    return NextResponse.json({ tokens, fetchedAt: new Date().toISOString() });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown Four.meme fetch error";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
