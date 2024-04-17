import { Router } from 'express';
import teamsRouter from './teams.routes';
import routesUser from './routes.User';
import matchesRouter from './matches.routes';
import leaderBoardRouter from './leaderboard.routes';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', routesUser);
router.use('/matches', matchesRouter);
router.use('/leaderboard', leaderBoardRouter);

export default router;
