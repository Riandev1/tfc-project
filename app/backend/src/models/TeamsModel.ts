import SequelizeTeams from '../database/models/modelTimes';
import { ITeams } from '../Interfaces/newteams/ITeams';
import { newTeamsInt } from '../Interfaces/newteams/newTeamsInt';

export default class ModelTeams implements newTeamsInt<ITeams> {
  private model = SequelizeTeams;

  findAll(): Promise<ITeams[]> {
    return this.model.findAll()
      .then((dbData: ITeams[]) => dbData);
  }

  findById(id: number): Promise<ITeams | null> {
    return this.model.findByPk(id)
      .then((dbData: ITeams | null) => dbData);
  }
}
