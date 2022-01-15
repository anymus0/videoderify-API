import { Router, Request, Response } from "express";
import { addUser } from './../controllers/addUser.js'
import { getAllUsers } from './../controllers/getAllUsers.js'
import { getUserById } from './../controllers/getUserById.js'

const router = Router();

// POST /user/addUser
router.post("/addUser", (req: Request, res: Response) => {
  addUser(req, res);
});

// GET /user/getAllUsers
router.get("/getAllUsers", (req: Request, res: Response) => {
  getAllUsers(req, res);
});

// GET /user/getUserById
router.post("/getUserById", (req: Request, res: Response) => {
  getUserById(req, res);
});

export default router;
