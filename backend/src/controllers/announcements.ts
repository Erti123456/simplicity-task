import type { Request, Response } from "express";
import {
  createAnnouncement,
  getAnnouncement,
  listAnnouncements,
  removeAnnouncement,
  updateAnnouncement,
} from "../services/announcements.js";
import { Category } from "../generated/prisma/enums.js";
import { ValidationError } from "../lib/errors.js";

const getId = (req: Request) => {
  const id = req.params.id;
  if (typeof id !== "string") {
    throw new ValidationError("Missing id");
  }
  return id;
};
const getBody = (req: Request) => {
  const { title, body, categories, publishedAt } = req.body;
  if (!title || !body || !categories || !publishedAt) {
    throw new ValidationError(
      "One of the requirements for request was not found.",
    );
  }
  return {
    title,
    body,
    categories,
    publishedAt: new Date(publishedAt),
  };
};

export const list = async (req: Request, res: Response) => {
  const category = req.query.category as Category | undefined;
  const search = req.query.search as string | undefined;
  const announcements = await listAnnouncements(category, search);
  res.json(announcements);
};

export const getById = async (req: Request, res: Response) => {
  const id = getId(req);
  const announcement = await getAnnouncement(id);
  res.json(announcement);
};

export const create = async (req: Request, res: Response) => {
  const body = getBody(req);
  const newAnnouncement = await createAnnouncement(body);
  res.status(201).json(newAnnouncement);
};

export const update = async (req: Request, res: Response) => {
  const id = getId(req);
  const body = getBody(req);
  const updatedAnnouncement = await updateAnnouncement(id, body);
  res.json(updatedAnnouncement);
};

export const remove = async (req: Request, res: Response) => {
  const id = getId(req);
  await removeAnnouncement(id);
  res.status(204).send();
};
