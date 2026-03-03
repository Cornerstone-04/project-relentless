import { type NextRequest, NextResponse } from "next/server";
import { render } from "@react-email/components";
import { Resend } from "resend";
import ConfirmationEmail from "../../../emails/email";
import { PROJECT_DOCS_URL, PROJECT_SHEETS_URL } from "@/lib/constants";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

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
    } = body;

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
      from: "Project Relentless <onboarding@resend.dev>",
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
