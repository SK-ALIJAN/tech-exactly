/**
 * ============================================================================
 * TYPES & INTERFACES
 * ============================================================================
 */

export type ScoreStatus = 'PENDING' | 'DISPUTE' | 'CONFIRM' | 'UPDATED' | 'REJECTED';

export interface LeagueSchedulePlayerScore {
  id: number;
  league_player_list_id: number; // Changed from league_schedule_player_list_id
  score_to: string;
  score_by: string;
  score_at: string;
  status: boolean;
  score_status: ScoreStatus;
  score: number | null;
  updated_at: string | null;
  updated_by: string | null;
  league_id: number; // Added
  league_schedule_id: number | null; // Added
  // Joined data
  score_to_data?: {
    first_name: string;
    last_name: string;
    profile_img?: string;
    skill_level?: number;
  } | null;
  score_by_data?: {
    first_name: string;
    last_name: string;
    profile_img?: string;
    skill_level?: number;
  } | null;
  player_data?: {
    team_no: number | null;
    league_id: number; // Changed from league_schedule_id
  } | null;
  updated_by_data?: {
    first_name: string;
    last_name: string;
    profile_img?: string;
  } | null;
}

/**
 * ============================================================================
 * PARAMETER INTERFACES
 * ============================================================================
 */

export interface AddPlayerScoreParams {
  league_player_list_id: number; // Changed from league_schedule_player_list_id
  score_to: string;
  score: number;
  league_id: number;
  league_schedule_id?: number; // Added - optional
  score_status?: ScoreStatus;
  team_no: number; // team no
}

export interface GetPlayerScoresParams {
  playerId: number; // league_player_list_id
  filters?: {
    score_status?: ScoreStatus;
    status?: boolean;
    league_schedule_id?: number; // Added
  };
}

export interface GetScoreByIdParams {
  scoreId: number;
}

export interface GetScheduleScoresParams {
  scheduleId: number;
  filters?: {
    score_status?: ScoreStatus;
    team_no?: number;
  };
  options?: {
    limit?: number;
    offset?: number;
  };
}

export interface GetUserScoresParams {
  userId?: string;
  filters?: {
    score_status?: ScoreStatus;
    as_scorer?: boolean; // true = scores given by user, false = scores received by user
    league_id?: number; // Changed from string to number
    league_schedule_id?: number; // Added
  };
  options?: {
    limit?: number;
    offset?: number;
  };
}

export interface UpdateScoreParams {
  scoreId: number;
  score?: number;
  score_status?: ScoreStatus;
}

export interface DeleteScoreParams {
  scoreId: number;
  hardDelete?: boolean;
}

export interface GetScoreStatsParams {
  userId: string;
  leagueId?: number; // Changed from string to number
  scheduleId?: number; // Added
}

export interface BulkAddScoresParams {
  scores: Array<{
    league_player_list_id: number; // Changed from league_schedule_player_list_id
    score_to: string;
    score: number;
    score_status?: ScoreStatus;
  }>;
  league_id: number; // Changed from string to number
  league_schedule_id?: number; // Added - optional
  team_no: number; // team no
}

export interface DisputeScoreParams {
  scoreId: number;
  reason?: string;
}

export interface GetLeaderboardParams {
  leagueId: number; // Changed from string to number
  scheduleId?: number; // Changed to optional
  team_no?: number;
  limit?: number;
}

export interface GetAverageScoreParams {
  userId: string;
  leagueId?: number; // Changed from string to number
  scheduleId?: number;
}

export interface PlayerWithScore {
  // Player info
  player_id: number;
  user_id: string;
  team_no: number;
  joined_time: string;
  player_status: string;
  is_current_user: boolean;

  // User details
  user_data: {
    first_name: string;
    last_name: string;
    profile_img?: string;
    skill_level?: number;
  } | null;

  // Score info (null if no score yet)
  score_data: {
    id: number;
    score: number;
    score_status: string;
    score_at: string;
    score_by: string;
    score_by_data: any;
    updated_by?: string;
    updated_by_data?: any;
  } | null;
}

export interface TeamWithPlayers {
  team_no: number;
  team_name: string;
  is_joined_team: boolean; // ✅ Is this the current user's team?
  team_stats: {
    total_players: number;
    players_with_scores: number;
    players_without_scores: number;
    average_score: number;
    total_score: number;
  };
  players: PlayerWithScore[]; // ✅ All players in this team
}

export interface ScheduleInfo {
  schedule_id: number;
  schedule_date: string;
  schedule_start_time: string;
  schedule_end_time: string;
  schedule_status: string;
  league_id: number;
  league_name: string;
  league_start_date: string;
  league_end_date: string;
  registration_deadline: string;
  league_status: string;
  my_team_no?: number;
  is_joined: boolean;
}

export interface GetScheduleScoresResponse {
  teams: TeamWithPlayers[];
  error: string | null;
  count: number;
  schedule_info: ScheduleInfo;
}

export interface TeamWithScores {
  team_no: number;
  team_name: string;
  is_joined_team: boolean; // ✅ Added - Is this the current user's team?
  players: PlayerWithScore[];
  team_stats: {
    total_players: number;
    players_with_scores: number;
    players_without_scores: number;
    average_score: number;
    total_score: number;
  };
}



// Single score update item
export interface ScoreUpdateItem {
  scoreId: number;
  score: number;
}

// Bulk update params
export interface UpdateBulkScoreParams {
  score_status: ScoreStatus; // Required
  score: ScoreUpdateItem[]; // Array of score updates
}

// Response type for bulk updates
export interface BulkUpdateScoreResponse {
  data: LeagueSchedulePlayerScore[] | null;
  error: string | null;
  successCount: number;
  failedCount: number;
  errors?: Array<{ scoreId: number; error: string }>;
}