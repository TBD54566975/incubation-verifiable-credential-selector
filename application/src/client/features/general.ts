import type {
  // AsyncThunk,
  AnyAction,
} from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

// type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

// type PendingAction = ReturnType<GenericAsyncThunk['pending']>
// type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
// type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

function isRejectedAction(action: AnyAction) {
  return (
    action.type.endsWith('/failed') ||
    action.type.endsWith('institution/selectInstitution/rejected')
  );
}

function isFulfilledAction(action: AnyAction) {
  return (
    action.type.endsWith('/finished') ||
    action.type.endsWith('institution/selectInstitution/fulfilled')
  );
}

function isPendingAction(action: AnyAction) {
  return (
    action.type.endsWith('/processing') ||
    action.type.endsWith('institution/selectInstitution/pending')
  );
}

export const generalSlice = createSlice({
  name: 'general',
  initialState: <any>{
    processing: false,
    error: null,
  },
  reducers: {
    resetLoadingStatus: () => ({ processing: false }),
  },
  extraReducers: (builder) => {
    builder.addMatcher(isPendingAction, (state, action) => {
      state.processing = true;
      if (action?.meta?.requestId) {
        state[action.meta.requestId] = 'pending';
      }
      console.log(`pending: ${action.type}`);
    });
    builder.addMatcher(isRejectedAction, (state, action) => {
      state.processing = false;
      state.error = action.error || action.payload;
      if (action?.meta?.requestId) {
        state[action.meta.requestId] = 'rejected';
      }
      console.log(`rejected: ${action.type}`);
    });
    builder.addMatcher(isFulfilledAction, (state, action) => {
      state.processing = false;
      if (action?.meta?.requestId) {
        state[action.meta.requestId] = 'fulfilled';
      }
      console.log(`fullfilled: ${action.type}`);
    });
  },
});

export const { resetLoadingStatus } = generalSlice.actions;

export default generalSlice.reducer;
