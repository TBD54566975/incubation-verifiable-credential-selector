import type { Connection, CreateConnectionRequest, Credential, Institution, Institutions, ProviderApiClient, UpdateConnectionRequest } from '@/../../shared/contract';
export declare class SophtronApi implements ProviderApiClient {
    apiClient: {
        name: string;
        getUserInstitutionById(id: any): any;
        getUserInstitutionsByUser(id: any): any;
        getUserInstitutionAccounts(userInstitutionID: any): any;
        getInstitutionById(id: any): any;
        getInstitutionByRoutingNumber(number: any): any;
        getInstitutionsByName(name: any): Promise<any>;
        getJob(id: any): any;
        jobSecurityAnswer(jobId: any, answer: any): Promise<{
            error?: undefined;
        } | {
            error: string;
        }>;
        jobTokenInput(jobId: any, tokenChoice: any, tokenInput: any, verifyPhoneFlag: any): Promise<{
            error?: undefined;
        } | {
            error: string;
        }>;
        jobCaptchaInput(jobId: any, input: any): Promise<{
            error?: undefined;
        } | {
            error: string;
        }>;
        CreateUserInstitutionWithRefresh(username: any, password: any, institutionId: any): any;
        CreateUserInstitutionWithFullAccountNumbers(username: any, password: any, institutionId: any): any;
        CreateUserInstitutionWOJob(username: any, password: any, institutionId: any): any;
        UpdateUserInstitution(username: any, password: any, userInstitutionID: any): any;
        GetUserInstitutionProfileInfor(userInstitutionID: any): any;
        RefreshUserInstitution(userInstitutionID: any): any;
        ping(): any;
    };
    httpClient: typeof import("../http/real");
    ListFavorateInstitutions(): Promise<Institution[]>;
    GetInstitutionById(id: string): Promise<Institution>;
    SearchInstitutions(name: string): Promise<Institutions>;
    ListInstitutionCredentials(): Promise<Array<Credential>>;
    CreateConnection(request: CreateConnectionRequest): Promise<Connection | undefined>;
    UpdateConnection(request: UpdateConnectionRequest): Promise<Connection>;
    GetConnectionById(connectionId: string): Promise<Connection>;
    GetConnectionStatus(refrenceId: string): Promise<Connection>;
    AnswerChallenge(request: UpdateConnectionRequest): Promise<boolean>;
}
