import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { prompt, prompt2 } from "./prompt";
import ai from "../config/gemini.config";
import extractJson from "../utils/extractJson";

const postIdeaController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { idea } = req.body;
    if (!idea || typeof idea !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid input. 'idea' must be a non-empty string.",
      });
    }
    const checkValidation = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt(idea),
      config: {
        temperature: 0,
      },
    });
    console.log("Validation response:", checkValidation.text);
    if (!checkValidation.text || checkValidation.text.trim() !== "VALID") {
      return res.status(400).json({
        success: false,
        message:
          "Invalid idea. Please provide a valid software idea or system architecture related.",
      });
    }
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt2(idea),
      config: {
        temperature: 0, // Fixes the randomness issue
        responseMimeType: "application/json", // Forces JSON output
      },
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
