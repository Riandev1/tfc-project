import { Request, Response, NextFunction } from 'express';
import SequelizeTeams from '../database/models/modelTimes';

class Validations {
  static validateBook(req: Request, res: Response, next: NextFunction): Response | void {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!regexEmail.test(email) || password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  }

  static validateMatch(req: Request, res: Response, next: NextFunction): Response | void {
    const { homeTeamId, awayTeamId } = req.body;
    if (Number(homeTeamId) === Number(awayTeamId)) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    next();
  }

  static validateTeams(req: Request, res: Response, next: NextFunction)
    : Promise<Response | void> {
    const { homeTeamId, awayTeamId } = req.body;
    return Promise.all([
      SequelizeTeams.findByPk(homeTeamId),
      SequelizeTeams.findByPk(awayTeamId),
    ]).then(([homeTeam, awayTeam]) => {
      if (!homeTeam || !awayTeam) {
        return res.status(404).json({ message: 'There is no team with such id!' });
      }
      next();
    });
  }
}

export default Validations;
