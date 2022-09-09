export const name: string;
export function getUserInstitutionById(id: any): any;
export function getUserInstitutionById(id: any): any;
export function getUserInstitutionsByUser(id: any): any;
export function getUserInstitutionsByUser(id: any): any;
export function getUserInstitutionAccounts(userInstitutionID: any): any;
export function getUserInstitutionAccounts(userInstitutionID: any): any;
export function getInstitutionById(id: any): any;
export function getInstitutionById(id: any): any;
export function getInstitutionByRoutingNumber(number: any): any;
export function getInstitutionByRoutingNumber(number: any): any;
export function getInstitutionsByName(name: any): Promise<any>;
export function getInstitutionsByName(name: any): Promise<any>;
export function getJob(id: any): any;
export function getJob(id: any): any;
export function jobSecurityAnswer(jobId: any, answer: any): Promise<{
    error?: undefined;
} | {
    error: string;
}>;
export function jobSecurityAnswer(jobId: any, answer: any): Promise<{
    error?: undefined;
} | {
    error: string;
}>;
export function jobTokenInput(jobId: any, tokenChoice: any, tokenInput: any, verifyPhoneFlag: any): Promise<{
    error?: undefined;
} | {
    error: string;
}>;
export function jobTokenInput(jobId: any, tokenChoice: any, tokenInput: any, verifyPhoneFlag: any): Promise<{
    error?: undefined;
} | {
    error: string;
}>;
export function jobCaptchaInput(jobId: any, input: any): Promise<{
    error?: undefined;
} | {
    error: string;
}>;
export function jobCaptchaInput(jobId: any, input: any): Promise<{
    error?: undefined;
} | {
    error: string;
}>;
export function CreateUserInstitutionWithRefresh(username: any, password: any, institutionId: any): any;
export function CreateUserInstitutionWithRefresh(username: any, password: any, institutionId: any): any;
export function CreateUserInstitutionWithFullAccountNumbers(username: any, password: any, institutionId: any): any;
export function CreateUserInstitutionWithFullAccountNumbers(username: any, password: any, institutionId: any): any;
export function CreateUserInstitutionWOJob(username: any, password: any, institutionId: any): any;
export function CreateUserInstitutionWOJob(username: any, password: any, institutionId: any): any;
export function UpdateUserInstitution(username: any, password: any, userInstitutionID: any): any;
export function UpdateUserInstitution(username: any, password: any, userInstitutionID: any): any;
export function GetUserInstitutionProfileInfor(userInstitutionID: any): any;
export function GetUserInstitutionProfileInfor(userInstitutionID: any): any;
export function RefreshUserInstitution(userInstitutionID: any): any;
export function RefreshUserInstitution(userInstitutionID: any): any;
export function ping(): any;
export function ping(): any;
