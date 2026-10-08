import { useEffect, useState } from "react";

interface ListenButtonProps {
  text: string;
  lang?: "en-US" | "zh-CN";
  label?: string;
  rate?: number;
}

export default function ListenButton({
  text,
  lang = "en-US",
  label = "Listen",
  rate = 0.85,
}: ListenButtonProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const supported =
    typeof window !== "undefined" && "speechSynthesis" in window;

  useEffect(() => {
    return () => {
      if (supported) {
        window.speechSynthesis.cancel();
      }
    };
  }, [supported]);

  function speak() {
    if (!supported || !text.trim()) {
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = lang;
    utterance.rate = rate;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }

  function stop() {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }

  if (!supported) {
    return (
      <p className="audio-not-supported">
        Audio is not available in this browser. / 此浏览器不支持语音播放。
      </p>
    );
  }

  return (
    <button
      type="button"
      className={isSpeaking ? "listen-button listening" : "listen-button"}
      onClick={isSpeaking ? stop : speak}
    >
      {isSpeaking ? "■ Stop / 停止" : `🔊 ${label}`}
    </button>
  );
}

