import { query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return "Convex is working! Dr. Arafat Sarhan";
  },
});
