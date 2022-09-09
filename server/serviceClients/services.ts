import type {
  Challenge,
  Context,
  Institution,
  ProviderApiClient,
} from '../../shared/contract';
import { JobType } from '../../shared/contract';
import * as config from '../config';
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
/* 


amex

mxbank
*/

const demoBanks = [
  {
    id: 'Sophtron Bank',
    name: 'Sophtron Bank (Sophtron)',
    url: 'http://sophtron.com',
    logo_url: 'https://sophtron.com/Images/logo.png',
    provider: 'sophtron',
  },
  {
    id: 'mxbank',
    name: 'MX Bank (MX)',
    url: 'http://mx.com',
    logo_url: 'https://assets.mx.com/images/home2022/mx-logo.svg',
    provider: 'mx',
  },
  {
    id: '4b2eca34-a729-438f-844c-ba8ce51047f9',
    name: 'Citibank (Sophtron)',
    url: 'https://online.citi.com/US/login.do',
    logo_url: 'https://sophtron.com/images/banklogos/citibank.png ',
    provider: 'sophtron',
  },
  {
    id: 'citibank',
    name: 'Citibank (MX)',
    url: 'https://online.citi.com/US/login.do',
    logo_url: 'https://sophtron.com/images/banklogos/citibank.png ',
    provider: 'mx',
  },
  {
    id: 'b2a957e5-7bf2-47c0-bd63-ce96736cdacd',
    name: 'Chase Bank (Sophtron)',
    url: 'https://www.chase.com/',
    logo_url: 'https://sophtron.com/images/banklogos/chase.png',
    provider: 'sophtron',
  },
  {
    id: 'chase',
    name: 'Chase Bank (MX)',
    url: 'https://www.chase.com/',
    logo_url: 'https://sophtron.com/images/banklogos/chase.png',
    provider: 'mx',
  },
  {
    id: 'e3d4c866-1c48-44c3-9cc5-5e9c7db43ef0',
    name: 'Wells Fargo (Sophtron)',
    url: 'https://connect.secure.wellsfargo.com/auth/login/present?origin=tpb',
    logo_url: 'https://sophtron.com/images/banklogos/wells%20fargo.png',
    provider: 'sophtron',
  },
  {
    id: 'wells_fargo',
    name: 'Wells Fargo (MX)',
    url: 'https://connect.secure.wellsfargo.com/auth/login/present?origin=tpb',
    logo_url: 'https://sophtron.com/images/banklogos/wells%20fargo.png',
    provider: 'mx',
  },
  {
    id: '40a24f71-16e4-411c-b6e4-05b55577b66e',
    name: 'Ally Bank (Sophtron)',
    url: 'https://www.ally.com',
    logo_url: 'https://sophtron.com/images/banklogos/ally%20bank.png',
    provider: 'sophtron',
  },
  {
    id: '3e9fbc88-be07-4478-9a4c-9d3061d5d6d4',
    name: 'Bank of America (Sophtron)',
    url: 'https://connect.bnymellon.com/ConnectLogin/login/LoginPage.jsp',
    logo_url:
      'https://logos-list.s3-us-west-2.amazonaws.com/bank_of_america_logo.png',
    provider: 'sophtron',
  },
  {
    id: '227d9de3-7c18-4781-97a0-ce2ecefb1b7a',
    name: 'Barclays (Sophtron)',
    url: 'https://www.securebanking.barclaysus.com/',
    logo_url: 'https://sophtron.com/images/banklogos/barclays.png',
    provider: 'sophtron',
  },
  {
    id: '7da0e182-a2f3-41f1-84e2-4b6f5b8112e5',
    name: 'BB&T (Sophtron)',
    url: 'https://www.bbt.com/online-access/online-banking/default.page',
    logo_url: 'https://sophtron.com/images/banklogos/bbt.png',
    provider: 'sophtron',
  },
  {
    id: '0d8a29dd-4c28-4364-a493-b508f0a84758',
    name: 'Capital One (Sophtron)',
    url: 'https://www.capitalone.com/',
    logo_url: 'https://sophtron.com/images/banklogos/capital%20one.png',
    provider: 'sophtron',
  },
  {
    id: '3d7671e4-36be-4266-971e-b50d33001382',
    name: 'Charles Schwab (Sophtron)',
    url: 'https://client.schwab.com/Login/SignOn/CustomerCenterLogin.aspx',
    logo_url: 'https://sophtron.com/images/banklogos/charles%20schwab.png',
    provider: 'sophtron',
  },
  {
    id: 'd06b4cb4-d11f-47cf-92bd-6d0fe52760b1',
    name: 'USAA (Sophtron)',
    url: 'https://www.usaa.com/inet/ent_logon/Logon',
    logo_url: 'https://sophtron.com/images/banklogos/usaa.png',
    provider: 'sophtron',
  },
  {
    id: '71ec5788-adf0-43a4-b1dd-8d5958a0d13c',
    name: 'Fifth Third Bank  (Sophtron)',
    url: 'http://www.53.com/content/fifth-third/en/login.html',
    logo_url:
      'https://logos-list.s3-us-west-2.amazonaws.com/fifth_third_bank_logo.png',
    provider: 'sophtron',
  },
  {
    id: 'd03878fe-5b40-4b4d-95fc-c48d92105888',
    name: 'GoldMan Sachs (Sophtron)',
    url: 'https://www.goldman.com/',
    logo_url: 'https://sophtron.com/images/banklogos/goldman%20sachs.png',
    provider: 'sophtron',
  },
  {
    id: 'c155dab2-9133-4df3-a28e-b862af43bb38',
    name: 'HSBC Bank',
    url: 'https://www.services.online-banking.us.hsbc.com/',
    logo_url: 'https://sophtron.com/images/banklogos/hsbc%20bank.png',
    provider: 'sophtron',
  },
  {
    id: 'abd4059c-adf1-4f16-b493-37767f6cf233',
    name: 'Morgan Stanley (Sophtron)',
    url: 'https://www.morganstanleyclientserv.com/',
    logo_url: 'https://sophtron.com/images/banklogos/morgan%20stanley.png',
    provider: 'sophtron',
  },
  {
    id: '13793b9f-2ebf-4f31-815e-7dfe38e906c4',
    name: 'PNC Bank (Sophtron)',
    url: 'https://www.pnc.com/en/personal-banking/banking/online-and-mobile-banking.html',
    logo_url: 'https://logos-list.s3-us-west-2.amazonaws.com/pnc_bank_logo.png',
    provider: 'sophtron',
  },
  {
    id: '86e1f8a0-5963-4125-9999-ccbe44d5940e',
    name: 'State Street (Sophtron)',
    url: 'https://www.statestreetbank.com/online-banking',
    logo_url: 'https://sophtron.com/images/banklogos/state%20street.png',
    provider: 'sophtron',
  },
  {
    id: '8275fc09-149b-4849-8a31-51ef9ba8eb6d',
    name: 'SunTrust (Sophtron)',
    url: 'https://onlinebanking.suntrust.com/',
    logo_url: 'https://logos-list.s3-us-west-2.amazonaws.com/suntrust_logo.png',
    provider: 'sophtron',
  },
  {
    id: 'b8cb06e4-4f42-42b7-ba5a-623a5d1afe0f',
    name: 'TD Bank (Sophtron)',
    url: 'https://onlinebanking.tdbank.com',
    logo_url: 'https://logos-list.s3-us-west-2.amazonaws.com/td_bank_logo.png',
    provider: 'sophtron',
  },
  {
    id: '9aee59a1-59c9-4e5e-88f6-a00aa19f1612',
    name: 'US Bank (Sophtron)',
    url: 'https://www.usbank.com/index.html',
    logo_url: 'https://logos-list.s3-us-west-2.amazonaws.com/us_bank_logo.png',
    provider: 'sophtron',
  },
];

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
export function search(query: string, context: Context) {
  const client = getApiClient(context);
  return client.SearchInstitutions(query);
}
export async function institutions(context: Context) {
  const client = getApiClient(context);
  let retBanks: Institution[] | null = demoBanks;
  context.connection_id = null;
  if (!context.provider) {
    return { institutions: retBanks };
  }
  if ((context.institution_id || '').length > 0) {
    const ret = await client.GetInstitutionById(context.institution_id!);
    if (ret && ret.id) {
      retBanks = [ret];
    } else {
      delete context.institution_id;
    }
  }
  if (!retBanks) {
    retBanks = await client.ListFavorateInstitutions();
  }
  context.user_id = config.MxDemoUserId;
  return { institutions: retBanks };
}
export async function selectInstitution(
  institution: Institution,
  context: Context
) {
  logger.debug(`Selecting institution ${institution.id}`);
  if (institution.provider) {
    context.provider = institution.provider;
  }
  if (!context.provider) {
    context.provider = 'sophtron';
  }
  const client = getApiClient(context);
  if (institution.id) {
    const credentials = await client.ListInstitutionCredentials(institution.id);
    if (!institution.url) {
      institution = await client.GetInstitutionById(institution.id);
    }
    return { institution, credentials };
  }
  return { error: 'invalid institution selected' };
}
export async function login(
  institution_id: string,
  connection_id: string | null,
  credentials: Array<Credential>,
  context: Context
) {
  // console.log(context);
  // console.log(institution_id);
  // console.log(connection_id);
  const client = getApiClient(context);
  institution_id = context.institution_id || institution_id;
  connection_id = context.connection_id || connection_id;
  if (connection_id) {
    const res = await client.UpdateConnection(
      {
        id: connection_id,
        credentials,
      },
      context.user_id
    );
    return res;
  }
  if (institution_id) {
    const res = await client.CreateConnection(
      {
        institution_id,
        credentials,
        initial_job_type: JobType.AGG,
      },
      context.user_id
    );
    if (res) {
      return res;
    }
    return {
      error: `failed creating connection with instituionId : ${institution_id}`,
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
