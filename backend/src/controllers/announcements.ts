import type { Request, Response } from "express";
import { listAnnouncements } from "../services/announcements.js";
import { Category } from "../generated/prisma/enums.js";

export async function list(req: Request, res: Response) {
  const category = req.query.category as Category | undefined;
  const search = req.query.search as string | undefined;
  const list = await listAnnouncements(category, search);
  res.json({ list: list });
}

export async function getById(req: Request, res: Response) {
  res.json({ todo: "detail", id: req.params.id });
}

export async function create(req: Request, res: Response) {
  res.status(201).json({ todo: "create", body: req.body });
}

export async function update(req: Request, res: Response) {
  res.json({ todo: "update", id: req.params.id, body: req.body });
}

export async function remove(req: Request, res: Response) {
  res.status(204).send();
}
