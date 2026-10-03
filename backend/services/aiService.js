const { GoogleGenerativeAI } = require("@google/generative-ai");

console.log(
  "Gemini API Key Loaded:",
  process.env.GEMINI_API_KEY ? "YES" : "NO"
);

// Init Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Model
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

// 🔥 MAIN FUNCTION
async function generateSecondOpinion(data) {
  try {
   const prompt = `
You are MEDORACLE Clinical Decision Support AI.

You are acting as a senior consultant physician with 20+ years of clinical experience.

You are assisting licensed doctors only and providing a second medical opinion.

Follow strictly:
WHO Clinical Guidelines, CDC Guidelines, NICE Guidelines, and standard medical textbooks such as Harrison and Robbins.

IMPORTANT INSTRUCTIONS:
- Do NOT use bullet points or numbered lists
- Write in a continuous professional medical report format
- Use proper clinical terminology
- Maintain a formal hospital report tone
- Be precise, evidence-based, and structured in paragraphs
- Do not sound like a chatbot

PATIENT INFORMATION:
Name: ${data.patientName}
Age: ${data.age}
Gender: ${data.gender}

Clinical Symptoms:
${data.symptoms}

Medical History:
${data.history}

Current Medications:
${data.medications}

Doctor's Initial Diagnosis:
${data.doctorDiagnosis}

Now generate a professional clinical second opinion report including:

Start with a Clinical Summary paragraph describing the patient condition in medical language.

Then write a Differential Diagnosis section in paragraph form, discussing possible conditions and why they are considered.

Then include a section describing Recommended Investigations such as laboratory tests, imaging, or other diagnostic procedures, explained in clinical context.

Then describe Red Flag findings that may indicate emergency or high-risk conditions.

Then provide Clinical Reasoning explaining the medical logic behind the assessment.

Then provide Management Suggestions limited to general supportive care and clinical guidance (no specific prescriptions).

Then suggest appropriate Specialist Referral if required.

Then include a Severity Assessment (mild, moderate, severe, or critical) with explanation.

Then provide a Confidence Score percentage based on symptom clarity and data quality.

Finally include a Disclaimer stating that this is an AI-assisted clinical decision support system and final diagnosis must be made by a licensed physician.

The entire response must read like a real hospital clinical note written by an experienced doctor.
`;

    const result = await model.generateContent(prompt);

    const response = await result.response;
    return response.text();

  } catch (error) {
    console.error("========== GEMINI ERROR ==========");
    console.error(error.message);
    console.error("==================================");

    return "Error generating clinical opinion. Please check AI service.";
  }
}

module.exports = generateSecondOpinion;