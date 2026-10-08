import { useState } from "react";
import LanguageToggle, {
  type DisplayLanguage,
} from "../components/LanguageToggle";
import QuestionCard from "../components/QuestionCard";
import { civicsQuestions2026 } from "../data/civicsQuestions2026";

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

function getMockQuestions() {
  return shuffle(civicsQuestions2026).slice(
    0,
    Math.min(20, civicsQuestions2026.length),
  );
}

export default function MockTestPage() {
  const [language, setLanguage] = useState<DisplayLanguage>("en");
  const [questions, setQuestions] = useState(getMockQuestions);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);

  if (civicsQuestions2026.length === 0) {
    return (
      <section className="page-section">
        <div className="question-card">
          <h1>No questions are available.</h1>
          <p className="chinese">没有可用题目。</p>
          <p>Add question records before using Mock Test mode.</p>
          <p className="chinese">请先添加题目，再使用模拟考试模式。</p>
        </div>
      </section>
    );
  }

  const passed = correct >= 12;
  const failed = incorrect >= 9;
  const outOfQuestions = index >= questions.length;
  const finished = passed || failed || outOfQuestions;

  function answer(isCorrect: boolean) {
    if (isCorrect) {
      setCorrect((value) => value + 1);
    } else {
      setIncorrect((value) => value + 1);
    }

    setIndex((value) => value + 1);
  }

  function restart() {
    setQuestions(getMockQuestions());
    setIndex(0);
    setCorrect(0);
    setIncorrect(0);
  }

  if (finished) {
    const testPassed = passed;

    return (
      <section className="page-section">
        <div className={`test-result ${testPassed ? "passed" : "not-passed"}`}>
          <p className="eyebrow">Mock test result / 模拟考试结果</p>

          <h1>
            {testPassed
              ? "Practice pass! / 模拟通过！"
              : "Keep practicing / 继续练习"}
          </h1>

          <p>
            Correct: {correct} | Incorrect: {incorrect}
          </p>

          <p className="chinese">
            正确：{correct} | 错误：{incorrect}
          </p>

          <button type="button" className="primary-button" onClick={restart}>
            Restart test / 重新开始考试
          </button>
        </div>
      </section>
    );
  }

  const question = questions[index];

  return (
    <section className="page-section">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Mock oral test / 模拟口试</p>
          <h1>Answer aloud, then self-check</h1>
          <p className="chinese page-subtitle">请大声回答，然后自行检查答案。</p>
        </div>

        <LanguageToggle language={language} onChange={setLanguage} />
      </div>

      <div className="score-strip">
        <span>Correct / 正确: {correct}/12</span>
        <span>Incorrect / 错误: {incorrect}/9</span>
        <span>Asked / 已问: {index + 1}/20</span>
      </div>

      <QuestionCard
        key={`${question.id}-${index}`}
        question={question}
        language={language}
        onCorrect={() => answer(true)}
        onReview={() => answer(false)}
      />
    </section>
  );
}

