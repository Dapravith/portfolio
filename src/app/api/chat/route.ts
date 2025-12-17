import { NextRequest, NextResponse } from "next/server";

type ChatMessage = {
  role: "assistant" | "user" | "system";
  content: string;
};

const profileContext = `
You are ChatGPT, a global AI assistant for visitors to this senior engineer's portfolio. Provide concise, accurate answers for general technology, DevOps, career, translation, and writing questions. When users ask about the portfolio, you can reference:
- Name: Rotha Dapravith — Senior Full-Stack Developer & DevOps Engineer (Java Spring Boot, React/Next.js, Docker, Kubernetes, Jenkins, PostgreSQL, Redis, AWS).
- Experience highlights: DGC (microservices, DevSecOps, SSO/observability), MEF (secure REST, Keycloak/OAuth2, database design), ITC (React/Node.js, responsive UI), Vectorasoft (web fundamentals).
- Strengths: microservices architecture, API contracts, CI/CD automation, cloud/container platforms, identity & access, monitoring/observability, performance tuning.
- Contact: dapravithrotha@gmail.com | LinkedIn https://linkedin.com/in/rotha-dapravith | GitHub https://github.com/Dapravith

Answer globally first—do not limit yourself to the portfolio. Default to clear English unless the user asks in Khmer, in which case respond in Khmer. Ask for clarification when needed and avoid inventing details.
`;

const fallbackSegments = {
  general:
    "I'm a global AI assistant ready to help with coding, DevOps architecture, translations, brainstorming, and career guidance.",
  portfolio:
    "This portfolio belongs to Rotha Dapravith (Senior Full-Stack Developer & DevOps Engineer — Java Spring Boot, React/Next.js, Docker, Kubernetes, Jenkins, PostgreSQL, Redis, AWS). Contact: dapravithrotha@gmail.com | LinkedIn: https://linkedin.com/in/rotha-dapravith | GitHub: https://github.com/Dapravith.",
  prompt:
    "Share a little more context or constraints so I can tailor the answer for you.",
};

function matches(question: string, keywords: string[]) {
  return keywords.some((keyword) => new RegExp(`\\b${keyword}\\b`, "i").test(question));
}

function buildLocalAnswer(question: string) {
  if (matches(question, ["portfolio", "rotha", "dapravith", "resume", "cv"])) {
    return `${fallbackSegments.portfolio} ${fallbackSegments.prompt}`;
  }
  if (matches(question, ["skill", "skills", "stack", "tech", "technology", "tools", "code", "bug", "error", "architecture", "devops"])) {
    return `${fallbackSegments.general} ${fallbackSegments.prompt}`;
  }
  if (matches(question, ["experience", "background", "career", "work", "role"])) {
    return `${fallbackSegments.general} I can also summarize Rotha's senior background if you need it. ${fallbackSegments.prompt}`;
  }
  if (matches(question, ["project", "projects", "portfolio", "github", "code"])) {
    return `${fallbackSegments.general} ${fallbackSegments.portfolio}`;
  }
  if (matches(question, ["contact", "email", "reach", "connect", "hire", "linked", "touch"])) {
    return `${fallbackSegments.portfolio}`;
  }

  return `${fallbackSegments.general} ${fallbackSegments.portfolio}`;
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch((err) => {
    console.error("Invalid chat request JSON", err);
    return {};
  });
  const messages = (body?.messages ?? []) as ChatMessage[];
  const latestQuestion = messages.at(-1)?.content ?? "";

  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json({
      answer: buildLocalAnswer(latestQuestion),
      source: "local",
    });
  }

  const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

  try {
    const completion = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: profileContext },
          ...(messages as ChatMessage[]),
        ],
        temperature: 0.4,
      }),
    });

    if (!completion.ok) {
      throw new Error(`OpenAI error: ${completion.statusText}`);
    }

    const data = await completion.json();
    const answer =
      data?.choices?.[0]?.message?.content?.trim() ||
      buildLocalAnswer(latestQuestion);

    return NextResponse.json({
      answer,
      source: "openai",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Chat API error", message);
    return NextResponse.json({
      answer: buildLocalAnswer(latestQuestion),
      source: "local",
    });
  }
}
