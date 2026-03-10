import { LeagueCardData } from "../../view/components/molecules/LeagueCardItem/types";
import { LeagueCardProps } from "../../view/sections/BrowseLeagueCard/BrowseLeagueCard";

interface LeagueData
  extends Omit<
    LeagueCardProps,
    'onJoinPress' | 'onViewDetailsPress' | 'index'
  > {
  id: number;
}

const maskGroup = require('../../assets/images/Maskgroup.png');

export const browseLeagues: LeagueData[] = [
  {
    id: 1,
    title: 'Ft Myers Fall League',
    image: maskGroup,
    tags: ['Joker Immediate', 'NMJL Rules'],
    dateRange: '1st Oct - 27th Dec 2025',
    description:
      'In fact, inserting any fantasy text or a lorem text, be it a poem, an extract from a novel, or even a song.',
    isJoined: false,
  },
  {
    id: 2,
    title: 'Ft Myers Fall League',
    image: maskGroup,
    tags: ['Joker Immediate', 'NMJL Rules'],
    dateRange: '1st Oct - 27th Dec 2025',
    description:
      'In fact, inserting any fantasy text or a lorem text, be it a poem, an extract from a novel, or even a song.',
    isJoined: false,
  },
  {
    id: 3,
    title: 'Ft Myers Fall League',
    image: maskGroup,
    tags: ['Joker Immediate', 'NMJL Rules'],
    dateRange: '1st Oct - 27th Dec 2025',
    description:
      'In fact, inserting any fantasy text or a lorem text, be it a poem, an extract from a novel, or even a song.',
    isJoined: false,
  },
  {
    id: 4,
    title: 'Ft Myers Fall League',
    image: maskGroup,
    tags: [ 'American', 'NMJL Rules'],
    dateRange: '1st Oct - 27th Dec 2025',
    description:
      'In fact, inserting any fantasy text or a lorem text, be it a poem, an extract from a novel, or even a song.',
    isJoined: true,
  },
];


export const mockleagues: LeagueCardData[] = [
  {
    id: '1',
    title: 'Ft Myers Fall League',
    registrationStatus: 'Registration Open',
    registrationStatusColor: '#8FCDB5',
    gameTypes: [ 'American', 'NMJL Rules'],
    startDate: '1st Oct',
    endDate: '27th Dec, 2025',
    location: 'Ft Myers, FL',
    players: { current: 4, total: 20 },
    sessionInfo: '2 sessions/month (4 games/session)',
    userStats: {
      games: 12,
      wins: 8,
      points: 145,
    },
    userStatus: "✓ You're in this league",
    userStatusColor: '#8FCDB5',
    onCardPress: () => {
      navigation.navigate(Screens.LeagueDetail, { leagueId: 1 });
    },
  },
  {
    id: '2',
    title: 'Ft Myers Fall League',
    registrationStatus: 'Registration Open',
    registrationStatusColor: '#8FCDB5',
    gameTypes: [ 'American', 'NMJL Rules'],
    startDate: '1st Oct',
    endDate: '27th Dec, 2025',
    location: 'Ft Myers, FL',
    players: { current: 4, total: 20 },
    sessionInfo: '2 sessions/month (4 games/session)',
    userStats: {
      games: 12,
      wins: 8,
      points: 145,
    },
    showActionButtons: true,
    userStatus: "✓ You're in this league",
    userStatusColor: '#8FCDB5',
    onCardPress: () => {
      navigation.navigate(Screens.LeagueDetail, { leagueId: 1 });
    },
  }, {
    id: '3',
    title: 'Ft Myers Fall League',
    registrationStatus: 'Registration Open',
    registrationStatusColor: '#8FCDB5',
    gameTypes: ['American', 'NMJL Rules'],
    startDate: '1st Oct',
    endDate: '27th Dec, 2025',
    location: 'Ft Myers, FL',
    players: { current: 4, total: 20 },
    sessionInfo: '2 sessions/month (4 games/session)',
    userStats: {
      games: 12,
      wins: 8,
      points: 145,
    },
    userStatus: "✓ You're in this league",
    userStatusColor: '#8FCDB5',

    onCardPress: () => {
      navigation.navigate(Screens.LeagueDetail, { leagueId: 1 });
    },
  }, {
    id: '4',
    title: 'Ft Myers Fall League',
    registrationStatus: 'Registration Open',
    registrationStatusColor: '#8FCDB5',
    gameTypes: ['American', 'NMJL Rules'],
    startDate: '1st Oct',
    endDate: '27th Dec, 2025',
    location: 'Ft Myers, FL',
    players: { current: 4, total: 20 },
    sessionInfo: '2 sessions/month (4 games/session)',
    userStats: {
      games: 12,
      wins: 8,
      points: 145,
    },
    userStatus: "✓ You're in this league",
    showActionButtons: true,
    userStatusColor: '#8FCDB5',
    onCardPress: () => {
      navigation.navigate(Screens.LeagueDetail, { leagueId: 1 });
    },
  }, {
    id: '5',
    title: 'Ft Myers Fall League',
    registrationStatus: 'Registration Open',
    registrationStatusColor: '#8FCDB5',
    gameTypes: [ 'American', 'NMJL Rules'],
    startDate: '1st Oct',
    endDate: '27th Dec, 2025',
    location: 'Ft Myers, FL',
    players: { current: 4, total: 20 },
    sessionInfo: '2 sessions/month (4 games/session)',
    userStats: {
      games: 12,
      wins: 8,
      points: 145,
    },
    userStatus: "✓ You're in this league",
    userStatusColor: '#8FCDB5',
    onCardPress: () => {
      navigation.navigate(Screens.LeagueDetail, { leagueId: 1 });
    },
  }, {
    id: '6',
    title: 'Ft Myers Fall League',
    registrationStatus: 'Registration Open',
    registrationStatusColor: '#8FCDB5',
    gameTypes: [ 'American', 'NMJL Rules'],
    startDate: '1st Oct',
    endDate: '27th Dec, 2025',
    location: 'Ft Myers, FL',
    players: { current: 4, total: 20 },
    sessionInfo: '2 sessions/month (4 games/session)',
    userStats: {
      games: 12,
      wins: 8,
      points: 145,
    },
    userStatus: "✓ You're in this league",
    showActionButtons: true,
    userStatusColor: '#8FCDB5',
    onCardPress: () => {
      navigation.navigate(Screens.LeagueDetail, { leagueId: 1 });
    },
  }
];
