export interface Context {
  institution_id?: string;
  connection_id?: string;
  user_id?: string;
  provider?: string;
}

export interface KeyValuePair {
  key: string;
  value?: string | null;
}

export interface Credential {
  id: string;
  label?: string;
  value?: string;
}
export enum ConnectionStatus {
  CREATED,
  PREVENTED,
  DENIED,
  CHALLENGED,
  REJECTED,
  LOCKED,
  CONNECTED,
  IMPEDED,
  RECONNECTED,
  DEGRADED,
  DISCONNECTED,
  DISCONTINUE,
  CLOSED,
  DELAYED,
  FAILED,
  UPDATED,
  DISABLED,
  IMPORTED,
  RESUMED,
  EXPIRED,
  IMPAIRED,
  PENDING,
}
export enum ChallengeType {
  QUESTION,
  OPTIONS,
  IMAGE,
  IMAGE_OPTIONS,
  TOKEN,
}

export enum JobType {
  AGG = 'aggregation',
  AUTH = 'auth',
}

export interface Challenge {
  id: string;
  question?: string | null;
  data?: string | Array<KeyValuePair>;
  type: ChallengeType;
  response?: string | Array<number>;
}

export interface Institution {
  id: string | null;
  name: string;
  url: string;
  logo_url: string | null;
  code?: string | null;
  instructional_text?: string | null;
  small_logo_url?: string | null;
}

export interface Institutions {
  institutions: Array<Institution>;
  pagination?: Pagination;
}

export interface CreateConnectionRequest {
  id?: string;
  initial_job_type?: JobType;
  background_aggregation_is_disabled?: boolean;
  credentials: Array<Credential>;
  institution_id: string;
  is_oauth?: boolean;
  metadata?: string;
}

export interface Connection {
  id: string | null;
  cur_job_id?: string | null;
  last_refresh_utc?: string | null;
  last_refreshed_utc?: string | null;
  last_updated_utc?: string | null;
  background_aggregation_is_disabled?: boolean;
  status?: ConnectionStatus | null;
  institution_code?: string | null;
  is_being_aggregated?: boolean | null;
  is_oauth?: boolean | null;
  name?: string | null;
  user_id?: string | null;
  challenges?: Array<Challenge>;
  has_accounts?: boolean | null;
  has_transactions?: boolean | null;
  is_authenticated?: boolean | null;
}
export interface UpdateConnectionRequest {
  id: string | undefined;
  credentials?: Array<Credential>;
  challenges?: Array<Challenge>;
}
export interface Connections {
  members?: Array<Connection>;
  pagination?: Pagination;
}

export interface Pagination {
  current_page?: number;
  per_page?: number;
  total_entries?: number;
  total_pages?: number;
}

export interface ProviderApiClient {
  GetInstitutionById(id: string): Promise<Institution>;
  ListInstitutionCredentials(institutionId: string): Promise<Array<Credential>>;
  SearchInstitutions(name: string): Promise<Institutions>;
  ListFavorateInstitutions(): Promise<Institution[]>;

  CreateConnection(
    connection: CreateConnectionRequest,
    userId?: string
  ): Promise<Connection | undefined>;
  AnswerChallenge(
    request: UpdateConnectionRequest,
    userId?: string
  ): Promise<boolean>;
  UpdateConnection(
    UpdateConnectionRequest: UpdateConnectionRequest,
    userId?: string
  ): Promise<Connection>;
  GetConnectionById(
    connectionId: string,
    userId?: string
  ): Promise<Connection | undefined>;
  GetConnectionStatus(
    connectionIdOrJobId: string,
    userId?: string
  ): Promise<Connection | undefined>;
}
