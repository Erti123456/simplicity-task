import { prisma } from "../lib/db.js";
import { Prisma } from "../generated/prisma/client.js";
import { Category } from "../generated/prisma/enums.js";
import { NotFoundError } from "../lib/errors.js";
import { getIO } from "../lib/realtime.js";

type CreateAnnouncementData = {
  title: string;
  body: string;
  categories: Category[];
  publishedAt: Date;
};

const findAnnouncement = async (id: string) => {
  const announcement = await prisma.announcement.findUnique({ where: { id } });
  if (!announcement) {
    throw new NotFoundError("Announcement was not found.");
  }
  return announcement;
};

export const listAnnouncements = (category?: Category, search?: string) => {
  const where: Prisma.AnnouncementWhereInput = {};

  if (category) {
    where.categories = { has: category };
  }

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { body: { contains: search, mode: "insensitive" } },
    ];
  }

  return prisma.announcement.findMany({
    where,
    orderBy: { updatedAt: "desc" },
  });
};

export const getAnnouncement = async (id: string) => {
  return findAnnouncement(id);
};

export const createAnnouncement = async (data: CreateAnnouncementData) => {
  const newAnnouncement = await prisma.announcement.create({ data });
  getIO().emit("announcement:created", newAnnouncement);
  return newAnnouncement;
};

export const updateAnnouncement = async (
  id: string,
  data: CreateAnnouncementData,
) => {
  await findAnnouncement(id);
  return prisma.announcement.update({ where: { id }, data });
};

export const removeAnnouncement = async (id: string) => {
  await findAnnouncement(id);
  return prisma.announcement.delete({ where: { id } });
};
