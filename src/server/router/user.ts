import { createRouter } from "./context";
import { z } from "zod";

export const userRouter = createRouter().mutation("createUser", {
  input: z
    .object({
      name: z.string(),
      contactInfo: z.string(),
      userId: z.string(),
    })
    .nullish(),
  async resolve({ input, ctx }) {
    console.log(input);
    // TODO: persist profile data
    const profileInfo = await ctx.prisma.profile.create({
      data: {
        name: input?.name || "",
        contactInfo: input?.contactInfo || "",
        userId: input?.userId
      }
    });
    return { success: true, profile: profileInfo };
  },
});
