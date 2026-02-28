import { requireAuth as clerkRequireAuth } from "@clerk/express";

/**
 * Protects a route — returns 401 if the request has no valid Clerk session token.
 *
 * Usage:
 *   router.post("/idea", requireAuth, postIdeaController);
 */
const requireAuth = clerkRequireAuth();

export default requireAuth;
