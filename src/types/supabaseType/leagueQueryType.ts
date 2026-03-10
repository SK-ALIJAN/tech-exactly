// for put the league query type define here
export type LeagueStatus = 'CREATED' | 'PUBLISHED' | 'STARTED' | 'COMPLETED' | 'DELETED';
export type RulesType = 'NMJL_TURNAMENT' | 'CUSTOM';
export type LeagueScheduleStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

export interface AddLeagueParams {
  league_name: string;
  skill_level: number;
  description?: string;
  game_variant: number;
  match_schedule_type: number;
  max_players_count: number;
  session_per_month: number;
  games_per_session?: number | null;
  games_session_settings?: number | null;
  start_time?: string | null;
  end_time?: string | null;
  rules_type: RulesType;
  rules_desc?: string | null;
  start_date: string;
  end_date: string | null;
  reg_deadline: string;
  lat?: string | number | null;
  long?: string | number | null;
  country?: string | null;
  state?: string | null;
  city?: string | null;
  address: string;
  pin?: number | null;
  address_desc: string;
  singleSchedule?: boolean;
  game_type?: number;
}

export interface UpdateLeagueParams {
  league_name?: string;
  skill_level?: number;
  description?: string;
  game_variant?: number;
  match_schedule_type?: number;
  max_players_count?: number;
  session_per_month?: number;
  games_per_session?: number | null;
  games_session_settings?: number | null;
  start_time?: string | null;
  end_time?: string | null;
  rules_type?: RulesType;
  rules_desc?: string | null;
  start_date?: string;
  end_date?: string | null;
  reg_deadline?: string;
  lat?: string | null;
  long?: string | null;
  country?: string | null;
  state?: string | null;
  city?: string | null;
  address?: string;
  pin?: number | null;
  address_desc?: string;
  status?: LeagueStatus;
  singleSchedule?: boolean;
  game_type?: number;
}

// league details type define here
export interface LeagueDetails {
  id: number;
  league_name: string;
  skill_level: number;
  description: string | null;
  game_variant: number;
  match_schedule_type: number;
  max_players_count: number;
  session_per_month: number;
  games_per_session: number;
  games_session_settings: number | null;
  start_time: string | null;
  end_time: string | null;
  rules_type: RulesType;
  rules_desc: string | null;
  start_date: string;
  end_date: string;
  reg_deadline: string;
  lat: string | null;
  long: string | null;
  country: string | null;
  state: string | null;
  city: string | null;
  address: string;
  pin: number | null;
  address_desc: string;
  created_at: string;
  created_by: string;
  updated_at: string | null;
  updated_by: string | null;
  status: LeagueStatus;
  isJoined: boolean;
  joined_players_count?: number;
  singleSchedule?: boolean;
  game_type?: number;
  // Joined Lookup data
  skill_level_data: {
    id: number;
    lookup_value: string;
    lookup_img?: string[];
  };
  game_variant_data: {
    id: number;
    lookup_value: string;
    lookup_img?: string[];
  };
  match_schedule_type_data: {
    id: number;
    lookup_value: string;
    lookup_img?: string[];
  };
  games_session_settings_data: {
    id: number;
    lookup_value: string;
    lookup_img?: string[];
  } | null;
  created_by_data: {
    first_name: string;
    last_name: string;
    profile_img?: string;
  } | null;
  my_stats?: {
    total_games: number;
    total_wins: number;
    total_points: number;
    average_points: number;
    max_points: number;
  };
}

export interface LeagueWithLookups extends LeagueDetails {
  skill_level_name?: string;
  game_variant_name?: string;
  match_schedule_type_name?: string;
  games_session_settings_name?: string;
}

export interface LeagueSchedule {
  id: number;
  leagueId: number;
  date: string;
  start_time: string | null;
  end_time: string | null;
  require_player_count: number;
  joined_player_count: number | null;
  created_at: string;
  created_by: string;
  updated_at: string | null;
  updated_by: string | null;
  status: LeagueScheduleStatus;
}

export interface LeagueFilters {
  status?: LeagueStatus;
  skill_level?: number;
  city?: string;
  state?: string;
  country?: string;
  created_by?: string;
  game_variant?: number;
  start_date_from?: string;
  start_date_to?: string;
  search?: string;
}


export interface AddNewLeagueOptions {
  params: AddLeagueParams;
  autoGenerateSchedules?: boolean; // Default: true
}

export interface UpdateLeagueOptions {
  leagueId: number;
  updates: UpdateLeagueParams;
}

export interface GetLeagueDetailsParams {
  leagueId: number;
}

export interface DeleteLeagueParams {
  leagueId: number;
  hardDelete?: boolean;
}

export interface GetAllLeaguesParams {
  filters?: LeagueFilters;
  options?: {
    limit?: number;
    offset?: number;
    orderBy?: keyof LeagueDetails;
    ascending?: boolean;
  };
}

export interface GetMyLeaguesParams {
  status?: LeagueStatus;
  limit?: number;
  offset?: number;
  filters?: LeagueFilters;
}

export interface GetActiveLeaguesParams {
  limit?: number;
  offset?: number;
}

export interface GetUpcomingLeaguesParams {
  limit?: number;
  offset?: number;
}

export interface SearchLeaguesByLocationParams {
  lat: number;
  long: number;
  radiusKm?: number;
}

export interface PublishLeagueParams {
  leagueId: number;
}

export interface UnpublishLeagueParams {
  leagueId: number;
}

export interface CanEditLeagueParams {
  leagueId: number;
}

export interface GetLeagueSchedulesParams {
  leagueId: number;
  filters?: {
    status?: LeagueScheduleStatus;
    date_from?: string;
    date_to?: string;
  };
}

export interface GetLeagueStatsParams {
  leagueId: number;
}


export interface StartScheduleParams {
  scheduleId: number;
  playersPerTeam?: number; // Default: 4
}
