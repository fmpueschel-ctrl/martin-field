import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { chatWithMartinField, submitProject, getSubmissions } from "./chatbot";
import { z } from "zod";

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Martin Field Chatbot
  martinField: router({
    chat: publicProcedure
      .input(z.object({
        sessionId: z.string(),
        message: z.string(),
      }))
      .mutation(async ({ input }) => {
        const response = await chatWithMartinField(input.sessionId, input.message);
        return { message: response };
      }),
    
    submitProject: publicProcedure
      .input(z.object({
        name: z.string(),
        email: z.string().email().optional(),
        projectTitle: z.string(),
        description: z.string(),
      }))
      .mutation(async ({ input }) => {
        return await submitProject(input);
      }),
    
    getSubmissions: publicProcedure
      .query(async () => {
        return await getSubmissions();
      }),
  }),
});

export type AppRouter = typeof appRouter;
