import bcrypt from "bcryptjs";

export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  try {
    const match = await bcrypt.compare(password, hash);
    return match;
  } catch (error) {
    console.error("Error comparing passwords:", error);
    throw error; // You can handle the error according to your application's needs
  }
};
