import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { push } from 'connected-next-router';
import { ParsedUrlQuery } from 'querystring';
import type {
  Challenge,
  Connection,
  Credential,
  Institution,
  Institutions,
} from 'shared/contract';
import { ConnectionStatus, EventEnum } from 'shared/contract';

import type { InitialRequest, WidgetError } from '@/../shared/bff';

import api from '../api';
import type { RootState } from '../app/store';
import { postMessage } from '../utils/broker';

export interface InstitutionState {
  institution_list?: Institutions;
  query?: string;
  selected_institution?: Institution;
  credentials?: Array<Credential>;
  job_id?: string;
  logged_in: boolean;
  request: InitialRequest | undefined;
  challenges?: Challenge[] | null;
}

export { push };

const mfaFullfilledAction = createAction<Challenge[] | null>('mfa/finished');
const mfaFailedAction = createAction<any>('mfa/failed');
const serverErrorAction = createAction<any>('bff/failed');

function emitEvent(e: EventEnum, eventData: any) {
  postMessage({
    event: EventEnum[e],
    data: eventData,
  });
}

function mfaError(dispatch: any, err: string) {
  console.log(`mfa error: ${err}`);
  emitEvent(EventEnum.ERROR, { message: err, step: 'mfa' });
  dispatch(mfaFailedAction(err));
}

function checkError(err: WidgetError, dispatch: any) {
  if (err?.error) {
    const erro = err.error as { message: string; code: string };
    const msg = erro.message || erro.code || (err.error as string);
    emitEvent(EventEnum.ERROR, { message: msg, error: err });
    dispatch(serverErrorAction(msg));
    return msg;
  }
  return false;
}

function mfa(job_id: string, dispatch: any) {
  dispatch({ type: 'mfa/processing' });
  // console.log("dispatch({type: 'mfa/processing'})")
  setTimeout(async () => {
    const res = await api.mfa(job_id);
    console.log(res);
    const err = checkError(res as WidgetError, dispatch);
    if (err) {
      mfaError(dispatch, `status: ${err}`);
      return;
    }
    const ret = res as Connection;
    switch (ret?.status) {
      case ConnectionStatus.CLOSED:
      case ConnectionStatus.FAILED:
        dispatch(mfaFailedAction('Connection Failed'));
        emitEvent(EventEnum.FAILED, { message: err, step: 'mfa' });
        break;
      case ConnectionStatus.CONNECTED:
        dispatch(mfaFullfilledAction([{} as any]));
        emitEvent(EventEnum.SUCCEEDED, ret);
        dispatch(
          push({
            pathname: '/success',
          })
        );
        break;
      case ConnectionStatus.CHALLENGED:
        if (ret.challenges) {
          if (ret?.challenges?.length > 0) {
            dispatch(mfaFullfilledAction(ret.challenges));
            emitEvent(EventEnum.CHALLENGED, ret.challenges);
            dispatch(
              push({
                pathname: '/bank-challenges',
              })
            );
            break;
          }
        }
        mfaError(dispatch, 'Unknown error');
        break;
      case ConnectionStatus.PENDING:
      case ConnectionStatus.RESUMED:
        mfa(job_id, dispatch);
        break;
      default:
        mfaError(dispatch, `status: ${ret?.status}`);
        break;
    }
  }, 5000);
}

export const initAsync = createAsyncThunk<
  InitialRequest | undefined,
  { query: ParsedUrlQuery; connection_id?: string | undefined },
  { state: RootState }
>('institution/init', async ({ query }, { dispatch }) => {
  const { provider, institution_id, bankId, user_id, job_type, connection_id } =
    query;
  const res = await api.context({
    connection_id: connection_id as string,
    provider: provider as string,
    job_type: job_type as string,
    institution_id: (bankId || institution_id) as string,
    user_id: user_id as string,
  });
  if (checkError(res as WidgetError, dispatch)) {
    return undefined;
  }
  return res as InitialRequest;
});

export const loadInstitutionsAsync = createAsyncThunk<
  Institutions | undefined,
  string | undefined,
  { state: RootState }
>('institution/list', async (query, { dispatch }) => {
  if (!query) {
    const res = await api.institutions();
    if (checkError(res as WidgetError, dispatch)) {
      return { institutions: [] };
    }
    return res as Institutions;
  }
  if (query.length >= 3) {
    const res = await api.search(query);
    if (checkError(res as WidgetError, dispatch)) {
      return { institutions: [] };
    }
    return res as Institutions;
  }
  return { institutions: [] };
});

export const loginAsync = createAsyncThunk<
  Connection | undefined,
  Credential[],
  { state: RootState }
>('institution/login', async (creds, thunkAPI) => {
  const { selected_institution } = thunkAPI.getState().instituion;
  const { connection_id } = thunkAPI.getState().instituion.request!;
  const res = await api.login(creds, selected_institution!.id!, connection_id);
  if (checkError(res as WidgetError, thunkAPI.dispatch)) {
    return undefined;
  }
  const ret = res as Connection;
  if (ret?.cur_job_id) {
    console.log(ret?.cur_job_id);
    mfa(ret.cur_job_id, thunkAPI.dispatch);
  }
  return ret;
});
export const selectInstitutionAsync = createAsyncThunk<
  { institution: Institution; credentials: Array<Credential> } | undefined,
  { instituion: Institution; navigate: boolean }
>(
  'institution/selectInstitution',
  async ({ instituion, navigate }, { dispatch }) => {
    const res = await api.selectInstitution(instituion);
    if (checkError(res as WidgetError, dispatch)) {
      return undefined;
    }
    const ret = res as {
      institution: Institution;
      credentials: Array<Credential>;
    };
    if (navigate && ret?.credentials?.length >= 2) {
      dispatch(
        push({
          pathname: '/bank-login',
          query: { bankId: instituion.id },
        })
      );
    }
    return ret;
  }
);
export const answerChallengeAsync = createAsyncThunk<
  boolean,
  Array<Challenge>,
  { state: RootState }
>('connection/answerChallenge', async (challenges, { dispatch, getState }) => {
  const res = await api.answerChallenge(challenges);
  if (checkError(res as WidgetError, dispatch)) {
    return false;
  }
  const state = getState();
  if (res === true) {
    mfa(state.instituion.job_id!, dispatch);
    return true;
  }
  return false;
});

export const institutionSlice = createSlice({
  name: 'institution',
  initialState: <InstitutionState>{},
  reducers: {
    search: (state, action) => {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadInstitutionsAsync.fulfilled, (state, action) => {
      if (action.payload && state.query === action.meta.arg) {
        state.institution_list = action.payload;
        state.query = action.meta.arg;
      }
    });
    builder.addCase(selectInstitutionAsync.fulfilled, (state, action) => {
      state.credentials = action.payload?.credentials;
      state.selected_institution = action.payload?.institution;
      emitEvent(EventEnum.SELECT_INSTITUTION, state.selected_institution);
    });
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.job_id = <string>action.payload?.cur_job_id;
      state.logged_in = true;
      emitEvent(EventEnum.LOGIN, {
        trace_id: state.job_id,
        payload: action.payload,
      });
    });
    builder.addCase(initAsync.fulfilled, (state, action) => {
      state.logged_in = false;
      state.request = action.payload;
      emitEvent(EventEnum.INIT, action.payload);
    });
    builder.addCase(mfaFullfilledAction, (state, action) => {
      state.challenges = action.payload;
    });
  },
});
export const { search } = institutionSlice.actions;

export default institutionSlice.reducer;
