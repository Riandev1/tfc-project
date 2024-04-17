import { Request, Router, Response } from 'express';
import Controllerone from '../controller/Controllerone';

const leaderControllerone = new Controllerone();

const routesScoreBoards = Router();

routesScoreBoards.get(
  '/',
  (req: Request, res: Response) => leaderControllerone.findAll(req, res),
);

routesScoreBoards.get(
  '/home',
  (req: Request, res: Response) => leaderControllerone.findAllHome(req, res),
);

routesScoreBoards.get(
  '/away',
  (req: Request, res: Response) => leaderControllerone.findAllAway(req, res),
);

export default routesScoreBoards;
