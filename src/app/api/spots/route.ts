import { NextResponse } from "next/server";
import { getSignupCount } from "@/lib/sheets";

export async function GET() {
  try {
    const count = await getSignupCount();
    return NextResponse.json({
      count,
      remaining: Math.max(0, 10 - count),
      full: count >= 10,
    });
  } catch {
    return NextResponse.json({ count: 0, remaining: 10, full: false });
  }
}
