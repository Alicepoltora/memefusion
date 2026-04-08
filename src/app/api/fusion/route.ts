import { NextResponse } from "next/server";
import { buildOpenAIFusion, buildFallbackFusion } from "@/lib/fusion";
import type { FourMemeToken } from "@/lib/fourmeme";

type FusionRequest = {
  selected: FourMemeToken[];
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as FusionRequest;
    const selected = body.selected ?? [];

    if (selected.length < 2) {
      return NextResponse.json(
        { error: "Pick at least two memes before starting fusion." },
        { status: 400 },
      );
    }

    const safeSelection = selected.slice(0, 4);

    try {
      const fusion = await buildOpenAIFusion(safeSelection);
      return NextResponse.json({
        fusion,
        mode: process.env.OPENAI_API_KEY ? "openai" : "fallback",
      });
    } catch (error) {
      const fallback = buildFallbackFusion(safeSelection);
      const message =
        error instanceof Error ? error.message : "OpenAI fusion failed";

      return NextResponse.json({
        fusion: fallback,
        mode: "fallback",
        warning: message,
      });
    }
  } catch {
    return NextResponse.json(
      { error: "Could not parse fusion request." },
      { status: 400 },
    );
  }
}
