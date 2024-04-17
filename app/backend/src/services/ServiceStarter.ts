import MatchesModel from '../models/MatchesModel';
import { IMatches, IMatchesParams,
  IMatchesUpdateFinish, IMatchesUpdateParams } from '../Interfaces/newstarter/IMatches';
import { IMatchesModel } from '../Interfaces/newstarter/ModelsTarter';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class ServiceStarter {
  constructor(
    private matches: IMatchesModel<IMatches> = new MatchesModel(),
  ) { }

  public findAll(inProgress?: boolean): Promise<ServiceResponse<IMatches[]>> {
    return this.matches
      .findAll(inProgress).then((allMatches) => ({ status: 'success', data: allMatches }));
  }

  public updateFinish(id: string): Promise<ServiceResponse<IMatchesUpdateFinish>> {
    return this.matches
      .updateFinish(Number(id)).then(() => ({ status: 'success', data: { message: 'Finished' } }));
  }

  public Starter({ id, homeTeamGoals, awayTeamGoals }:
  IMatchesUpdateParams): Promise<ServiceResponse<IMatchesUpdateParams>> {
    return this.matches
      .updateMatch({ id,
        homeTeamGoals,
        awayTeamGoals })
      .then(() => ({ status: 'success', data: { id, homeTeamGoals, awayTeamGoals } }));
  }

  public createMatch(match: IMatchesParams): Promise<ServiceResponse<IMatches>> {
    return this.matches.createMatch(match)
      .then((newMatch) => ({ status: 'created', data: newMatch }));
  }
}
