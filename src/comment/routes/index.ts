import { Router, Request, Response } from "express";
import { addComment } from "./../controllers/addComment.js";
import { deleteComment } from "./../controllers/deleteComment.js";
import { authenticateToken } from "./../../global/middlewares/authenticateToken.js";
import { authenticateApiKey } from "./../../global/middlewares/authenticateApiKey.js";
import { isAdmin } from "./../../user/middlewares/isAdmin.js";
import { isSameUser } from "./../middlewares/isSameUser.js";

// create express router
const router = Router();

// Routes //

router.post(
  "/addComment/:seriesId",
  authenticateToken,
  (req: Request, res: Response) => {
    addComment(req, res);
  }
);

router.post(
  "/addCommentDev/:seriesId",
  authenticateApiKey,
  (req: Request, res: Response) => {
    addComment(req, res);
  }
);

router.delete(
  "/deleteComment/:commentId",
  authenticateToken,
  isSameUser,
  (req: Request, res: Response) => {
    deleteComment(req, res);
  }
);

router.delete(
  "/deleteCommentAdmin/:commentId",
  authenticateToken,
  isAdmin,
  (req: Request, res: Response) => {
    deleteComment(req, res);
  }
);

router.delete(
  "/deleteCommentDev/:commentId",
  authenticateApiKey,
  (req: Request, res: Response) => {
    deleteComment(req, res);
  }
);

export default router;
