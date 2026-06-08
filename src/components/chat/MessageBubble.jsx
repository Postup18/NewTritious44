import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Loader2, CheckCircle2, AlertCircle, Clock, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const FunctionDisplay = ({ toolCall }) => {
  const [expanded, setExpanded] = useState(false);
  const name = toolCall?.name || "Function";
  const status = toolCall?.status || "pending";

  const statusConfig = {
    pending: { icon: Clock, color: "text-slate-400", text: "Pending" },
    running: { icon: Loader2, color: "text-slate-500", text: "Running...", spin: true },
    in_progress: { icon: Loader2, color: "text-slate-500", text: "Running...", spin: true },
    completed: { icon: CheckCircle2, color: "text-green-600", text: "Done" },
    success: { icon: CheckCircle2, color: "text-green-600", text: "Done" },
    failed: { icon: AlertCircle, color: "text-red-500", text: "Failed" },
  }[status] || { icon: Clock, color: "text-slate-400", text: "" };

  const Icon = statusConfig.icon;
  const label = name.split(".").reverse().join(" ").toLowerCase();

  return (
    <div className="mt-2 text-xs">
      <button
        onClick={() => setExpanded(!expanded)}
        className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all hover:bg-slate-50",
          expanded ? "bg-slate-50 border-slate-300" : "bg-white border-slate-200"
        )}
      >
        <Icon className={cn("h-3 w-3", statusConfig.color, statusConfig.spin && "animate-spin")} />
        <span className="text-slate-700">{label}</span>
        {statusConfig.text && <span className="text-slate-500">• {statusConfig.text}</span>}
        {toolCall.results && <ChevronRight className={cn("h-3 w-3 text-slate-400 ml-auto transition-transform", expanded && "rotate-90")} />}
      </button>
      {expanded && toolCall.results && (
        <div className="mt-1.5 ml-3 pl-3 border-l-2 border-slate-200">
          <pre className="bg-slate-50 rounded-md p-2 text-xs text-slate-600 whitespace-pre-wrap max-h-40 overflow-auto">
            {typeof toolCall.results === "object" ? JSON.stringify(toolCall.results, null, 2) : toolCall.results}
          </pre>
        </div>
      )}
    </div>
  );
};

export default function MessageBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex gap-3", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <div className="h-7 w-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: "#f0f5ec" }}>
          <span className="text-xs">🌿</span>
        </div>
      )}
      <div className={cn("max-w-[85%]", isUser && "flex flex-col items-end")}>
        {message.content && (
          <div
            className={cn("rounded-2xl px-4 py-3", isUser ? "text-white" : "bg-white border border-gray-100")}
            style={isUser ? { backgroundColor: "#87a96b" } : {}}
          >
            {isUser ? (
              <p className="text-sm leading-relaxed">{message.content}</p>
            ) : (
              <ReactMarkdown
                className="text-sm prose prose-sm prose-slate max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
                components={{
                  p: ({ children }) => <p className="my-1 leading-relaxed">{children}</p>,
                  ul: ({ children }) => <ul className="my-1 ml-4 list-disc">{children}</ul>,
                  ol: ({ children }) => <ol className="my-1 ml-4 list-decimal">{children}</ol>,
                  li: ({ children }) => <li className="my-0.5">{children}</li>,
                  strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
                  h1: ({ children }) => <h1 className="text-base font-semibold my-2">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-sm font-semibold my-2">{children}</h2>,
                }}
              >
                {message.content}
              </ReactMarkdown>
            )}
          </div>
        )}
        {message.tool_calls?.length > 0 && (
          <div className="space-y-1">
            {message.tool_calls.map((tc, i) => <FunctionDisplay key={i} toolCall={tc} />)}
          </div>
        )}
      </div>
    </div>
  );
}