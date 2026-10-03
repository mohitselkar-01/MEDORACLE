import "./ClinicalAI.css";
import { useState } from "react";
import axios from "axios";
import {useLocation} from "react-router-dom";



import {
  FaUserInjured,
  FaNotesMedical,
  FaCapsules,
  FaRobot,
  FaBrain,
  FaHeartbeat,
  FaUserMd,
  FaStethoscope,
  FaArrowRight
} from "react-icons/fa";

function ClinicalAI() {

  const location = useLocation();

  const patient = location.state || {};

  const [formData, setFormData] = useState({

  patientId: patient.id || "",

  patientName: patient.patientName || "",

  age: patient.age || "",

  gender: patient.gender || "",

  symptoms: "",

  history: "",

  medications: "",

  doctorDiagnosis: ""

});

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState("");

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

const generateOpinion = async () => {

  if (
    !formData.patientName ||
    !formData.age ||
    !formData.gender ||
    !formData.symptoms
  ) {

    alert("Please fill all required fields.");
    return;

  }

  try {

    setLoading(true);

    const token = localStorage.getItem("token");

    const res = await axios.post(

      "http://localhost:5000/api/clinical",

      formData,

      {

        headers: {

          Authorization: `Bearer ${token}`

        }

      }

    );

    setResult(res.data.data.aiResponse);

  }

  catch (err) {

    console.log(err);

    alert(

      err.response?.data?.message ||

      "Failed to generate AI response."

    );

  }

  finally {

    setLoading(false);

  }

};

  return (

    <div className="clinical-page">

      {/* HEADER */}

      <div className="clinical-header">

        <div>

          <h1>

            <FaBrain className="head-icon" />

            MEDORACLE Clinical AI

          </h1>

          <p>

            AI-powered Clinical Decision Support for Healthcare Professionals

          </p>

        </div>

        <div className="ai-status">

          <span className="live-dot"></span>

          AI Engine Online

        </div>

      </div>

      {/* MAIN GRID */}

      <div className="clinical-grid">

        {/* LEFT PANEL */}

        <div className="clinical-form-card">

          <div className="section-title">

            <FaUserInjured />

            <h2>Patient Information</h2>

          </div>

          <div className="input-grid">

            <div className="input-group">

              <label>

                Patient Name

              </label>

              <input

                type="text"

                name="patientName"

                placeholder="Enter patient's full name"

                value={formData.patientName}

                onChange={handleChange}

              />

            </div>

            <div className="input-group">

              <label>

                Age

              </label>

              <input

                type="number"

                name="age"

                placeholder="Age"

                value={formData.age}

                onChange={handleChange}

              />

            </div>

            <div className="input-group full-width">

              <label>

                Gender

              </label>

              <select

                name="gender"

                value={formData.gender}

                onChange={handleChange}

              >

                <option value="">

                  Select Gender

                </option>

                <option>

                  Male

                </option>

                <option>

                  Female

                </option>

                <option>

                  Other

                </option>

              </select>

            </div>

          </div>

          <div className="section-title">

            <FaHeartbeat />

            <h2>Clinical Information</h2>

          </div>

          <div className="input-group">

            <label>

              Presenting Symptoms

            </label>

            <textarea

              rows="5"

              name="symptoms"

              placeholder="Describe chief complaints, symptoms and observations..."

              value={formData.symptoms}

              onChange={handleChange}

            />

          </div>

          <div className="input-group">

            <label>

              Medical History

            </label>

            <textarea

              rows="4"

              name="history"

              placeholder="Past illnesses, surgeries, allergies..."

              value={formData.history}

              onChange={handleChange}

            />

          </div>

          <div className="section-title">

            <FaCapsules />

            <h2>Treatment Details</h2>

          </div>

          <div className="input-group">

            <label>

              Current Medications

            </label>

            <textarea

              rows="4"

              name="medications"

              placeholder="Current medications..."

              value={formData.medications}

              onChange={handleChange}

            />

          </div>

          <div className="input-group">

            <label>

              Initial Clinical Diagnosis

            </label>

            <textarea

              rows="4"

              name="doctorDiagnosis"

              placeholder="Doctor's preliminary diagnosis..."

              value={formData.doctorDiagnosis}

              onChange={handleChange}

            />

          </div>

          <button

            className="generate-btn"

            onClick={generateOpinion}

            disabled={loading}

          >

            {loading ? (

              "Analyzing Clinical Data..."

            ) : (

              <>

                <FaRobot />

                Generate AI Second Opinion

                <FaArrowRight />

              </>

            )}

          </button>

        </div>

                {/* RIGHT PANEL */}

        <div className="ai-panel">

          <div className="ai-card">

            <div className="ai-top">

              <div className="ai-heading">

                <FaBrain className="brain-icon" />

                <div>

                  <h2>AI Clinical Assistant</h2>

                  <p>
                    Evidence-based clinical second opinion generated by MEDORACLE AI.
                  </p>

                </div>

              </div>

              <div className="status-badge">

                Ready

              </div>

            </div>

            {!result && !loading && (

              <div className="empty-state">

                <FaRobot className="robot-icon" />

                <h3>Awaiting Clinical Data</h3>

                <p>

                  Complete the patient information on the left and click
                  <strong> Generate AI Second Opinion </strong>
                  to receive an AI-assisted clinical assessment.

                </p>

                <div className="feature-list">

                  <div className="feature">

                    <FaStethoscope />

                    Differential Diagnosis

                  </div>

                  <div className="feature">

                    <FaHeartbeat />

                    Risk Assessment

                  </div>

                  <div className="feature">

                    <FaNotesMedical />

                    Treatment Suggestions

                  </div>

                  <div className="feature">

                    <FaUserMd />

                    Clinical Summary

                  </div>

                </div>

              </div>

            )}

            {loading && (

              <div className="loading-box">

                <div className="loader"></div>

                <h3>

                  MEDORACLE AI is analyzing...

                </h3>

                <p>

                  Processing symptoms, medical history,
                  medications and diagnosis.

                </p>

              </div>

            )}

            {!loading && result && (

              <>

                <div className="response-card">

                  <div className="response-header">

                    <FaBrain />

                    <h3>

                      AI Clinical Second Opinion

                    </h3>

                  </div>

                  <div className="response-body">

                    <pre>

                      {result}

                    </pre>

                  </div>

                </div>

                <div className="medical-warning">

                  <h4>

                    ⚠ Professional Medical Notice

                  </h4>

                  <p>

                    This report is generated by MEDORACLE AI
                    as a clinical decision support system.

                  </p>

                  <p>

                    It should never replace the professional
                    judgement of a licensed physician.

                  </p>

                  <p>

                    Final diagnosis, investigations,
                    treatment plan and prescriptions
                    must always be confirmed by the treating doctor.

                  </p>

                </div>

              </>

            )}

          </div>

        </div>

      </div>

      <footer className="clinical-footer">

        <p>

          © 2026 MEDORACLE AI |
          Intelligent Clinical Decision Support Platform

        </p>

      </footer>

    </div>

  );

}

export default ClinicalAI;


