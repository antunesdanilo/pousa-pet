import { createSlice } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
import { RootState } from '../store';
import { UserDto } from '@/providers/dtos/user.dto';

const getUserFromLocalStorage = (): UserDto | undefined => {
  const localItem = SecureStore.getItem('user');

  if (
    localItem !== undefined &&
    localItem !== '' &&
    localItem !== 'undefined' &&
    localItem !== null
  ) {
    return JSON.parse(localItem) as UserDto;
  }

  return undefined;
};

export interface UserSliceState {
  user: UserDto | undefined;
  isAuthenticated: boolean;
  lastRegisteredName: string | undefined;
}

const initialState: UserSliceState = {
  user: getUserFromLocalStorage(),
  lastRegisteredName: undefined,
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, { payload }: { payload: UserDto }) => {
      SecureStore.setItem('user', JSON.stringify(payload));
      return { ...state, user: payload, isAuthenticated: true };
    },
    logout: (state) => {
      return { ...state, isAuthenticated: false };
    },
    cleanUser: (state) => {
      return { ...state, user: undefined };
    },
    setLastRegisteredName: (
      state,
      { payload }: { payload: string | undefined },
    ) => {
      return { ...state, lastRegisteredName: payload };
    },
  },
});

export const { login, logout, cleanUser, setLastRegisteredName } =
  userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
