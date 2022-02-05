import { Router, Request, Response } from "express";
import { authenticateToken } from "./../middlewares/authenticateToken.js";
import { addUser } from "./../controllers/addUser.js";
import { getAllUsers } from "./../controllers/getAllUsers.js";
import { getUserById } from "./../controllers/getUserById.js";
import { login } from './../controllers/login.js';


const router = Router();

// POST /user/login
router.post("/login", (req: Request, res: Response) => {
  login(req, res)
});

// POST /user/addUser
router.post("/addUser", authenticateToken, (req: Request, res: Response) => {
  addUser(req, res);
});

// GET /user/getAllUsers
router.get("/getAllUsers", authenticateToken, (req: Request, res: Response) => {
  getAllUsers(req, res);
});

// GET /user/getUserById
router.get("/getUserById", authenticateToken, (req: Request, res: Response) => {
  getUserById(req, res);
});

export default router;
