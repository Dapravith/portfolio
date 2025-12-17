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

const quickPrompts = [
  "Explain Kubernetes in simple terms.",
  "Create a study plan to grow into a senior full-stack engineer.",
  "Summarize this portfolio in two bullet points.",
];

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi there! I'm an AI assistant powered by ChatGPT. Ask me anything—from global tech questions and translations to details about this portfolio.",
    },
  ]);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  const getAnswer = (message: string) => {
    if (!message.trim()) {
      return "I'm a global AI assistant powered by ChatGPT. Ask me about technology, career moves, writing, translations, or this portfolio.";
    }

    return "I'm a global AI assistant powered by ChatGPT. Share any topic—code, DevOps, architecture, career advice, or portfolio questions—and I'll craft a concise answer.";
  };

  const sendMessage = async () => {
    const value = input.trim();
    if (!value || isThinking) return;

    const userMessage: ChatMessage = { role: "user", content: value };
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput("");
    setIsThinking(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: nextMessages }),
    });

    if (!response.ok) {
      throw new Error(`Chat API responded with ${response.status}`);
    }

    const data = await response.json();
    const reply = data?.answer ?? getAnswer(value);

    setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
  } catch (error) {
      console.error("Chat assistant error", error);
      const reply = getAnswer(value);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } finally {
      setIsThinking(false);
    }
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
                Ask anything—tech, career, translations, or portfolio details.
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
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
        {isOpen ? "Hide Assistant" : "Ask AI"}
      </Button>
    </div>
  );
}
