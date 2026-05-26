import fs from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import generateAIResponse from "../../ai/openrouter.js";

export const uploadResume = async (req, res) => {
  try {
    const filePath = req.file.path;

    const data = new Uint8Array(fs.readFileSync(filePath));

    const pdf = await pdfjsLib.getDocument({ data }).promise;

    let extractedText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);

      const textContent = await page.getTextContent();

      const pageText = textContent.items
        .map((item) => item.str)
        .join(" ");

      extractedText += pageText + "\n";
    }

    res.status(200).json({
      success: true,
      text: extractedText,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Error extracting PDF text",
    });
  }
};

export const analyzeResume = async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    if (!resumeText || !jobDescription) {
      return res.status(400).json({
        success: false,
        message: "Missing resume text or job description",
      });
    }

    const prompt = `
You are an AI Resume Analyzer.
Compare the resume with the job description.
Return ONLY a valid JSON object matching the format below. Do not include any introductory or concluding text, and do not use markdown blocks.

Format:
{
  "score": 85,
  "missingSkills": ["Skill 1", "Skill 2"],
  "strengths": ["Strength 1"],
  "suggestions": ["Suggestion 1"]
}

Resume:
${resumeText}

Job Description:
${jobDescription}
`;

    const rawResponse = await generateAIResponse(prompt);
    console.log("RAW AI RESPONSE:", rawResponse); // Useful for debugging what the AI said

    // Clean up markdown block wraps if the AI appended them anyway
    let cleanedResponse = rawResponse
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let aiResponse;
    try {
      aiResponse = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error("JSON Parsing Failed. Cleaned string was:", cleanedResponse);
      
      // Fallback object so your app doesn't crash 
      return res.status(422).json({
        success: false,
        message: "AI returned invalid JSON formatting. Please try again.",
      });
    }

    return res.status(200).json({
      success: true,
      analysis: aiResponse,
    });

  } catch (error) {
    console.log("AI ANALYSIS GLOBAL ERROR:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to analyze resume",
    });
  }
};