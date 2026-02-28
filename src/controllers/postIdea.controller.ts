import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { prompt, prompt2 } from "./prompt";
import ai from "../config/gemini.config";
import extractJson from "../utils/extractJson";

const postIdeaController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { idea } = req.body;

    const model = ai.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        temperature: 0, // 0 = No randomness (Deterministic)
        topP: 0.1, // Narrow the word choices further
        responseMimeType: "application/json", // Force the AI to speak JSON
      },
    });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt2(idea),
    });

    res.json({
      success: true,
      // data: response,
      data:
        extractJson(response?.text) ?? "Failed to parse JSON from AI response",
    });
  },
);

export default postIdeaController;
