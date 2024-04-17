import TeamsModel from '../models/TeamsModel';
import { ITeams } from '../Interfaces/newteams/ITeams';
import { newTeamsInt } from '../Interfaces/newteams/newTeamsInt';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class ServiceTeam {
  constructor(
    private teams: newTeamsInt<ITeams> = new TeamsModel(),
  ) { }

  public findAll(): Promise<ServiceResponse<ITeams[]>> {
    return this.teams.findAll().then((allTeams) => ({ status: 'success', data: allTeams }));
  }

  public findById(id: number): Promise<ServiceResponse<ITeams | null>> {
    return this.teams.findById(id).then((team) => {
      if (!team) {
        return { status: 'notFound', data: { message: 'Time não encontrado' } };
      }
      return { status: 'success', data: team };
    });
  }
}
