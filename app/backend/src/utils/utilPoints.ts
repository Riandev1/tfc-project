import { news } from '../Interfaces/newmodel/news';
import { IMatches } from '../Interfaces/newstarter/IMatches';
import { ITeams } from '../Interfaces/newteams/ITeams';

const allPointsNell = (id: number, matches: IMatches[], homeOrAway: 'home' | 'away') => {
  if (homeOrAway === 'home') {
    const MatchesTyp = matches.filter((match) => match.homeTeamId === id);
    return MatchesTyp.reduce((acc, match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) return acc + 3;
      if (match.homeTeamGoals === match.awayTeamGoals) return acc + 1;
      return acc;
    }, 0);
  }
  const MatchesMock = matches.filter((match) => match.awayTeamId === id);
  return MatchesMock.reduce((acc, match) => {
    if (match.awayTeamGoals > match.homeTeamGoals) return acc + 3;
    if (match.awayTeamGoals === match.homeTeamGoals) return acc + 1;
    return acc;
  }, 0);
};

const totalGames = (id: number, matches: IMatches[], homeOrAway: 'home' | 'away') => {
  if (homeOrAway === 'home') {
    const totalMatches = matches.filter((match) => match.homeTeamId === id).length;
    const totalPointsDone = matches.filter((match) => match.homeTeamId === id
      && match.homeTeamGoals > match.awayTeamGoals).length;
    const totalDraws = matches.filter((match) => match.homeTeamId === id
      && match.homeTeamGoals === match.awayTeamGoals).length;
    const totalLosses = matches.filter((match) => match.homeTeamId === id
      && match.homeTeamGoals < match.awayTeamGoals).length;
    return { totalMatches, totalPointsDone, totalDraws, totalLosses };
  }

  const totalMatches = matches.filter((match) => match.awayTeamId === id).length;
  const totalPointsDone = matches.filter((match) => match.awayTeamId === id
    && match.awayTeamGoals > match.homeTeamGoals).length;
  const totalDraws = matches.filter((match) => match.awayTeamId === id
    && match.awayTeamGoals === match.homeTeamGoals).length;
  const totalLosses = matches.filter((match) => match.awayTeamId === id
    && match.awayTeamGoals < match.homeTeamGoals).length;
  return { totalMatches, totalPointsDone, totalDraws, totalLosses };
};

const NumberGoal = (id: number, matches: IMatches[], homeOrAway: 'home' | 'away') => {
  if (homeOrAway === 'home') {
    const goalsFavor = matches.filter((match) => match.homeTeamId === id)
      .reduce((acc, match) => acc + match.homeTeamGoals, 0);
    const goalsOwn = matches.filter((match) => match.homeTeamId === id)
      .reduce((acc, match) => acc + match.awayTeamGoals, 0);
    return { goalsFavor, goalsOwn, goalsBalance: goalsFavor - goalsOwn };
  }
  const goalsFavor = matches.filter((match) => match.awayTeamId === id)
    .reduce((acc, match) => acc + match.awayTeamGoals, 0);
  const goalsOwn = matches.filter((match) => match.awayTeamId === id)
    .reduce((acc, match) => acc + match.homeTeamGoals, 0);
  return { goalsFavor, goalsOwn, goalsBalance: goalsFavor - goalsOwn };
};

const efficiency = (id: number, matches: IMatches[], homeOrAway: 'home' | 'away' | 'total') => {
  if (homeOrAway === 'total') {
    const totalHome = totalGames(id, matches, 'home');
    const totalAway = totalGames(id, matches, 'away');
    const totalMatches = totalHome.totalMatches + totalAway.totalMatches;
    const points = allPointsNell(id, matches, 'home') + allPointsNell(id, matches, 'away');
    return `${((points / (totalMatches * 3)) * 100).toFixed(2)}`;
  }
  const { totalMatches } = totalGames(id, matches, homeOrAway);
  const points = allPointsNell(id, matches, homeOrAway);
  return `${((points / (totalMatches * 3)) * 100).toFixed(2)}`;
};

export const boardTransformHome = (teams: ITeams, matches: IMatches[]): news => ({
  name: teams.teamName,
  totalPoints: allPointsNell(teams.id, matches, 'home'),
  totalGames: totalGames(teams.id, matches, 'home').totalMatches,
  totalVictories: totalGames(teams.id, matches, 'home').totalPointsDone,
  totalDraws: totalGames(teams.id, matches, 'home').totalDraws,
  totalLosses: totalGames(teams.id, matches, 'home').totalLosses,
  goalsFavor: NumberGoal(teams.id, matches, 'home').goalsFavor,
  goalsOwn: NumberGoal(teams.id, matches, 'home').goalsOwn,
  goalsBalance: NumberGoal(teams.id, matches, 'home').goalsBalance,
  efficiency: efficiency(teams.id, matches, 'home'),
});

export const boardTransformAway = (teams: ITeams, matches: IMatches[]): news => ({
  name: teams.teamName,
  totalPoints: allPointsNell(teams.id, matches, 'away'),
  totalGames: totalGames(teams.id, matches, 'away').totalMatches,
  totalVictories: totalGames(teams.id, matches, 'away').totalPointsDone,
  totalDraws: totalGames(teams.id, matches, 'away').totalDraws,
  totalLosses: totalGames(teams.id, matches, 'away').totalLosses,
  goalsFavor: NumberGoal(teams.id, matches, 'away').goalsFavor,
  goalsOwn: NumberGoal(teams.id, matches, 'away').goalsOwn,
  goalsBalance: NumberGoal(teams.id, matches, 'away').goalsBalance,
  efficiency: efficiency(teams.id, matches, 'away'),
});

export const boardTransform = (teams: ITeams, matches: IMatches[]): news => ({
  name: teams.teamName,
  totalPoints: allPointsNell(teams.id, matches, 'home')
    + allPointsNell(teams.id, matches, 'away'),
  totalGames: totalGames(teams.id, matches, 'home').totalMatches
    + totalGames(teams.id, matches, 'away').totalMatches,
  totalVictories: totalGames(teams.id, matches, 'home').totalPointsDone
    + totalGames(teams.id, matches, 'away').totalPointsDone,
  totalDraws: totalGames(teams.id, matches, 'home').totalDraws
    + totalGames(teams.id, matches, 'away').totalDraws,
  totalLosses: totalGames(teams.id, matches, 'home').totalLosses
    + totalGames(teams.id, matches, 'away').totalLosses,
  goalsFavor: NumberGoal(teams.id, matches, 'home').goalsFavor
    + NumberGoal(teams.id, matches, 'away').goalsFavor,
  goalsOwn: NumberGoal(teams.id, matches, 'home').goalsOwn
    + NumberGoal(teams.id, matches, 'away').goalsOwn,
  goalsBalance: NumberGoal(teams.id, matches, 'home').goalsBalance
    + NumberGoal(teams.id, matches, 'away').goalsBalance,
  efficiency: efficiency(teams.id, matches, 'total'),
});

export const sortBoard = (board: news[]): news[] => board.sort((a, b) => {
  if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
  if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
  if (a.goalsFavor !== b.goalsFavor) return b.goalsFavor - a.goalsFavor;
  return a.name.localeCompare(b.name);
});
