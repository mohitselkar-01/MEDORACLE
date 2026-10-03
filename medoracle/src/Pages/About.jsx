import "./About.css";

import {
  FaRobot,
  FaHeartbeat,
  FaUserMd,
  FaDatabase,
  FaShieldAlt,
  FaLaptopMedical
} from "react-icons/fa";

function About() {

  return (

    <div className="about-page">

      {/* HERO */}

      <section className="about-hero">

        <h1>About MEDORACLE</h1>

        <p>

          AI Powered Clinical Decision Support System
          developed to assist healthcare professionals
          with faster, smarter and evidence-based
          clinical decisions.

        </p>

      </section>

      {/* INTRO */}

      <section className="about-section">

        <div className="about-left">

          <h2>What is MEDORACLE?</h2>

          <p>

            MEDORACLE is an intelligent healthcare platform
            that combines Artificial Intelligence with
            modern web technologies to help doctors manage
            patients, appointments, reports and receive
            AI-powered clinical second opinions.

          </p>

          <p>

            It is designed as a Clinical Decision Support
            System (CDSS) where AI assists doctors without
            replacing their medical judgement.

          </p>

        </div>

      </section>

      {/* FEATURES */}

      <section className="feature-section">

        <h2>Main Features</h2>

        <div className="feature-grid">

          <div className="feature-card">

            <FaRobot />

            <h3>Clinical AI</h3>

            <p>

              Generate AI based second opinion from
              patient symptoms and diagnosis.

            </p>

          </div>

          <div className="feature-card">

            <FaHeartbeat />

            <h3>Patient Management</h3>

            <p>

              Store patient details securely with
              complete clinical information.

            </p>

          </div>

          <div className="feature-card">

            <FaUserMd />

            <h3>Appointments</h3>

            <p>

              Schedule and manage appointments
              efficiently.

            </p>

          </div>

          <div className="feature-card">

            <FaDatabase />

            <h3>Medical Reports</h3>

            <p>

              Generate and save AI clinical reports
              automatically.

            </p>

          </div>

          <div className="feature-card">

            <FaShieldAlt />

            <h3>Secure Login</h3>

            <p>

              JWT Authentication keeps doctor
              accounts protected.

            </p>

          </div>

          <div className="feature-card">

            <FaLaptopMedical />

            <h3>Doctor Dashboard</h3>

            <p>

              Beautiful dashboard for monitoring
              all healthcare activities.

            </p>

          </div>

        </div>

      </section>

      {/* WORKFLOW */}

      <section className="workflow">

        <h2>How MEDORACLE Works</h2>

        <div className="workflow-box">

          <div>1. Doctor Login</div>

          <span>→</span>

          <div>2. Add Patient</div>

          <span>→</span>

          <div>3. Clinical AI</div>

          <span>→</span>

          <div>4. AI Analysis</div>

          <span>→</span>

          <div>5. Report Saved</div>

        </div>

      </section>

      {/* TECH */}

      <section className="tech-section">

        <h2>Technology Stack</h2>

        <div className="tech-grid">

          <span>React.js</span>

          <span>Node.js</span>

          <span>Express.js</span>

          <span>MySQL</span>

          <span>Sequelize ORM</span>

          <span>JWT Authentication</span>

          <span>Gemini AI</span>

          <span>REST API</span>

        </div>

      </section>

    </div>

  );

}

export default About;