import { NextRequest, NextResponse } from "next/server";

type ChatMessage = {
  role: "assistant" | "user" | "system";
  content: string;
};

const profileContext = `
You are Rotha Dapravith's global portfolio assistant. Respond concisely and factually.

Profile:
- Senior Full-Stack Developer & DevOps Engineer (Java Spring Boot, React/Next.js, Docker, Kubernetes, Jenkins, PostgreSQL, Redis, AWS).
- Experience:
  • Senior Java Developer & DevOps Lead @ DGC (Oct 2024 - Aug 2025): architecture and delivery of microservices, DevOps automation, SSO/observability hardening.
  • Software Developer @ MEF (Feb 2024 - July 2024): secure REST APIs, Keycloak/OAuth2, database design and performance.
  • Fullstack Developer @ ITC (Jul 2023 - Oct 2023): React/Node.js, Express APIs, responsive UI.
  • Web Developer Intern @ Vectorasoft (Jul 2022 - Oct 2022): HTML/CSS/JS/React fundamentals.
- Skills: microservices, API design, CI/CD, containers, cloud, identity & access, monitoring/observability, performance tuning.
- Contact: dapravithrotha@gmail.com, LinkedIn https://linkedin.com/in/rotha-dapravith, GitHub https://github.com/Dapravith.

Always highlight relevant projects, skills, and availability when asked. Keep answers helpful for recruiters or collaborators.
`;

const fallbackSegments = {
  skills:
    "Core skills: Java & Spring Boot, React/Next.js, TypeScript, Docker, Kubernetes, Jenkins CI/CD, PostgreSQL, Redis, AWS. Strengths include microservices architecture, API contracts, security/SSO, observability, and performance tuning.",
  experience:
    "Experience highlights: Senior Java Developer & DevOps Lead at DGC (Oct 2024 - Aug 2025) delivering microservices and hardened CI/CD on Kubernetes; Software Developer at MEF (Feb 2024 - Jul 2024) building secure REST APIs with Keycloak; Fullstack Developer at ITC (Jul 2023 - Oct 2023) with React/Node.js; Web Developer Intern at Vectorasoft (Jul 2022 - Oct 2022) learning modern web fundamentals.",
  projects:
    "Recent projects: microservices enterprise system with discovery, gateway, tracing; Spring Boot monitoring with Prometheus/Grafana; Keycloak SSO integration; end-to-end Kubernetes DevSecOps pipeline for Tetris deployment.",
  contact:
    "Contact: dapravithrotha@gmail.com | LinkedIn: https://linkedin.com/in/rotha-dapravith | GitHub: https://github.com/Dapravith. Available for senior full-stack and DevOps engagements.",
};

function matches(question: string, keywords: string[]) {
  return keywords.some((keyword) => new RegExp(`\\b${keyword}\\b`, "i").test(question));
}

function buildLocalAnswer(question: string) {
  if (matches(question, ["skill", "skills", "stack", "tech", "technology", "tools"])) {
    return `${fallbackSegments.skills} ${fallbackSegments.contact}`;
  }
  if (matches(question, ["experience", "background", "career", "work", "role"])) {
    return `${fallbackSegments.experience} ${fallbackSegments.contact}`;
  }
  if (matches(question, ["project", "projects", "portfolio", "github", "code"])) {
    return `${fallbackSegments.projects} ${fallbackSegments.contact}`;
  }
  if (matches(question, ["contact", "email", "reach", "connect", "hire", "linked", "touch"])) {
    return fallbackSegments.contact;
  }

  return `${fallbackSegments.skills} ${fallbackSegments.experience} ${fallbackSegments.projects} ${fallbackSegments.contact}`;
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
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
    console.error("Chat API error", (error as Error).message);
    return NextResponse.json({
      answer: buildLocalAnswer(latestQuestion),
      source: "local",
    });
  }
}
