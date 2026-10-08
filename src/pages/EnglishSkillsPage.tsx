import { useState } from "react";
import ListenButton from "../components/ListenButton";

interface PracticeSentence {
  en: string;
  zh: string;
}

const speakingPractice: PracticeSentence[] = [
  {
    en: "Yes, I understand.",
    zh: "是的，我明白。",
  },
  {
    en: "Please repeat the question.",
    zh: "请重复这个问题。",
  },
  {
    en: "I have lived at my current address for five years.",
    zh: "我已经在现在的地址住了五年。",
  },
  {
    en: "I want to become a United States citizen.",
    zh: "我想成为美国公民。",
  },
];

const readingPractice: PracticeSentence[] = [
  {
    en: "Citizens can vote.",
    zh: "公民可以投票。",
  },
  {
    en: "The President lives in the White House.",
    zh: "总统住在白宫。",
  },
  {
    en: "Congress makes federal laws.",
    zh: "国会制定联邦法律。",
  },
];

const writingPractice: PracticeSentence[] = [
  {
    en: "Citizens vote in elections.",
    zh: "公民在选举中投票。",
  },
  {
    en: "The Constitution is the supreme law.",
    zh: "宪法是最高法律。",
  },
  {
    en: "Washington, D.C., is the capital.",
    zh: "华盛顿特区是首都。",
  },
];

interface AudioPracticeSectionProps {
  titleEn: string;
  titleZh: string;
  instructionsEn: string;
  instructionsZh: string;
  sentences: PracticeSentence[];
  speed: number;
  writing?: boolean;
}

function AudioPracticeSection({
  titleEn,
  titleZh,
  instructionsEn,
  instructionsZh,
  sentences,
  speed,
  writing = false,
}: AudioPracticeSectionProps) {
  return (
    <article className="question-card english-section">
      <h2>
        {titleEn} / {titleZh}
      </h2>

      <p>{instructionsEn}</p>

      <p className="chinese">{instructionsZh}</p>

      <div className="sentence-list">
        {sentences.map((sentence, index) => (
          <div className="audio-sentence" key={sentence.en}>
            <div className="sentence-content">
              <span className="sentence-number">{index + 1}</span>

              <div>
                <p>{sentence.en}</p>
                <p className="chinese">{sentence.zh}</p>

                {writing && (
                  <textarea
                    className="writing-box"
                    aria-label={`Write sentence ${index + 1}`}
                    placeholder="Write the English sentence here..."
                  />
                )}
              </div>
            </div>

            <div className="audio-button-group">
              <ListenButton
                text={sentence.en}
                lang="en-US"
                label="Listen English"
                rate={speed}
              />

              <ListenButton
                text={sentence.zh}
                lang="zh-CN"
                label="听中文"
                rate={speed}
              />
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

export default function EnglishSkillsPage() {
  const [speed, setSpeed] = useState(0.85);

  return (
    <section className="page-section">
      <div className="page-heading">
        <div>
          <p className="eyebrow">English skills / 英语技能</p>
          <h1>Listen, speak, read, and write</h1>
          <p className="chinese page-subtitle">听、说、读、写英语练习</p>
        </div>
      </div>

      <article className="question-card">
        <h2>Audio speed / 语音速度</h2>

        <p>
          Start at a slow speed. Increase the speed as your English listening
          improves.
        </p>

        <p className="chinese">
          请先使用较慢的速度。随着英语听力提高，再增加速度。
        </p>

        <div className="audio-speed-controls">
          <button
            type="button"
            className={speed === 0.7 ? "speed-button active" : "speed-button"}
            onClick={() => setSpeed(0.7)}
          >
            Slow / 慢速
          </button>

          <button
            type="button"
            className={speed === 0.85 ? "speed-button active" : "speed-button"}
            onClick={() => setSpeed(0.85)}
          >
            Normal / 正常
          </button>

          <button
            type="button"
            className={speed === 1 ? "speed-button active" : "speed-button"}
            onClick={() => setSpeed(1)}
          >
            Test speed / 考试速度
          </button>
        </div>
      </article>

      <AudioPracticeSection
        titleEn="Speaking practice"
        titleZh="口语练习"
        instructionsEn="Listen first, then repeat the English sentence aloud clearly and slowly."
        instructionsZh="请先听，然后清楚、缓慢地大声重复英文句子。"
        sentences={speakingPractice}
        speed={speed}
      />

      <AudioPracticeSection
        titleEn="Reading practice"
        titleZh="阅读练习"
        instructionsEn="Listen to the English sentence, then read it aloud yourself."
        instructionsZh="听英文句子，然后自己大声朗读。"
        sentences={readingPractice}
        speed={speed}
      />

      <AudioPracticeSection
        titleEn="Writing practice"
        titleZh="写作练习"
        instructionsEn="Listen to the English sentence. Write what you hear, then compare your answer with the sentence."
        instructionsZh="听英文句子。写下您听到的内容，然后与显示的句子比较。"
        sentences={writingPractice}
        speed={speed}
        writing
      />

      <aside className="notice english-notice">
        <strong>USCIS English test reminder:</strong> Practice basic English
        speaking, reading, and writing.
        <br />
        <strong className="chinese">USCIS 英语考试提示：</strong>
        <span className="chinese">请练习基本英语口语、阅读和写作。</span>
      </aside>
    </section>
  );
}

