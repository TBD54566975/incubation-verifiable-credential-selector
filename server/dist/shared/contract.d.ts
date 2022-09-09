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
export declare enum ConnectionStatus {
    CREATED = 0,
    PREVENTED = 1,
    DENIED = 2,
    CHALLENGED = 3,
    REJECTED = 4,
    LOCKED = 5,
    CONNECTED = 6,
    IMPEDED = 7,
    RECONNECTED = 8,
    DEGRADED = 9,
    DISCONNECTED = 10,
    DISCONTINUE = 11,
    CLOSED = 12,
    DELAYED = 13,
    FAILED = 14,
    UPDATED = 15,
    DISABLED = 16,
    IMPORTED = 17,
    RESUMED = 18,
    EXPIRED = 19,
    IMPAIRED = 20,
    PENDING = 21
}
export declare enum ChallengeType {
    QUESTION = 0,
    OPTIONS = 1,
    IMAGE = 2,
    IMAGE_OPTIONS = 3,
    TOKEN = 4
}
export declare enum JobType {
    AGG = "aggregation",
    AUTH = "auth"
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
    provider?: string | null;
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
export declare enum EventEnum {
    INIT = 0,
    INSTITUTION_LIST = 1,
    SELECT_INSTITUTION = 2,
    LOGIN = 3,
    CHALLENGED = 4,
    SUCCEEDED = 5,
    FAILED = 6,
    ERROR = 7
}
export interface ProviderApiClient {
    GetInstitutionById(id: string): Promise<Institution>;
    ListInstitutionCredentials(institutionId: string): Promise<Array<Credential>>;
    SearchInstitutions(name: string): Promise<Institutions>;
    ListFavorateInstitutions(): Promise<Institution[]>;
    CreateConnection(connection: CreateConnectionRequest, userId?: string): Promise<Connection | undefined>;
    AnswerChallenge(request: UpdateConnectionRequest, userId?: string): Promise<boolean>;
    UpdateConnection(UpdateConnectionRequest: UpdateConnectionRequest, userId?: string): Promise<Connection>;
    GetConnectionById(connectionId: string, userId?: string): Promise<Connection | undefined>;
    GetConnectionStatus(connectionIdOrJobId: string, userId?: string): Promise<Connection | undefined>;
}
