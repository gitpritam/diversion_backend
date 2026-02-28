import { model } from "mongoose";
import userSchema, { IUser } from "../schema/user.schema";

const User = model<IUser>("User", userSchema);

export default User;
