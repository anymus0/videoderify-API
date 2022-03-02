import { Router, Request, Response } from "express";
import { addComment } from "./../controllers/addComment.js";
import { authenticateToken } from "./../../global/middlewares/authenticateToken.js";

// create express router
const router = Router();

// Routes //

router.post("/addComment/:seriesId", authenticateToken, (req: Request, res: Response) => {
  addComment(req, res);
});

export default router;
