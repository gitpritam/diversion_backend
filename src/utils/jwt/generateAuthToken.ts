import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { IjwtPayload } from "../../@types/interface/service/jwtPayload.interface";

/**
 * Generates a JSON Web Token (JWT) for the given payload with a specified expiration time.
 *
 * @param payload - The payload to encode in the JWT. Must conform to the `IjwtPayload` interface.
 * @param expiresIn - The expiration time for the token in days. Defaults to 30 days if not provided.
 * @returns The generated JWT as a string.
 * @throws Will throw an error if the `JWT_TOKEN_SECRET` environment variable is not defined.
 */
const generateAuthToken = (payload: IjwtPayload, expiresIn: number = 30) => {
  const secret = process.env.JWT_TOKEN_SECRET as Secret;
  if (!secret) {
    throw new Error("JWT_TOKEN_SECRET is not defined in environment variables");
  }
  const options: SignOptions = { expiresIn: expiresIn * 24 * 60 * 60 }; // 30 days in seconds
  const jwtToken = jwt.sign(payload, secret, options);
  return jwtToken;
};
export default generateAuthToken;
