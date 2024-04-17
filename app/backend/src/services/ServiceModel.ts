import { sortBoard } from '../utils/utilPoints';
import { news } from '../Interfaces/newmodel/news';
import BoardModel from '../models/BoardModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { modelnews } from '../Interfaces/newmodel/modelnews';

export default class ServiceModel {
  constructor(
    private board: modelnews<news> = new BoardModel(),
  ) { }

  public findAllHome(): Promise<ServiceResponse<news[]>> {
    return this.board.findAllHome().then((allHomeTeams) => {
      const sortHomeTeams = sortBoard(allHomeTeams);
      return { status: 'success', data: sortHomeTeams };
    });
  }

  public findAllAway(): Promise<ServiceResponse<news[]>> {
    return this.board.findAllAway().then((allAwayTeams) => {
      const sortAwayTeams = sortBoard(allAwayTeams);
      return { status: 'success', data: sortAwayTeams };
    });
  }

  public findAll(): Promise<ServiceResponse<news[]>> {
    return this.board.findAll().then((allTeams) => {
      const sortTeams = sortBoard(allTeams);
      return { status: 'success', data: sortTeams };
    });
  }
}
