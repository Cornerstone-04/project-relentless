import { type NextRequest, NextResponse } from "next/server";
import { render } from "@react-email/components";
import { Resend } from "resend";
import ConfirmationEmail from "../../../emails/email";
import {
  PROJECT_DOCS_URL,
  PROJECT_SHEETS_URL,
  RESEND_API_KEY,
} from "@/lib/constants";
import { joinSchema } from "@/lib/join";
import { appendSignup, isAlreadySignedUp } from "@/lib/sheets";
import { ratelimit } from "@/lib/ratelimit";

const resend = new Resend(RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "anonymous";
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  try {
    const body = await req.json();

    const result = joinSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
    }

    const {
      fullName,
      email,
      handle,
      platforms,
      pillar1,
      pillar2,
      pillar3,
      frequency,
      postingDays,
      goal,
    } = result.data;

    const duplicate = await isAlreadySignedUp(result.data.email);
    if (duplicate) {
      return NextResponse.json(
        { error: "You've already signed up!" },
        { status: 409 },
      );
    }

    await appendSignup({
      fullName,
      email,
      handle,
      platforms,
      pillar1,
      pillar2,
      pillar3,
      frequency,
      postingDays,
      goal,
    });

    await resend.emails.send({
      from: "Project Relentless <hello@projectrelentless.live>",
      to: ["fortunecornerstone@gmail.com", "boluwatifeajolore@gmail.com"],
      subject: `New signup: ${fullName}`,
      html: `
        <p><strong>${fullName}</strong> just signed up.</p>
        <p>Email: ${email}</p>
        <p>Handle: @${handle} on ${platforms.join(", ")}</p>
        <p>Pillars: ${[pillar1, pillar2, pillar3].filter(Boolean).join(", ")}</p>
        <p>Frequency: ${frequency} per week</p>
        <p>Posting days: ${postingDays.join(", ")}</p>
        <p>Goal: ${goal}</p>
      `,
    });

    // Render email to HTML
    const html = await render(
      ConfirmationEmail({
        fullName,
        handle,
        platforms,
        pillar1,
        pillar2,
        pillar3,
        frequency,
        postingDays,
        goal,
        trackerUrl: PROJECT_SHEETS_URL ?? "",
        guideUrl: PROJECT_DOCS_URL ?? "",
      }),
    );

    await resend.emails.send({
      from: "Project Relentless <hello@projectrelentless.live>",
      to: email,
      subject: "You're locked in. Now execute. 🔒",
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
