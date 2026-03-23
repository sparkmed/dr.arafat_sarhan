import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  appointments: defineTable({
    name: v.string(),
    phone: v.string(),
    service: v.string(),
    date: v.string(),
    status: v.string(), // e.g., "pending"
  }),
});