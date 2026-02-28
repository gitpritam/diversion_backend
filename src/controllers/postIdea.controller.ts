import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { prompt, prompt2 } from "./prompt";
import ai from "../config/gemini.config";
import extractJson from "../utils/extractJson";

const postIdeaController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { idea } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt2(idea),
    });

    res.json({
      success: true,
      // data: response,
      parseData:
        extractJson(response?.text) ?? "Failed to parse JSON from AI response",
    });
  },
);

export default postIdeaController;
