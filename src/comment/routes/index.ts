import { Router, Request, Response } from 'express';
import { addComment } from './../controllers/addComment.js'

// create express router
const router = Router();

// Routes //

router.get('/', (req: Request, res: Response) => {
  addComment(req, res)
})

export default router;
