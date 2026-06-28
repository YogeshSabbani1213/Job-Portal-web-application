import fs from "fs";//Read the uploaded PDF file.
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";//Read PDF content.
import generateAIResponse from "../../ai/openrouter.js";

//Extract text from uploaded PDF.
export const uploadResume = async (req, res) => {
  try {
    const filePath = req.file.path; //Get uploaded file location.

    const data = new Uint8Array(fs.readFileSync(filePath)); //Converts PDF into binary data.

    const pdf = await pdfjsLib.getDocument({ data }).promise;//Open the PDF.
    //getDocument() opens the PDF and returns a PDF object, allowing us to access its pages and content."

    let extractedText = "";//Store all extracted text.

    //Read every page.
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);//Get one page.getPage() retrieves a specific page from the loaded PDF."

      const textContent = await page.getTextContent(); //Extract text from page.
      //"getTextContent() extracts all the text elements from a page. We then combine those elements into readable text."

      const pageText = textContent.items    //Combine small text pieces.
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


//Compare Resume with Job Description.
export const analyzeResume = async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;  //Receive data from frontend.

    if (!resumeText || !jobDescription) {
      return res.status(400).json({
        success: false,
        message: "Missing resume text or job description",
      });
    }

    // Create instructions for AI.
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

    const rawResponse = await generateAIResponse(prompt);   //Send prompt to OpenRouter.
    console.log("RAW AI RESPONSE:", rawResponse); // Useful for debugging what the AI said

    // Clean up markdown block wraps if the AI appended them anyway
    let cleanedResponse = rawResponse
      .replace(/```json/g, "")//Sometimes AI returns markdown. Remove unnecessary formatting.
      .replace(/```/g, "")
      .trim();

    let aiResponse;
    try {
      aiResponse = JSON.parse(cleanedResponse);   //Convert JSON string into JavaScript object.
    } 
    catch (parseError) {
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