import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { push } from 'connected-next-router';
import type {
  Challenge,
  Connection,
  Credential,
  Institution,
  Institutions,
} from 'shared/contract';
import { ConnectionStatus } from 'shared/contract';

import type { InitialRequest } from '@/../shared/bff';

import api from '../api';
import type { RootState } from '../app/store';

export interface InstitutionState {
  institution_list?: Institutions;
  query?: string;
  selected_institution?: Institution;
  credentials?: Array<Credential>;
  job_id?: string;
  request?: InitialRequest;
  challenges?: Challenge[] | null;
}

export { push };

const mfaFullfilledAction = createAction<Challenge[] | null>('mfa/finished');

function mfaError(dispatch: any) {
  dispatch({ type: 'mfa/failed' });
  dispatch(
    push({
      pathname: '/bank-error',
    })
  );
}

function mfa(job_id: string, dispatch: any) {
  dispatch({ type: 'mfa/processing' });
  // console.log("dispatch({type: 'mfa/processing'})")
  setTimeout(async () => {
    const res = await api.mfa(job_id);
    console.log(res);
    switch (res?.status) {
      case ConnectionStatus.CLOSED:
      case ConnectionStatus.FAILED:
        mfaError(dispatch);
        break;
      case ConnectionStatus.CONNECTED:
        dispatch(mfaFullfilledAction([{} as any]));
        dispatch(
          push({
            pathname: '/success',
          })
        );
        break;
      case ConnectionStatus.CHALLENGED:
        if (res.challenges) {
          if (res?.challenges?.length > 0) {
            dispatch(mfaFullfilledAction(res.challenges));
            dispatch(
              push({
                pathname: '/bank-challenges',
              })
            );
            break;
          }
        }
        mfaError(dispatch);
        break;
      case ConnectionStatus.PENDING:
      case ConnectionStatus.RESUMED:
        mfa(job_id, dispatch);
        break;
      default:
        mfaError(dispatch);
        break;
    }
  }, 5000);
}

export const loadInstitutionsAsync = createAsyncThunk<
  Institutions,
  string | undefined,
  { state: RootState }
>('institution/list', async (query: string | undefined, thunkAPI) => {
  const { request } = thunkAPI.getState().instituion;
  if (!query) {
    return api.institutions(request!);
  }
  if (query.length >= 3) {
    return api.search(query);
  }
  return { institutions: [] };
});

export const loginAsync = createAsyncThunk<
  Connection,
  Credential[],
  { state: RootState }
>('institution/login', async (creds, thunkAPI) => {
  const { selected_institution } = thunkAPI.getState().instituion;
  const res = await api.login(creds, selected_institution!.id!);
  console.log(res);
  console.log(res?.cur_job_id);
  if (res?.cur_job_id) {
    console.log(res?.cur_job_id);
    mfa(res.cur_job_id, thunkAPI.dispatch);
  }
  return res;
});
export const selectInstitutionAsync = createAsyncThunk<
  { institution: Institution; credentials: Array<Credential> },
  string
>(
  'institution/selectInstitution',
  async (instituion_id: string, { dispatch }) => {
    const res = await api.selectInstitution(instituion_id);
    if (res?.credentials?.length >= 2) {
      dispatch(
        push({
          pathname: '/bank-login',
          query: { bankId: instituion_id },
        })
      );
    }
    return res;
  }
);
export const answerChallengeAsync = createAsyncThunk<
  boolean,
  Array<Challenge>,
  { state: RootState }
>('connection/answerChallenge', async (challenges, { dispatch, getState }) => {
  const res = await api.answerChallenge(challenges);
  const state = getState();
  if (res) {
    mfa(state.instituion.job_id!, dispatch);
  }
  return res;
});

export const institutionSlice = createSlice({
  name: 'institution',
  initialState: <InstitutionState>{},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadInstitutionsAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.institution_list = action.payload;
      }
    });
    builder.addCase(selectInstitutionAsync.fulfilled, (state, action) => {
      state.credentials = action.payload?.credentials;
      state.selected_institution = action.payload?.institution;
    });
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.job_id = <string>action.payload.cur_job_id;
    });
    builder.addCase(mfaFullfilledAction, (state, action) => {
      state.challenges = action.payload;
    });
  },
});

export default institutionSlice.reducer;
