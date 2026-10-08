export type DisplayLanguage = "both" | "en" | "zh";

interface LanguageToggleProps {
  language: DisplayLanguage;
  onChange: (language: DisplayLanguage) => void;
}

export default function LanguageToggle({
  language,
  onChange,
}: LanguageToggleProps) {
  return (
    <div className="language-toggle" aria-label="Language display">
      <button
        type="button"
        className={language === "both" ? "active" : ""}
        onClick={() => onChange("both")}
      >
        Both / 双语
      </button>

      <button
        type="button"
        className={language === "en" ? "active" : ""}
        onClick={() => onChange("en")}
      >
        English
      </button>

      <button
        type="button"
        className={language === "zh" ? "active" : ""}
        onClick={() => onChange("zh")}
      >
        中文
      </button>
    </div>
  );
}

