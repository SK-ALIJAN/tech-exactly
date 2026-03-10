// all league Schedule List Query Type define here
import { LeagueScheduleStatus, LeagueStatus } from "./leagueQueryType";

export interface AddLeagueScheduleParams {
  leagueId: number;
  date: string;
  start_time?: string | null;
  end_time?: string | null;
  require_player_count: number;
  joined_player_count?: number | null;
  status?: LeagueScheduleStatus;
}

export interface UpdateLeagueScheduleParams {
  date?: string;
  start_time?: string | null;
  end_time?: string | null;
  require_player_count?: number;
  joined_player_count?: number | null;
  status?: LeagueScheduleStatus;
}


export interface AutoGenerateLeagueSchedulesParams {
  leagueId: number;
}

export interface UpdateLeagueScheduleWithIdParams {
  scheduleId: number;
  updates: UpdateLeagueScheduleParams;
}

export interface DeleteLeagueScheduleParams {
  scheduleId: number;
  hardDelete?: boolean;
}

export interface DeleteAllLeagueSchedulesParams {
  leagueId: number;
  hardDelete?: boolean;
}

export interface GetScheduleDetailsParams {
  scheduleId: number;
}

export interface ConfirmScheduleParams {
  scheduleId: number;
}

export interface CompleteScheduleParams {
  scheduleId: number;
}

export interface TeamWithMembers {
  team_no: number;
  team_name: string;
  members_count: number;
  is_my_team: boolean; // ✅ Added
  members: Array<{
    id: number;
    user_id: string;
    team_no: number;
    joined_time: string;
    status: string;
    is_current_user: boolean; // ✅ Added
    user_data: {
      first_name: string;
      last_name: string;
      profile_img?: string;
      skill_level?: number;
      email?: string;
    } | null;
    score_stats: {
      total_scores: number;
      approved_scores: number;
      pending_scores: number;
      total_score: number;
      average_score: number;
    };
  }>;
  team_stats: {
    total_team_score: number;
    average_team_score: number;
    total_approved_scores: number;
  };
}

export interface ScheduleWithTeams {
  schedule_id: number;
  schedule_date: string;
  schedule_start_time: string;
  schedule_end_time: string;
  schedule_status: string;
  require_player_count: number;
  joined_player_count: number;

  league_id: number;
  league_name: string;
  league_start_date: string;
  league_end_date: string;
  registration_deadline: string;
  league_status: string;

  my_team_no?: number; // ✅ Added - Current user's team number
  is_joined: boolean; // ✅ Added - Always true for getMyScheduleTeamsList

  teams: TeamWithMembers[];

  overall_stats: {
    total_teams: number;
    total_players: number;
    total_scores: number;
    total_approved_scores: number;
    overall_average_score: number;
  };
}

export interface GetMyScheduleTeamsParams {
  leagueId?: number;
  filters?: {
    schedule_status?: string;
    league_status?: LeagueStatus;
    search?: string;
  };
  options?: {
    limit?: number;
    offset?: number;
    orderBy?: 'date' | 'league_name' | 'created_at';
    ascending?: boolean;
  };
}

export interface GetMyScheduleTeamsResponse {
  data: ScheduleWithTeams[] | null;
  error: string | null;
  count: number;
}