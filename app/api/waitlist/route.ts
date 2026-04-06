import { NextRequest, NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email: unknown = body?.email;

    if (typeof email !== "string" || !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    // TODO: Uncomment when Supabase is configured
    // const { data, error } = await supabase
    //   .from("waitlist")
    //   .insert({ email, created_at: new Date().toISOString() });
    // if (error) {
    //   if (error.code === "23505") {
    //     return NextResponse.json({ error: "Already on the waitlist." }, { status: 409 });
    //   }
    //   throw error;
    // }

    return NextResponse.json(
      { success: true, message: "Added to waitlist" },
      { status: 200 }
    );
  } catch (err) {
    console.error("[waitlist]", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
