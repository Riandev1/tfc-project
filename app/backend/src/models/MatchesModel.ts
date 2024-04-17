import SequelizeMatches from '../database/models/StarterModel';
import { IMatches, IMatchesUpdateParams } from '../Interfaces/newstarter/IMatches';
import { IMatchesModel } from '../Interfaces/newstarter/ModelsTarter';

export default class StarterModel implements IMatchesModel<IMatches> {
  private model = SequelizeMatches;

  findAll(inProgress?: boolean): Promise<IMatches[]> {
    return this.model.findAll({
      include: [
        { association: 'homeTeam', attributes: ['teamName'] },
        { association: 'awayTeam', attributes: ['teamName'] },
      ],
    }).then((dbData) => {
      if (inProgress !== undefined) {
        return dbData.filter((match) => match.inProgress === inProgress);
      }
      return dbData;
    });
  }

  updateFinish(id: number): Promise<void> {
    return this.model.update({ inProgress: false }, { where: { id } })
      .then(() => {});
  }

  updateMatch({ id, homeTeamGoals, awayTeamGoals }: IMatchesUpdateParams): Promise<void> {
    return this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } })
      .then(() => {});
  }

  createMatch(match: IMatches): Promise<IMatches> {
    const matchData = { ...match, inProgress: true };
    return this.model.create(matchData)
      .then((newMatch) => newMatch)
      .catch(() => {
        throw new Error('There is no team with such id!');
      });
  }
}
