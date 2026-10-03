import "./Home.css";
import TypingText from "../components/TypingText";
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  const handleStart = () => {

  const token = localStorage.getItem("token");

  if (token) {

    navigate("/dashboard");

  } else {

    navigate("/login");

  }

};
  return (
    <section className="hero">
      <div className="hero-bg"></div>

      <div className="hero-content">

        

        <h1>
          Transforming Clinical Decisions
          <br />
          With Explainable
          <br />

          <span className="typing-wrapper">
            <TypingText />
          </span>
        </h1>

        <p>
          Empowering clinicians with explainable AI,
          predictive analytics, and real-time clinical
          decision support.
        </p>

        <div className="hero-buttons">

          <button
            className="primary-btn"
            onClick={handleStart}
          >
            Start Analysis
          </button>

          <button className="secondary-btn">
            Watch Demo
          </button>

        </div>

        <div className="stats">

          <div className="stat-card">
            <h2>50K+</h2>
            <span>Clinical Cases</span>
          </div>

          <div className="stat-card">
            <h2>98%</h2>
            <span>Safety Monitoring</span>
          </div>

          <div className="stat-card">
            <h2>24/7</h2>
            <span>Decision Support</span>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Home;