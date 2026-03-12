import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { PageTransition, CraftButton, CraftInput } from "@/components/Craft";
import { chatService } from "@/services/api";
import { Send, Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function ChatPage() {
  const [searchParams] = useSearchParams();
  const workspaceId = Number(searchParams.get("workspace")) || 1;
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await chatService.sendMessage(workspaceId, userMsg.content);
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: "assistant", content: response }]);
    } catch {
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: "assistant", content: "Sorry, something went wrong." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto py-8 px-6 h-[calc(100vh-57px)] flex flex-col">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-foreground">AI Research Assistant</h1>
          <p className="text-sm text-muted-foreground">Ask questions about papers in workspace #{workspaceId}</p>
        </div>

        {/* Chat area */}
        <div className="flex-1 bg-card shadow-craft rounded-2xl p-2 flex flex-col overflow-hidden">
          <div className="bg-muted/30 rounded-lg flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Bot className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground text-sm">Ask a question about your research papers.</p>
                  <div className="flex flex-wrap gap-2 mt-4 justify-center">
                    {["Summarize the papers", "Compare methodologies", "Key findings"].map(q => (
                      <button
                        key={q}
                        onClick={() => setInput(q)}
                        className="text-xs px-3 py-1.5 rounded-full bg-card shadow-craft text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {messages.map(msg => (
              <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                )}
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card shadow-craft"
                }`}>
                  {msg.role === "assistant" ? (
                    <div className="prose prose-sm max-w-none text-foreground [&_table]:text-xs [&_th]:p-2 [&_td]:p-2">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  ) : (
                    msg.content
                  )}
                </div>
                {msg.role === "user" && (
                  <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User className="w-4 h-4 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary animate-pulse-subtle" />
                </div>
                <div className="bg-card shadow-craft rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground/30 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 bg-muted-foreground/30 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 bg-muted-foreground/30 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <form onSubmit={sendMessage} className="flex gap-2 p-2">
            <div className="flex-1">
              <CraftInput
                placeholder="Ask about your research..."
                value={input}
                onChange={e => setInput(e.target.value)}
                disabled={loading}
              />
            </div>
            <CraftButton type="submit" disabled={loading || !input.trim()}>
              <Send className="w-4 h-4" />
            </CraftButton>
          </form>
        </div>
      </div>
    </PageTransition>
  );
}
