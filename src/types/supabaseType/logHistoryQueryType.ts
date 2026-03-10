
/**
 * ============================================================================
 * TYPES & INTERFACES
 * ============================================================================
 */

export type LogRefType = 
  | 'LEAGUE' 
  | 'LEAGUE_SCHEDULE' 
  | 'LEAGUE_PLAYER' 
  | 'USER' 
  | 'NOTIFICATION' 
  | 'PAYMENT'
  | 'SCORE';

export interface LogHistory {
  id: number;
  from_user_id: string | null;
  to_user_id: string | null;
  ref_type: LogRefType | null;
  ref_id: number | null;
  desc: string | null;
  created_at: string;
  seen_at: string | null;
  seen_by: string;
  is_seen: boolean;
  status: boolean;
  // Joined data
  from_user_data?: {
    first_name: string;
    last_name: string;
    profile_img?: string;
  } | null;
  to_user_data?: {
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

export interface CreateLogParams {
  from_user_id?: string | null;
  to_user_id?: string | null;
  ref_type?: LogRefType | null;
  ref_id?: number | null;
  desc?: string | null;
}

export interface GetUserLogsParams {
  userId?: string; // If not provided, uses current user
  filters?: {
    ref_type?: LogRefType;
    is_seen?: boolean;
    status?: boolean;
  };
  options?: {
    limit?: number;
    offset?: number;
    orderBy?: 'created_at' | 'seen_at';
    ascending?: boolean;
  };
}

export interface GetLogByIdParams {
  logId: number;
}

export interface MarkLogAsSeenParams {
  logId: number;
}

export interface MarkAllLogsAsSeenParams {
  userId?: string;
  ref_type?: LogRefType;
}

export interface DeleteLogParams {
  logId: number;
  hardDelete?: boolean;
}

export interface GetUnreadCountParams {
  userId?: string;
  ref_type?: LogRefType;
}

export interface GetLogsByRefParams {
  ref_type: LogRefType;
  ref_id: number;
  options?: {
    limit?: number;
    offset?: number;
  };
}

export interface BulkCreateLogsParams {
  logs: CreateLogParams[];
}
