import { news } from '../Interfaces/newmodel/news';
import SequelizeMatches from '../database/models/StarterModel';
import { modelnews } from '../Interfaces/newmodel/modelnews';
import SequelizeTeams from '../database/models/modelTimes';
import { boardTransform, boardTransformAway, boardTransformHome } from '../utils/utilPoints';

export default class BoardModel implements modelnews<news> {
  private matchesModel = SequelizeMatches;
  private teamsModel = SequelizeTeams;

  findAllHome(): Promise<news[]> {
    return this.teamsModel.findAll()
      .then((teams) => this.matchesModel.findAll({
        where: { inProgress: false },
        include: [
          { association: 'homeTeam', attributes: ['teamName'] },
          { association: 'awayTeam', attributes: ['teamName'] },
        ],
      }).then((matches) => {
        const board = teams.map((team) => boardTransformHome(team, matches));
        return board;
      }));
  }

  findAllAway(): Promise<news[]> {
    return this.teamsModel.findAll()
      .then((teams) => this.matchesModel.findAll({
        where: { inProgress: false },
        include: [
          { association: 'homeTeam', attributes: ['teamName'] },
          { association: 'awayTeam', attributes: ['teamName'] },
        ],
      }).then((matches) => {
        const board = teams.map((team) => boardTransformAway(team, matches));
        return board;
      }));
  }

  findAll(): Promise<news[]> {
    return this.teamsModel.findAll()
      .then((teams) => this.matchesModel.findAll({
        where: { inProgress: false },
        include: [
          { association: 'homeTeam', attributes: ['teamName'] },
          { association: 'awayTeam', attributes: ['teamName'] },
        ],
      }).then((matches) => {
        const board = teams.map((team) => boardTransform(team, matches));
        return board;
      }));
  }
}
