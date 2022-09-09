import type { Challenge, Context, Institution } from '../../shared/contract';
export declare function search(query: string, context: Context): Promise<import("../../shared/contract").Institutions>;
export declare function institutions(context: Context): Promise<{
    institutions: Institution[];
}>;
export declare function selectInstitution(institution: Institution, context: Context): Promise<{
    institution: Institution;
    credentials: import("../../shared/contract").Credential[];
    error?: undefined;
} | {
    error: string;
    institution?: undefined;
    credentials?: undefined;
}>;
export declare function login(institution_id: string, connection_id: string | null, credentials: Array<Credential>, context: Context): Promise<import("../../shared/contract").Connection | {
    error: string;
}>;
export declare function mfa(job_id: string, context: Context): Promise<import("../../shared/contract").Connection | {
    error: string;
}>;
export declare function answerChallenge(challenges: Array<Challenge>, context: Context): Promise<boolean>;
