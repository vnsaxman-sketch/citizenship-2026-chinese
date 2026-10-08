import { useState } from "react";
import type { CitizenshipQuestion } from "../types/citizenship";
import type { DisplayLanguage } from "./LanguageToggle";
import ListenButton from "./ListenButton";

interface QuestionCardProps {
  question: CitizenshipQuestion;
  language: DisplayLanguage;
  onCorrect?: () => void;
  onReview?: () => void;
}

export default function QuestionCard({
  question,
  language,
  onCorrect,
  onReview,
}: QuestionCardProps) {
  const [showAnswer, setShowAnswer] = useState(false);

  const showEnglish = language === "both" || language === "en";
  const showChinese = language === "both" || language === "zh";

  return (
    <article className="question-card">
      <span className="topic-label">{question.topic}</span>

      {question.isSixtyFiveTwenty && (
        <span className="special-label">65/20</span>
      )}

      {showEnglish && (
        <>
          <h2>{question.questionEn}</h2>

          <ListenButton
            text={question.questionEn}
            lang="en-US"
            label="Listen to question"
          />
        </>
      )}

      {showChinese && (
        <>
          <p className="chinese question-translation">
            {question.questionZh}
          </p>

          <ListenButton
            text={question.questionZh}
            lang="zh-CN"
            label="听中文"
          />
        </>
      )}

      {!showAnswer ? (
        <button
          type="button"
          className="primary-button show-answer-button"
          onClick={() => setShowAnswer(true)}
        >
          Show answer / 显示答案
        </button>
      ) : (
        <div className="answer-box">
          {showEnglish && (
            <>
              <h3>Accepted answer</h3>

              <p>{question.acceptedAnswersEn.join(" / ")}</p>

              <ListenButton
                text={question.acceptedAnswersEn.join(". ")}
                lang="en-US"
                label="Listen to answer"
              />

              <p className="explanation">{question.explanationEn}</p>

              <p className="study-tip">Tip: {question.studyTipEn}</p>
            </>
          )}

          {showChinese && (
            <>
              <h3>参考答案</h3>

              <p className="chinese">{question.answerZh}</p>

              <ListenButton
                text={question.answerZh}
                lang="zh-CN"
                label="听中文答案"
              />

              <p className="chinese explanation">
                {question.explanationZh}
              </p>

              <p className="chinese study-tip">
                提示：{question.studyTipZh}
              </p>
            </>
          )}

          {question.needsCurrentOfficial && (
            <p className="current-warning">
              Current-official answers may change. Verify this answer on
              USCIS.gov before your interview.
              <br />
              <span className="chinese">
                现任官员的答案可能会改变。面试前请到 USCIS.gov 核实。
              </span>
            </p>
          )}

          <div className="answer-actions">
            <button
              type="button"
              className="success-button"
              onClick={onCorrect}
            >
              I got it / 我答对了
            </button>

            <button
              type="button"
              className="review-button"
              onClick={onReview}
            >
              Review again / 再复习
            </button>
          </div>
        </div>
      )}
    </article>
  );
}

