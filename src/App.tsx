import { NavLink, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PracticePage from "./pages/PracticePage";
import MockTestPage from "./pages/MockTestPage";
import EnglishSkillsPage from "./pages/EnglishSkillsPage";

export default function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <NavLink to="/" className="brand">
          Citizenship 2025
          <span>English + 简体中文</span>
        </NavLink>

        <nav>
          <NavLink to="/practice">Practice / 练习</NavLink>
          <NavLink to="/mock-test">Mock Test / 模拟考试</NavLink>
          <NavLink to="/english-skills">English Skills / 英语技能</NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/mock-test" element={<MockTestPage />} />
          <Route path="/english-skills" element={<EnglishSkillsPage />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <p>
          Independent study aid. Not legal advice. Not affiliated with,
          endorsed by, or approved by USCIS.
        </p>

        <p className="chinese">
          独立学习工具，不提供法律建议；不隶属于、未获 USCIS 认可或批准。
        </p>

        <p>
          <a
            href="https://www.uscis.gov/citizenship/find-study-materials-and-resources/study-for-the-test"
            target="_blank"
            rel="noreferrer"
          >
            Official USCIS study materials / USCIS 官方学习资料
          </a>
        </p>
      </footer>
    </div>
  );
}

