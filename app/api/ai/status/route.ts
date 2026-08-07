import { NextResponse } from "next/server";
import { isAiAvailable } from "@/lib/ai/availability";

/** Read at request time — build-time credit status would be meaningless. */
export const dynamic = "force-dynamic";

export async function GET() {
  const available = await isAiAvailable();

  return NextResponse.json(
    { available },
    // Let the browser reuse the answer briefly, but never a shared cache:
    // availability is account state, not page content.
    { headers: { "Cache-Control": "private, max-age=60" } },
  );
}
