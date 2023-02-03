import type { InitialRequest, WidgetError } from '@/../shared/bff';
import type {
  Challenge,
  Connection,
  Credential,
  Institution,
  Institutions,
} from '@/../shared/contract';

import http from '../utils/http';

export default {
  context: (request: InitialRequest) =>
    http.post<InitialRequest | WidgetError>('/api/context', request),
  institutions: () =>
    http.post<Institutions | WidgetError>('/api/institutions', ''),
  search: (term: string) =>
    http.post<Institutions | WidgetError>('/api/search', { query: term }),
  selectInstitution: (ins: Institution) =>
    http.post<
    { institution: Institution; credentials: Array<Credential> } | WidgetError
    >('/api/selectInstitution', ins),
  login: (
    credentials: Array<Credential>,
    bankId: string,
    connection_id: string | undefined
  ) =>
    http.post<Connection | WidgetError>('/api/login', {
      credentials,
      institution_id: bankId.toLowerCase(),
      connection_id,
    }),
  mfa: (jobId: string) =>
    http.post<Connection | WidgetError>('/api/mfa', { job_id: jobId }),
  answerChallenge: (input: Array<Challenge>) =>
    http.post<boolean | WidgetError>('/api/answerChallenge', {
      challenges: input,
    }),
};
