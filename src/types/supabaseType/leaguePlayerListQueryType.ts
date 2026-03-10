
/**
 * ============================================================================
 * TYPES & INTERFACES
 * ============================================================================
 */

export type LeaguePlayerStatus = 'ACTIVE' | 'INACTIVE' | 'REMOVED' | 'BLOCKED';

export interface LeaguePlayer {
  id: number;
  league_id: number;
  user_id: string;
  team_no: number | null;
  joined_time: string;
  updated_at: string | null;
  updated_by: string | null;
  status: LeaguePlayerStatus;
  // Joined data
  user_data?: {
    first_name: string;
    last_name: string;
    full_name: string;
    profile_img?: string;
    skill_level?: number;
    city?: string;
    state?: string;
    country?: string;
  } | null;
}

/**
 * ============================================================================
 * PARAMETER INTERFACES
 * ============================================================================
 */

export interface JoinLeagueParams {
  league_id: number;
}

export interface GetLeaguePlayersParams {
  league_id: number;
  filters?: {
    status?: LeaguePlayerStatus;
    team_no?: number;
  };
  options?: {
    limit?: number;
    offset?: number;
  };
}

export interface GetPlayerDetailsParams {
  playerId: number;
}

export interface UpdatePlayerParams {
  playerId: number;
  team_no?: number;
  status?: LeaguePlayerStatus;
}

export interface RemovePlayerParams {
  playerId: number;
  hardDelete?: boolean;
}

export interface GetPlayerLeaguesParams {
  userId?: string;
  filters?: {
    status?: LeaguePlayerStatus;
  };
}

export interface AssignTeamsParams {
  league_id: number;
  playersPerTeam?: number;
}

export interface PlayerWithScoreAndEmail {
  id: number;
  user_id: string;
  team_no: number;
  joined_time: string;
  status: string;
  user_data: {
    first_name: string;
    last_name: string;
    full_name: string;
    email: string;
    profile_img?: string | null;
    skill_level?: number | null;
    city?: string | null;
    state?: string | null;
    country?: string | null;
  } | null;
  score: number;
}

export interface TeamWithPlayersInfo {
  team_no: number;
  team_name: string | null;
  team_stats: {
    total_players: number;
    average_score: number;
    total_score: number;
  };
  players: PlayerWithScoreAndEmail[];
}

export interface GetLeaguePlayersResponse {
  teams: TeamWithPlayersInfo[];
  error: string | null;
  count: number;
  league_stats: {
    total_players: number;
    total_teams: number;
  };
}

export interface GetAllLeaguePlayersResponse {
  data: PlayerWithScoreAndEmail[];
  error: string | null;
  count: number;
}