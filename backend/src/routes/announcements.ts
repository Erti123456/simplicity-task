import { Router } from "express";
import * as controller from "../controllers/announcements.js";
export const announcementsRouter = Router();

announcementsRouter.get("/", controller.list);
announcementsRouter.get("/:id", controller.getById);
announcementsRouter.post("/", controller.create);
announcementsRouter.put("/:id", controller.update);
announcementsRouter.delete("/:id", controller.remove);
