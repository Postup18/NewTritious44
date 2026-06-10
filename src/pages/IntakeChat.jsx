import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { ArrowLeft, Send, Leaf } from "lucide-react";
import MessageBubble from "@/components/chat/MessageBubble";

export default function IntakeChat() {
  const navigate = useNavigate();
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const bottomRef = useRef(null);

  // Start a new conversation on mount
  useEffect(() => {
    const init = async () => {
      const conv = await base44.agents.createConversation({
        agent_name: "intake_assistant",
        metadata: { name: "Nutrition Intake" },
      });
      setConversation(conv);
      setMessages(conv.messages || []);
      setLoading(false);
    };
    init();
  }, []);

  // Subscribe to real-time updates
  useEffect(() => {
    if (!conversation?.id) return;
    const unsub = base44.agents.subscribeToConversation(conversation.id, (data) => {
      setMessages(data.messages || []);
    });
    return unsub;
  }, [conversation?.id]);

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || sending || !conversation) return;
    setInput("");
    setSending(true);
    await base44.agents.addMessage(conversation, { role: "user", content: text });
    setSending(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#fafaf8" }}>
      {/* Header */}
      <div className="bg-white border-b border-gray-100 py-4 px-6 flex items-center justify-between sticky top-0 z-10">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <div className="flex items-center gap-2">
          <Leaf className="w-5 h-5 text-primary" />
          <span className="font-heading text-lg font-semibold text-gray-900">Nutrition Intake</span>
        </div>
        <div className="w-16" />
      </div>

      {/* Subtitle */}
      <div className="text-center py-6 px-4">
        <p className="font-body text-sm text-muted-foreground max-w-sm mx-auto">
          Chat with our intake assistant to prepare for your first session with Yael.
          <br />Type <span className="font-medium text-foreground">"I'm ready to start"</span> to begin.
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 max-w-2xl w-full mx-auto space-y-4">
        {loading ? (
          <div className="flex justify-center pt-20">
            <div className="w-6 h-6 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "#87a96b", borderTopColor: "transparent" }} />
          </div>
        ) : (
          messages.map((msg, i) => <MessageBubble key={i} message={msg} />)
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="sticky bottom-0 bg-white border-t border-gray-100 px-4 py-4">
        <div className="max-w-2xl mx-auto flex gap-3 items-end">
          <textarea
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message…"
            className="flex-1 border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none resize-none bg-gray-50 focus:bg-white transition-all"
            onFocus={(e) => (e.target.style.borderColor = "#87a96b")}
            onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || sending}
            className="w-11 h-11 rounded-full flex items-center justify-center transition-opacity flex-shrink-0"
            style={{ backgroundColor: input.trim() && !sending ? "#87a96b" : "#c5d9b8" }}
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}