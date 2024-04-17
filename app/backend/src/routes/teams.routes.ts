import { Request, Router, Response } from 'express';
import AllTeamsController from '../controller/AllteamsController';

const router = Router();
const allTeamsController = new AllTeamsController();

router.get('/', (req: Request, res: Response) =>
  allTeamsController.findAll(req, res));

router.get('/:id', (req: Request, res: Response) =>
  allTeamsController.findById(req, res));

export default router;
