import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "The contact form is unavailable. Please use the email link on the contact page." },
    { status: 503 },
  );
}
