import { Response, Request } from 'express';
import ServiceTeam from '../services/ServiceTeam';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class AllAllteamsController {
  constructor(
    private teamService = new ServiceTeam(),
  ) { }

  // Essa foi a maneira mais fácil que consegui para buscar todas as equipes //
  public async findAll(_req: Request, res: Response) {
    const { status, data } = await this.teamService.findAll();
    res.status(mapStatusHTTP(status)).json(data);
  }

  // Aqui eu fiz a mesma coisa, mas agora para buscar pelo o ID//
  public async findById(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.teamService.findById(Number(id));
    res.status(mapStatusHTTP(status)).json(data);
  }
}
