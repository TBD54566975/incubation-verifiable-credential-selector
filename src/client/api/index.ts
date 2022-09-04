import type { InitialRequest } from '@/../shared/bff';
import type {
  Challenge,
  Connection,
  Credential,
  Institution,
  Institutions,
} from '@/../shared/contract';

import http from '../utils/http';

export default {
  institutions: (request: InitialRequest) =>
    http.post<Institutions>('/api/institutions', request),
  search: (term: string) =>
    http.post<Institutions>('/api/search', { query: term }),
  selectInstitution: (instituion_id: string) =>
    http.post<{ institution: Institution; credentials: Array<Credential> }>(
      '/api/selectInstitution',
      { id: instituion_id }
    ),
  login: (credentials: Array<Credential>, bankId: string) =>
    http.post<Connection>('/api/login', { credentials, id: bankId }),
  mfa: (jobId: string) => http.post<Connection>('/api/mfa', { jobId }),
  answerChallenge: (input: Array<Challenge>) =>
    http.post<boolean>('/api/answerChallenge', { challenges: input }),
};
