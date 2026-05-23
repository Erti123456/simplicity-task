import type { Request, Response } from "express";
import {
  createAnnouncement,
  getAnnouncement,
  listAnnouncements,
  removeAnnouncement,
  updateAnnouncement,
} from "../services/announcements.js";
import {
  announcementSchema,
  listAnnouncementsQuerySchema,
} from "../schemas/announcement.js";
import { ValidationError } from "../lib/errors.js";

const getId = (req: Request) => {
  const id = req.params.id;
  if (typeof id !== "string") {
    throw new ValidationError("Missing id");
  }
  return id;
};

export const list = async (req: Request, res: Response) => {
  const { category, search, page, limit } = listAnnouncementsQuerySchema.parse(req.query);
  const result = await listAnnouncements(category, search, page, limit);
  res.json(result);
};

export const getById = async (req: Request, res: Response) => {
  const id = getId(req);
  const announcement = await getAnnouncement(id);
  res.json(announcement);
};

export const create = async (req: Request, res: Response) => {
  const data = announcementSchema.parse(req.body);
  const newAnnouncement = await createAnnouncement(data);
  res.status(201).json(newAnnouncement);
};

export const update = async (req: Request, res: Response) => {
  const id = getId(req);
  const data = announcementSchema.parse(req.body);
  const updatedAnnouncement = await updateAnnouncement(id, data);
  res.json(updatedAnnouncement);
};

export const remove = async (req: Request, res: Response) => {
  const id = getId(req);
  await removeAnnouncement(id);
  res.status(204).send();
};
