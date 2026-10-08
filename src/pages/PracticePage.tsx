import { useState } from "react";
import LanguageToggle, {
  type DisplayLanguage,
} from "../components/LanguageToggle";
import QuestionCard from "../components/QuestionCard";
import { civicsQuestions2026 } from "../data/civicsQuestions2026";

const CORRECT_KEY = "practiceCorrect";
const REVIEW_KEY = "practiceReview";
const INDEX_KEY = "practiceIndex";

function getStoredNonNegativeNumber(key: string) {
  const value = Number(localStorage.getItem(key) ?? 0);

  return Number.isFinite(value) && value >= 0 ? value : 0;
}

export default function PracticePage() {
  const [language, setLanguage] = useState<DisplayLanguage>("both");

  const [index, setIndex] = useState(() => {
    const savedIndex = getStoredNonNegativeNumber(INDEX_KEY);

    if (
      Number.isInteger(savedIndex) &&
      savedIndex < civicsQuestions2026.length
    ) {
      return savedIndex;
    }

    return 0;
  });

  const [correct, setCorrect] = useState(() =>
    getStoredNonNegativeNumber(CORRECT_KEY),
  );

  const [review, setReview] = useState(() =>
    getStoredNonNegativeNumber(REVIEW_KEY),
  );

  const [completed, setCompleted] = useState(false);

  if (civicsQuestions2026.length === 0) {
    return (
      <section className="page-section">
        <div className="question-card">
          <p className="eyebrow">Question bank needed / 需要题库</p>

          <h1>No citizenship questions have been added yet.</h1>

          <p className="chinese">
            目前还没有添加入籍考试题目。请将题目添加到{" "}
            <code>src/data/civicsQuestions2026.ts</code>。
          </p>
        </div>
      </section>
    );
  }

  function nextQuestion() {
    if (index === civicsQuestions2026.length - 1) {
      setCompleted(true);
      localStorage.removeItem(INDEX_KEY);
      return;
    }

    setIndex((currentIndex) => {
      const nextIndex = currentIndex + 1;

      localStorage.setItem(INDEX_KEY, String(nextIndex));

      return nextIndex;
    });
  }

  function markCorrect() {
    setCorrect((currentCorrect) => {
      const nextCorrect = currentCorrect + 1;

      localStorage.setItem(CORRECT_KEY, String(nextCorrect));

      return nextCorrect;
    });

    nextQuestion();
  }

  function markReview() {
    setReview((currentReview) => {
      const nextReview = currentReview + 1;

      localStorage.setItem(REVIEW_KEY, String(nextReview));

      return nextReview;
    });

    nextQuestion();
  }

  function startAgain() {
    setIndex(0);
    setCorrect(0);
    setReview(0);
    setCompleted(false);

    localStorage.setItem(INDEX_KEY, "0");
    localStorage.setItem(CORRECT_KEY, "0");
    localStorage.setItem(REVIEW_KEY, "0");
  }

  if (completed) {
    return (
      <section className="page-section">
        <div className="test-result passed">
          <p className="eyebrow">Practice round complete / 练习完成</p>

          <h1>Great job! / 做得很好！</h1>

          <p>
            You completed all {civicsQuestions2026.length} available questions.
          </p>

          <p className="chinese">
            您已完成全部 {civicsQuestions2026.length} 道现有题目。
          </p>

          <p>
            Correct: {correct} | Review: {review}
          </p>

          <p className="chinese">
            正确：{correct} | 需要复习：{review}
          </p>

          <button type="button" className="primary-button" onClick={startAgain}>
            Start again / 重新开始
          </button>
        </div>
      </section>
    );
  }

  const question = civicsQuestions2026[index];

  return (
    <section className="page-section">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Practice mode / 练习模式</p>
          <h1>Learn one question at a time</h1>
          <p className="chinese page-subtitle">一次学习一个问题</p>
        </div>

        <LanguageToggle language={language} onChange={setLanguage} />
      </div>

      <div className="score-strip">
        <span>Correct / 正确: {correct}</span>
        <span>Review / 复习: {review}</span>
        <span>
          Question / 问题 {index + 1} of {civicsQuestions2026.length}
        </span>
      </div>

      <p className="study-tip">
        Question bank progress: {civicsQuestions2026.length} of 128 questions
        added.
        <br />
        <span className="chinese">
          题库进度：已添加 {civicsQuestions2026.length} / 128 道题目。
        </span>
      </p>

      <QuestionCard
        key={question.id}
        question={question}
        language={language}
        onCorrect={markCorrect}
        onReview={markReview}
      />
    </section>
  );
}

