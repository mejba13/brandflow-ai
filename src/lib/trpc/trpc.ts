import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

import type { Context } from "./context";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const middleware = t.middleware;

// Auth middleware - ensures user is authenticated
const enforceUserIsAuthed = middleware(async ({ ctx, next }) => {
  if (!ctx.userId) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to access this resource",
    });
  }

  return next({
    ctx: {
      ...ctx,
      userId: ctx.userId,
    },
  });
});

// Org middleware - ensures user has access to the organization
const enforceOrgAccess = middleware(async ({ ctx, next }) => {
  if (!ctx.userId) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to access this resource",
    });
  }

  if (!ctx.organizationId) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "You must select an organization to access this resource",
    });
  }

  return next({
    ctx: {
      ...ctx,
      userId: ctx.userId,
      organizationId: ctx.organizationId,
    },
  });
});

export const protectedProcedure = publicProcedure.use(enforceUserIsAuthed);
export const orgProcedure = publicProcedure.use(enforceOrgAccess);
