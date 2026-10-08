import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <section className="hero">
      <p className="eyebrow">Independent bilingual study aid / 独立双语学习工具</p>

      <h1>
        U.S. Citizenship 2026 Practice
        <span>2026 美国入籍考试练习</span>
      </h1>

      <p className="hero-text">
        Practice civics, English speaking, reading, and writing with English
        and Simplified Chinese study support.
      </p>

      <p className="hero-text chinese">
        使用英语和简体中文辅助练习公民知识、英语口语、阅读和写作。
      </p>

      <div className="hero-actions">
        <Link to="/practice" className="primary-button">
          Start practice / 开始练习
        </Link>

        <Link to="/mock-test" className="secondary-button">
          Take mock test / 模拟考试
        </Link>
      </div>

      <aside className="notice">
        <strong>Important:</strong> This independent study tool is not legal
        advice and is not affiliated with, endorsed by, or approved by USCIS.
        Verify current information at USCIS.gov.
        <br />
        <br />
        <strong className="chinese">重要提示：</strong>
        <span className="chinese">
          本独立学习工具不提供法律建议，也不隶属于、未获 USCIS
          认可或批准。请在 USCIS.gov 核实最新信息。
        </span>
      </aside>
    </section>
  );
}

