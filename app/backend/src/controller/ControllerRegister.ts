import { Request, Response } from 'express';
import ServiceEntry from '../services/ServiceEntry';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class ControllerRegister {
  constructor(private teamService = new ServiceEntry()) {}

  public validation(req: Request, res: Response) {
    const { email, password } = req.body;
    this.teamService
      .validation(email, password)
      .then(({ status, data }) => {
        res.status(mapStatusHTTP(status)).json(data);
      })
      .catch((error) => {
        res.status(500).json({ message: 'Internal Server Error', error });
      });
  }

  public role(req: Request, res: Response) {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    this.teamService
      .role(authorization)
      .then(({ status, data }) => {
        res.status(mapStatusHTTP(status)).json(data);
      })
      .catch((error) => {
        res.status(500).json({ message: 'Internal Server Error', error });
      });
  }
}
