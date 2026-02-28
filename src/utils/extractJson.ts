const extractJson = (text: string | undefined) => {
  try {
    // 1. Try to find JSON inside markdown code blocks
    const regex = /```(?:json)?\s*([\s\S]*?)\s*```/;
    const match = text?.match(regex);
    const cleanString = match ? match[1] : text;

    // 2. Parse the result
    return JSON.parse(cleanString!.trim());
  } catch (error) {
    console.error("Failed to parse AI JSON:", error);
    return null;
  }
};

export default extractJson;
