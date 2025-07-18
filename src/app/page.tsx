"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, useRef, useEffect } from "react";
import { Loader2 } from "lucide-react";

// Add URL detection function
const isUrl = (text: string) => {
  if (!text.includes("http")) {
    return false;
  }
  try {
    new URL(text);
    return true;
  } catch {
    return false;
  }
};

// Add function to convert text with URLs to JSX
const renderTextWithUrls = (text: string) => {
  const words = text.split(/(\s+)/);
  return words.map((word, i) => {
    if (isUrl(word)) {
      return (
        <a
          key={i}
          href={word}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {word}
        </a>
      );
    }
    return word;
  });
};

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const responseRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setResponse("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/triage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ description: prompt }),
        }
      );

      if (!response.ok) throw new Error("Network response was not ok");

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader available");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = new TextDecoder().decode(value, { stream: true });
        setResponse((prev) => prev + text);
      }
    } catch (error) {
      console.error("Error:", error);
      setResponse("An error occurred while fetching the response.");
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-scroll to bottom when response updates
  useEffect(() => {
    if (responseRef.current) {
      responseRef.current.scrollTop = responseRef.current.scrollHeight;
    }
  }, [response]);

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="flex flex-col gap-2 px-4 sm:px-0">
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-4">
          <p className="text-red-800 font-medium text-sm">
            ⚠️ DISCLAIMER: This is a Proof of Concept (POC) only. This tool is
            not intended to provide medical advice, diagnosis, or treatment.
            Always consult with qualified healthcare professionals for medical
            decisions.
          </p>
        </div>
        <p className="text-muted-foreground">
          Describe your symptoms, health concerns, or medication-related
          questions to get started.
        </p>
      </div>

      <Card className="flex-1">
        <CardContent className="p-6">
          <div className="flex flex-col h-[calc(100vh-16rem)] relative">
            <div
              ref={responseRef}
              className="flex-1 overflow-y-auto mb-4 p-4 rounded-lg bg-muted/50"
            >
              {response ? (
                <div className="prose prose-sm max-w-none space-y-4">
                  {response.split("\n").map((line, i) => {
                    // Skip empty lines
                    if (!line.trim()) return null;

                    // Style different types of messages
                    if (line.startsWith("🔍")) {
                      return (
                        <div
                          key={i}
                          className="bg-blue-50 p-3 rounded-lg border border-blue-200 animate-[pulse_2s_ease-in-out_infinite]"
                        >
                          <p className="text-blue-800">{line}</p>
                        </div>
                      );
                    } else if (line.startsWith("💊")) {
                      return (
                        <div
                          key={i}
                          className="bg-green-50 p-3 rounded-lg border border-green-200 animate-[pulse_2s_ease-in-out_infinite]"
                        >
                          <p className="text-green-800">{line}</p>
                        </div>
                      );
                    } else if (line.startsWith("⚠️")) {
                      return (
                        <div
                          key={i}
                          className="bg-yellow-50 p-3 rounded-lg border border-yellow-200 animate-[pulse_2s_ease-in-out_infinite]"
                        >
                          <p className="text-yellow-800">{line}</p>
                        </div>
                      );
                    } else if (line.startsWith("📝")) {
                      return (
                        <div
                          key={i}
                          className="bg-purple-50 p-3 rounded-lg border border-purple-200 animate-[pulse_2s_ease-in-out_infinite]"
                        >
                          <p className="text-purple-800">{line}</p>
                        </div>
                      );
                    } else if (line.startsWith("💬")) {
                      return (
                        <div
                          key={i}
                          className="bg-gray-50/70 p-3 rounded-lg border border-gray-200/70"
                        >
                          <p
                            className="text-gray-500 text-sm"
                            dangerouslySetInnerHTML={{
                              __html: line.replace("💬 ", ""),
                            }}
                          />
                        </div>
                      );
                    }

                    return (
                      <p key={i} className="animate-fade-in">
                        {renderTextWithUrls(line)}
                      </p>
                    );
                  })}
                </div>
              ) : (
                <div className="text-muted-foreground text-center h-full flex sm:items-center justify-center py-4 sm:py-0">
                  Your health assessment will appear here...
                </div>
              )}
            </div>

            <div className="sticky bottom-0 bg-background pt-4 pb-4 border-t">
              <form onSubmit={handleSubmit} className="flex gap-3">
                <Input
                  value={prompt}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPrompt(e.target.value)
                  }
                  placeholder="Can taking Nexium cause nausea?"
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
