import type {
  Connection,
  CreateConnectionRequest,
  Credential,
  Institution,
  Institutions,
  ProviderApiClient,
  UpdateConnectionRequest,
} from '../../../shared/contract';
import { ChallengeType, ConnectionStatus } from '../../../shared/contract';
import type { InstitutionResponse } from '../mxClient';
import { Configuration, MxPlatformApiFactory } from '../mxClient';
import { mx as mxConfig } from './configuration';

function fromMxInstitution(ins: InstitutionResponse): Institution {
  return {
    id: ins.code!,
    logo_url: ins.medium_logo_url || ins.small_logo_url!,
    name: ins.name!,
    url: ins.url!,
  };
}

export class MxApi implements ProviderApiClient {
  apiClient = MxPlatformApiFactory(new Configuration(mxConfig));

  async ListFavorateInstitutions(): Promise<Institution[]> {
    const res = await this.apiClient.listFavoriteInstitutions();
    return res.data.institutions!.map(fromMxInstitution);
  }

  async GetInstitutionById(id: string): Promise<Institution> {
    const res = await this.apiClient.readInstitution(id);
    const ins = res.data.institution!;
    return fromMxInstitution(ins);
  }

  async SearchInstitutions(name: string): Promise<Institutions> {
    const res = await this.apiClient.listInstitutions(name);
    const inss = res.data.institutions!;
    return {
      institutions: inss.map(fromMxInstitution),
    };
  }

  async ListInstitutionCredentials(
    institutionId: string
  ): Promise<Array<Credential>> {
    const res = await this.apiClient.listInstitutionCredentials(institutionId);
    return res.data.credentials!.map((item) => ({
      id: item.guid!,
      label: item.field_name!,
    }));
  }

  async CreateConnection(
    request: CreateConnectionRequest,
    userId: string
  ): Promise<Connection> {
    // let username = request.credentials.find(item => item.key === 'username').value;
    // let password = request.credentials.find(item => item.key === 'password').value;
    const entityId = request.institution_id;
    // let res = await this.apiClient.listInstitutionCredentials(entityId);
    // let usernameGuid = res.data.credentials.find(item => item.field_name === 'username').guid;
    // let passwordGuid = res.data.credentials.find(item => item.field_name === 'password').guid;
    const ret = await this.apiClient.createMember(userId, {
      member: {
        credentials: request.credentials,
        institution_code: entityId,
      },
    });
    const member = ret.data.member!;
    return {
      id: member.id!,
      cur_job_id: member.guid!,
      institution_code: entityId, // TODO
    };
  }

  async UpdateConnection(
    request: UpdateConnectionRequest,
    userId: string
  ): Promise<Connection> {
    // let memberRes = await this.apiClient.readMember(request.id, userId);
    // let member = memberRes.data.member;
    // let username = request.credentials.find(item => item.key === 'username').value;
    // let password = request.credentials.find(item => item.key === 'password').value;
    // let entityId = member.institution_code;
    // let res = await this.apiClient.listInstitutionCredentials(entityId);
    // let usernameGuid = res.data.credentials.find(item => item.field_name === 'username').guid;
    // let passwordGuid = res.data.credentials.find(item => item.field_name === 'password').guid;
    const ret = await this.apiClient.updateMember(request.id!, userId, {
      member: {
        credentials: request.credentials,
      },
    });
    const member = ret.data.member!;
    return {
      id: member.id!,
      cur_job_id: member.guid!,
      // institution_code: entityId, //TODO
    };
  }

  async GetConnectionById(
    connectionId: string,
    userId: string
  ): Promise<Connection> {
    const res = await this.apiClient.readMember(connectionId, userId);
    const member = res.data.member!;
    return {
      id: member.guid!,
    };
  }

  async GetConnectionStatus(
    memberId: string,
    userId: string
  ): Promise<Connection> {
    const res = await this.apiClient.readMemberStatus(memberId, userId);
    const member = res.data.member!;
    return {
      id: member.guid!,
      cur_job_id: member.guid!,
      status:
        ConnectionStatus[
          member.connection_status! as keyof typeof ConnectionStatus
        ],
      challenges: (member.challenges || []).map((item) => {
        let type = ChallengeType.QUESTION;
        switch (item.type) {
          case 'TEXT':
            type = ChallengeType.QUESTION;
            break;
          case 'OPTIONS':
            type = ChallengeType.OPTIONS;
            break;
          case 'TOKEN':
            type = ChallengeType.TOKEN;
            break;
          case 'IMAGE_DATA':
            type = ChallengeType.IMAGE;
            break;
          case 'IMAGE_OPTIONS':
            type = ChallengeType.IMAGE_OPTIONS;
            break;
          default:
            break; // todo?
        }
        return {
          id: item.guid!,
          type,
          question: item.label,
          data:
            item.image_data ||
            (item.options || []).map((o) => ({
              key: o.label || o.value!,
              value: o.value,
            })) ||
            (item.image_options || []).map((io) => ({
              key: io.label || io.value!,
              value: io.data_uri || io.value,
            })),
        };
      }),
    };
  }

  async AnswerChallenge(
    request: UpdateConnectionRequest,
    userId: string
  ): Promise<boolean> {
    const res = await this.apiClient.resumeAggregation(request.id!, userId, {
      member: {
        challenges: request.challenges!.map((item) => ({
          guid: item.id,
          value: <string>item.response,
        })),
      },
    });
    return !!res;
  }
}
