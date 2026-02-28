import type { NextFunction, Request, Response } from "express";
import { getAuth, clerkClient } from "@clerk/express";
import catchAsync from "../utils/catchAsync";
import User from "../models/user.model";

/**
 * POST /api/users/sync
 * Called by the frontend right after a user signs in / signs up with Clerk.
 * Upserts the Clerk user into MongoDB so we have a local record.
 */
export const syncUser = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Fetch full user details from Clerk
    const clerkUser = await clerkClient.users.getUser(userId);

    const primaryEmail =
      clerkUser.emailAddresses.find(
        (e) => e.id === clerkUser.primaryEmailAddressId,
      )?.emailAddress ?? "";

    const user = await User.findOneAndUpdate(
      { clerkId: userId },
      {
        clerkId: userId,
        email: primaryEmail,
        firstName: clerkUser.firstName ?? "",
        lastName: clerkUser.lastName ?? "",
        imageUrl: clerkUser.imageUrl ?? "",
      },
      { upsert: true, new: true, runValidators: true },
    );

    return res.status(200).json({ success: true, data: user });
  },
);

/**
 * GET /api/users/me
 * Returns the authenticated user's profile from MongoDB.
 */
export const getMe = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please call /api/users/sync first.",
      });
    }

    return res.status(200).json({ success: true, data: user });
  },
);
