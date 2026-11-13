"use client";
import type { Lang } from "@/data/taxonomy";
import { t } from "@/lib/i18n";

const OPTIONS: { value: Lang; htmlLang: string; label: string }[] = [
  { value: "zh", htmlLang: "zh-CN", label: "中文" },
  { value: "en", htmlLang: "en", label: "English" },
  { value: "ru", htmlLang: "ru", label: "Русский" },
];

export function LanguagePicker({ lang, onChange }: { lang: Lang; onChange: (lang: Lang) => void }) {
  return (
    <div role="group" aria-label={t(lang, "st_language")} className="language-picker">
      {OPTIONS.map(({ value, htmlLang, label }) => (
        <button key={value} type="button" lang={htmlLang} aria-pressed={lang === value} onClick={() => onChange(value)}
          className="language-option press">
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
