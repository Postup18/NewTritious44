import React from "react";
import { useLanguage } from "@/lib/i18n";

const FLAGS = [
  { code: "en", src: "https://media.base44.com/images/public/69f267852d1729cd58c3d853/221245ecd_USFlag.jpg", label: "English" },
  { code: "es", src: "https://media.base44.com/images/public/69f267852d1729cd58c3d853/792a3fc9e_SpanishFlag.jpg", label: "Español" },
];

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-1.5">
      {FLAGS.map((f) => {
        const active = lang === f.code;
        return (
          <button
            key={f.code}
            type="button"
            onClick={() => setLang(f.code)}
            aria-label={f.label}
            title={f.label}
            className={`w-8 h-8 rounded-full overflow-hidden flex items-center justify-center transition-all duration-200 border ${
              active
                ? "border-primary scale-105 opacity-100"
                : "border-transparent opacity-50 hover:opacity-90"
            }`}
          >
            <img src={f.src} alt={f.label} className="w-full h-full object-cover" />
          </button>
        );
      })}
    </div>
  );
}