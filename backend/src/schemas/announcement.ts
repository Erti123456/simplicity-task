import { z } from "zod";
import { Category } from "../generated/prisma/enums.js";

export const announcementSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
  categories: z.array(z.enum(Category)).min(1),
  publishedAt: z.coerce.date(),
});

export const listAnnouncementsQuerySchema = z.object({
  category: z.enum(Category).optional(),
  search: z.string().optional(),
});
