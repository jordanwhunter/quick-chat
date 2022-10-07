import { createRouter } from "./context";
import { z } from "zod";

export const userRouter = createRouter()
  .mutation("createUser", {
    input: z.object({
      name: z.string(),
      contactInfo: z.string(),
      userId: z.string(),
    }),
    async resolve({ input, ctx }) {
      const profileInfo = await ctx.prisma.profile.create({
        data: {
          name: input?.name,
          contactInfo: input?.contactInfo,
          userId: input?.userId,
        },
      });
      return { success: true, profile: profileInfo };
    },
  })
  .query("readProfile", {
    input: z.object({
      userId: z.string(),
    }),
    async resolve({ input, ctx }) {
      const profile = await ctx.prisma.profile.findUnique({
        where: {
          userId: input?.userId,
        },
      });
      return { success: true, profile: profile };
    },
  })
  .query("matchProfile", {
    input: z.object({
      userId: z.string(),
    }),
    async resolve({ input, ctx }) {
      const match = await ctx.prisma.profile.findFirst({
        where: {
          status: "Waiting",
          NOT: {
            userId: input?.userId,
          },
        },
      });
      return { success: true, matchedProfile: match };
    },
  });
