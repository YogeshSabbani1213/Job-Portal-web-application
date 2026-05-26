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

    const prompt = `
You are an AI Resume Analyzer.

Compare the resume with the job description.

Return ONLY valid JSON.

Format:

{
  "score": number,
  "missingSkills": [],
  "strengths": [],
  "suggestions": []
}

Resume:
${resumeText}

Job Description:
${jobDescription}
`;

    const rawResponse = await generateAIResponse(prompt);

    const cleanedResponse = rawResponse
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const aiResponse = JSON.parse(cleanedResponse);

    res.status(200).json({
      success: true,
      analysis: aiResponse,
    });

  } catch (error) {

    console.log("AI ANALYSIS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to analyze resume",
    });

  }
};