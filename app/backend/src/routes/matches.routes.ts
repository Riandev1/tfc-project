import { Request, Router, Response } from 'express';
import AuthMiddleware from '../middlewares/authMiddleware';
import StarterController from '../controller/StarterController';
import Validations from '../middlewares/validationLogin';

const router = Router();

const starterCtrl = new StarterController();

router.get(
  '/',
  (req: Request, res: Response) => starterCtrl.findAll(req, res),
);

router.post(
  '/',
  AuthMiddleware.token,
  Validations.validateMatch,
  Validations.validateTeams,
  (req: Request, res: Response) => starterCtrl.createMatch(req, res),
);

router.patch(
  '/:id',
  AuthMiddleware.token,
  (req: Request, res: Response) => starterCtrl.updateMatch(req, res),
);

router.patch(
  '/:id/finish',
  AuthMiddleware.token,
  (req: Request, res: Response) => starterCtrl.updateFinish(req, res),
);

export default router;
