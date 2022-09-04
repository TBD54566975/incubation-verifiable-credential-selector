import type {
  Challenge,
  Context,
  Institution,
  ProviderApiClient,
} from '../../shared/contract';
import { JobType } from '../../shared/contract';
import * as logger from '../infra/logger';
import { MxApi, SophtronApi } from './providers';

const mxClient = new MxApi();
const sophtronClient = new SophtronApi();

function getApiClient(context: Context): ProviderApiClient {
  switch (context?.provider) {
    case 'mx':
      return mxClient;
    case 'sophtron':
      return sophtronClient;
    default:
      return sophtronClient;
  }
}

// async function getAccounts(userInstitutionID: string, context: Context){
//     let client = getApiClient(context);

//     var ret = await client.getUserInstitutionAccounts(userInstitutionID, context.user_id);
//     if((ret||[]).length > 0){
//         ret = ret.map(item => ({
//             AccountID: item.AccountID,
//             AccountName: item.AccountName,
//             AccountNumber: item.AccountNumber,
//             AccountType: item.AccountType,
//             //FullAccountNumber: item.FullAccountNumber,
//             //RoutingNumber: item.RoutingNumber,
//             SubType: item.SubType
//         }));
//         return ret;
//     }
// }

export function search(query: string, request: Context) {
  const client = getApiClient(request);
  return client.SearchInstitutions(query);
}
export async function institutions(request: Context) {
  const client = getApiClient(request);
  let retBanks: Institution[] | null = null;
  if ((request.institution_id || '').length > 0) {
    const ret = await client.GetInstitutionById(request.institution_id!);
    if (ret && ret.id) {
      retBanks = [ret];
    } else {
      delete request.institution_id;
    }
  }
  if (!retBanks) {
    retBanks = await client.ListFavorateInstitutions();
  }
  return { meta: request || {}, institutions: retBanks };
}
export async function selectInstitution(
  instituion_id: string,
  context: Context
) {
  const client = getApiClient(context);
  if (instituion_id) {
    const credentials = await client.ListInstitutionCredentials(instituion_id);
    const institution = await client.GetInstitutionById(instituion_id);
    return { institution, credentials };
  }
  return { error: 'invalid institution selected' };
}
export async function login(
  institution_id: string,
  credentials: Array<Credential>,
  context: Context
) {
  const client = getApiClient(context);
  const entity_id = context.institution_id || institution_id;
  if (context.connection_id) {
    const res = await client.UpdateConnection(
      {
        id: context.connection_id,
        credentials,
      },
      context.user_id
    );
    return res;
  }
  if (entity_id) {
    const res = await client.CreateConnection(
      {
        institution_id: entity_id,
        credentials,
        initial_job_type: JobType.AGG,
      },
      context.user_id
    );
    if (res) {
      return res;
    }
    return {
      error: `failed creating connection with instituionId : ${entity_id}`,
    };
  }
  return { error: 'Unable to find instituion, invalid parameters provided' };
}
export async function mfa(job_id: string, context: Context) {
  const client = getApiClient(context);
  const res = await client.GetConnectionStatus(job_id, context.user_id);
  if (!res) {
    logger.warning(`Mfa failed to find connection with Id: ${job_id}`);
    return { error: 'Failed to find job' };
  }
  return res;
}
export async function answerChallenge(
  challenges: Array<Challenge>,
  context: Context
) {
  const client = getApiClient(context);
  return client.AnswerChallenge(
    {
      id: context.connection_id,
      challenges,
    },
    context.user_id
  );
}
