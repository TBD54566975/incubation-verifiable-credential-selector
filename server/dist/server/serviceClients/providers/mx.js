"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MxApi = void 0;
const contract_1 = require("../../../shared/contract");
const logger = require("../../infra/logger");
const mxClient_1 = require("../mxClient");
const configuration_1 = require("./configuration");
function fromMxInstitution(ins) {
    return {
        id: ins.code,
        logo_url: ins.medium_logo_url || ins.small_logo_url,
        name: ins.name,
        url: ins.url,
        provider: 'mx',
    };
}
class MxApi {
    apiClient = (0, mxClient_1.MxPlatformApiFactory)(new mxClient_1.Configuration(configuration_1.mx));
    async ListFavorateInstitutions() {
        const res = await this.apiClient.listFavoriteInstitutions();
        return res.data.institutions.map(fromMxInstitution);
    }
    async GetInstitutionById(id) {
        const res = await this.apiClient.readInstitution(id);
        const ins = res.data.institution;
        return fromMxInstitution(ins);
    }
    async SearchInstitutions(name) {
        const res = await this.apiClient.listInstitutions(name);
        const inss = res.data.institutions;
        return {
            institutions: inss.map(fromMxInstitution),
        };
    }
    async ListInstitutionCredentials(institutionId) {
        const res = await this.apiClient.listInstitutionCredentials(institutionId);
        // console.log('ListInstitutionCredentials')
        // console.log(res.data.credentials);
        return res.data.credentials.map((item) => ({
            id: item.guid,
            label: item.field_name,
        }));
    }
    async CreateConnection(request, userId) {
        // console.log(request);
        // console.log(userId)
        // console.log(mxConfig.demoMemberId)
        if (request.institution_id === 'mxbank' && userId === configuration_1.mx.demoUserId) {
            const existing = await this.apiClient.listMembers(userId);
            logger.info(`Deleting demo members: ${existing.data.members.length}`);
            await Promise.all(existing.data.members.map((m) => this.apiClient.deleteMember(m.guid, userId)));
        }
        const entityId = request.institution_id;
        // let res = await this.apiClient.listInstitutionCredentials(entityId);
        // console.log(request)
        const ret = await this.apiClient.createMember(userId, {
            member: {
                credentials: request.credentials.map((c) => ({
                    guid: c.id,
                    value: c.value,
                })),
                institution_code: entityId,
            },
        });
        // console.log(ret.data)
        const member = ret.data.member;
        return {
            id: member.id,
            cur_job_id: member.guid,
            institution_code: entityId, // TODO
        };
    }
    async UpdateConnection(request, userId) {
        // console.log("UpdateConnection")
        const ret = await this.apiClient.updateMember(request.id, userId, {
            member: {
                credentials: request.credentials.map((c) => ({
                    guid: c.id,
                    value: c.value,
                })),
            },
        });
        const member = ret.data.member;
        return {
            id: member.id,
            cur_job_id: member.guid,
            // institution_code: entityId, //TODO
        };
    }
    async GetConnectionById(connectionId, userId) {
        const res = await this.apiClient.readMember(connectionId, userId);
        const member = res.data.member;
        return {
            id: member.guid,
        };
    }
    async GetConnectionStatus(memberId, userId) {
        const res = await this.apiClient.readMemberStatus(memberId, userId);
        const member = res.data.member;
        return {
            id: member.guid,
            cur_job_id: member.guid,
            status: contract_1.ConnectionStatus[member.connection_status],
            challenges: (member.challenges || []).map((item, idx) => {
                const c = {
                    id: item.guid || `${idx}`,
                    type: contract_1.ChallengeType.QUESTION,
                    question: item.label,
                };
                switch (item.type) {
                    case 'TEXT':
                        c.type = contract_1.ChallengeType.QUESTION;
                        c.data = [{ key: `${idx}`, value: item.label }];
                        break;
                    case 'OPTIONS':
                        c.type = contract_1.ChallengeType.OPTIONS;
                        c.question = item.label;
                        c.data = (item.options || []).map((o) => ({
                            key: o.label || o.value,
                            value: o.value,
                        }));
                        break;
                    case 'TOKEN':
                        c.type = contract_1.ChallengeType.TOKEN;
                        c.data = item.label;
                        break;
                    case 'IMAGE_DATA':
                        c.type = contract_1.ChallengeType.IMAGE;
                        c.data = item.image_data;
                        break;
                    case 'IMAGE_OPTIONS':
                        c.type = contract_1.ChallengeType.IMAGE_OPTIONS;
                        c.data = (item.image_options || []).map((io) => ({
                            key: io.label || io.value,
                            value: io.data_uri || io.value,
                        }));
                        break;
                    default:
                        break; // todo?
                }
                return c;
            }),
        };
    }
    async AnswerChallenge(request, userId) {
        const res = await this.apiClient.resumeAggregation(request.id, userId, {
            member: {
                challenges: request.challenges.map((item, idx) => ({
                    guid: item.id || `${idx}`,
                    value: item.response,
                })),
            },
        });
        return !!res;
    }
}
exports.MxApi = MxApi;
