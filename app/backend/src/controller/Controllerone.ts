import { Response, Request } from 'express';
import ServiceModel from '../services/ServiceModel';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class Controllerone {
  constructor(
    private boardService = new ServiceModel(),
  ) { }

  public async findAllHome(_req: Request, res: Response) {
    const { status, data } = await this.boardService.findAllHome();
    res.status(mapStatusHTTP(status)).json(data);
  }

  public async findAllAway(_req: Request, res: Response) {
    const { status, data } = await this.boardService.findAllAway();
    res.status(mapStatusHTTP(status)).json(data);
  }

  public async findAll(_req: Request, res: Response) {
    const { status, data } = await this.boardService.findAll();
    res.status(mapStatusHTTP(status)).json(data);
  }
}
