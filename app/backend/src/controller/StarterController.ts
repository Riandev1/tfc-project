import { Request, Response } from 'express';
import ServiceStarter from '../services/ServiceStarter';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class StarterController {
  constructor(
    private matchesService = new ServiceStarter(),
  ) { }

  public findAll(req: Request, res: Response) {
    const inProgressParam = req.query.inProgress;
    let inProgress;
    if (typeof inProgressParam === 'string') {
      inProgress = inProgressParam === 'true';
    }
    this.matchesService.findAll(inProgress)
      .then(({ status, data }) => res.status(mapStatusHTTP(status)).json(data))
      .catch((error) => res.status(500).json({ message: error.message }));
  }

  public updateFinish(req: Request, res: Response) {
    const { id } = req.params;
    this.matchesService.updateFinish(id)
      .then(({ status, data }) => res.status(mapStatusHTTP(status)).json(data))
      .catch((error) => res.status(500).json({ message: error.message }));
  }

  public updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    this.matchesService.Starter({ id: Number(id), homeTeamGoals, awayTeamGoals })
      .then(({ status, data }) => res.status(mapStatusHTTP(status)).json(data))
      .catch((error) => res.status(500).json({ message: error.message }));
  }

  public createMatch(req: Request, res: Response) {
    this.matchesService.createMatch(req.body)
      .then(({ status, data }) => res.status(mapStatusHTTP(status)).json(data))
      .catch((error) => res.status(500).json({ message: error.message }));
  }
}
