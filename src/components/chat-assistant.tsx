"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Bot, Loader2, MessageCircle, Send, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type ChatMessage = {
  role: "assistant" | "user";
  content: string;
};

const knowledgeBase = [
  {
    keywords: ["experience", "background", "career", "work", "role"],
    answer:
      "Rotha is a full-stack developer and DevOps engineer. He currently works as a Java Developer at the Digital Government Committee (DGC) in Phnom Penh and has hands-on experience with Spring Boot, React, Docker, Kubernetes, Jenkins, and PostgreSQL.",
  },
  {
    keywords: ["project", "projects", "portfolio", "github", "code"],
    answer:
      "Recent highlights include a microservices enterprise system, Spring Boot monitoring with Prometheus and Grafana, a Keycloak SSO implementation, and an end-to-end Kubernetes DevSecOps Tetris pipeline. You can see more in the Projects section or on GitHub @Dapravith.",
  },
  {
    keywords: ["skill", "skills", "stack", "tech", "technology", "tools"],
    answer:
      "Key skills: Java & Spring Boot, React and Next.js, TypeScript, Docker, Kubernetes, CI/CD with Jenkins, and cloud experience with AWS. He is comfortable with microservices, RESTful APIs, and modern DevOps practices.",
  },
  {
    keywords: ["contact", "email", "reach", "connect", "hire", "linked", "touch"],
    answer:
      "You can reach Rotha via the contact form on this page, email at dapravithrotha@gmail.com, or connect on LinkedIn at https://linkedin.com/in/rotha-dapravith.",
  },
  {
    keywords: ["resume", "cv", "download"],
    answer:
      "You can download Rotha's resume directly from the hero section or open /Dapravith_Rotha_flow_cv.pdf for the latest copy.",
  },
  {
    keywords: ["location", "based", "where"],
    answer:
      "Rotha is based in Phnom Penh, Cambodia and enjoys collaborating remotely or on-site depending on the project.",
  },
];

const quickPrompts = [
  "What are Rotha's top skills?",
  "Tell me about his recent projects.",
  "How can I contact Rotha?",
];

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi there! I'm Rotha's AI assistant. Ask me about his experience, projects, skills, or how to get in touch.",
    },
  ]);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  const getAnswer = (message: string) => {
    const normalized = message.toLowerCase();
    const match = knowledgeBase.find((entry) =>
      entry.keywords.some((keyword) => normalized.includes(keyword))
    );

    if (match) {
      return match.answer;
    }

    return "I can help with Rotha's skills, projects, and how to contact him. Ask me about what you're looking for, and I'll share the relevant details.";
  };

  const sendMessage = () => {
    const value = input.trim();
    if (!value || isThinking) return;

    setMessages((prev) => [...prev, { role: "user", content: value }]);
    setInput("");
    setIsThinking(true);

    setTimeout(() => {
      const reply = getAnswer(value);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      setIsThinking(false);
    }, 450);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <Card className="w-[320px] sm:w-96 shadow-2xl border-primary/20 bg-background/95 backdrop-blur">
          <CardHeader className="pb-3 flex flex-row items-start justify-between gap-3">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="h-5 w-5 text-primary" />
                AI Assistant
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Ask anything about Rotha&apos;s experience, projects, or availability.
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Close assistant"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="max-h-80 overflow-y-auto space-y-3 pr-1">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={cn(
                    "flex gap-2 text-sm",
                    message.role === "assistant" ? "justify-start" : "justify-end"
                  )}
                >
                  {message.role === "assistant" && (
                    <span className="mt-1 rounded-full bg-primary/10 p-1">
                      <Bot className="h-4 w-4 text-primary" />
                    </span>
                  )}
                  <div
                    className={cn(
                      "rounded-2xl px-4 py-2 shadow-sm",
                      message.role === "assistant"
                        ? "bg-primary/10 text-foreground"
                        : "bg-primary text-primary-foreground"
                    )}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {isThinking && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Thinking...
                </div>
              )}
              <div ref={endRef} />
            </div>

            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((prompt) => (
                <Button
                  key={prompt}
                  variant="secondary"
                  size="sm"
                  className="text-xs"
                  onClick={() => setInput(prompt)}
                >
                  {prompt}
                </Button>
              ))}
            </div>
          </CardContent>

          <CardFooter className="flex items-end gap-2">
            <Textarea
              placeholder="Type a question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={2}
            />
            <Button
              size="icon"
              className="self-stretch"
              onClick={sendMessage}
              disabled={!input.trim() || isThinking}
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      <Button
        size="lg"
        className="gap-2 shadow-lg hover:shadow-xl"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Open AI assistant"
      >
        <MessageCircle className="h-5 w-5" />
        {isOpen ? "Hide Assistant" : "Ask Rotha AI"}
      </Button>
    </div>
  );
}
