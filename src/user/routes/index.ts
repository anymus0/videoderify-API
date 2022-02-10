import { Router, Request, Response } from "express";
import { authenticateToken } from "./../middlewares/authenticateToken.js";
import { addUser } from "./../controllers/addUser.js";
import { getAllUsers } from "./../controllers/getAllUsers.js";
import { getUserById } from "./../controllers/getUserById.js";
import { getAuthenticatedUser } from './../controllers/getAuthenticatedUser.js';
import { login } from './../controllers/login.js';
import { logout } from './../controllers/logout.js';



const router = Router();

// POST /user/login
router.post("/login", (req: Request, res: Response) => {
  login(req, res)
});

// GET /user/logout
router.get("/logout", (req: Request, res: Response) => {
  logout(req, res)
});

// POST /user/addUser
router.post("/addUser", authenticateToken, (req: Request, res: Response) => {
  addUser(req, res);
});

// GET /user/getAllUsers
router.get("/getAllUsers", authenticateToken, (req: Request, res: Response) => {
  getAllUsers(req, res);
});

// POST /user/getUserById
router.post("/getUserById", authenticateToken, (req: Request, res: Response) => {
  getUserById(req, res);
});

// GET /user/getAuthenticatedUser
router.get("/getAuthenticatedUser", authenticateToken, (req: Request, res: Response) => {
  getAuthenticatedUser(req, res);
});

export default router;
