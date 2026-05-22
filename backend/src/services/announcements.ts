import { prisma } from "../lib/db.js";
import { Category } from "../generated/prisma/enums.js";
import { Prisma } from "../generated/prisma/client.js";

export const listAnnouncements = async (
  category?: Category,
  search?: string,
) => {
  const where: Prisma.AnnouncementWhereInput = {};

  if (category) {
    where.categories = {
      has: category,
    };
  }
  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { body: { contains: search, mode: "insensitive" } },
    ];
  }

  const list = await prisma.announcement.findMany({
    where: where,
    orderBy: { updatedAt: "desc" },
  });
  return list;
};
