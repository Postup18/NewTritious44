import React from "react";
import { useLanguage } from "@/lib/i18n";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  const flags = [
    { code: "en", emoji: "🇺🇸", label: "English" },
    { code: "es", emoji: "🇪🇸", label: "Español" },
  ];

  return (
    <div className="flex items-center gap-1.5">
      {flags.map((f) => {
        const active = lang === f.code;
        return (
          <button
            key={f.code}
            type="button"
            onClick={() => setLang(f.code)}
            aria-label={f.label}
            title={f.label}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-base leading-none transition-all duration-200 border ${
              active
                ? "border-primary bg-accent scale-105 opacity-100"
                : "border-transparent opacity-50 hover:opacity-90"
            }`}
          >
            <span className="leading-none">{f.emoji}</span>
          </button>
        );
      })}
    </div>
  );
}