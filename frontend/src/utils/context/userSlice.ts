import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './store';
import { host } from '../../constants/constant';

export interface User {
  id: number;
  username: string;
  name: string;
  location: string;
  profile: string;
  bio: string;
  blog: string;
  public_repos: number;
  public_gists: number;
  followers: number | any[];
  following: number;
  created_at: Date;
  updated_at: Date;
  repos?: any[];
}

export interface UserState {
  users: Record<string, User>;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
}

const initialState: UserState = {
  users: {},
  status: 'idle',
  error: null,
};

export const fetchUser = createAsyncThunk<User, string>(
  'user/fetchUser',
  async (username: string) => {
    const response = await axios.post(`${host}/users`, { username });
    return response.data;
  }
);

export const fetchFollowers = createAsyncThunk(
  "user/fetchFollowers",
  async (username: string) => {
    const response = await axios.get(`${host}/users/${username}/followers`);
    console.log(response)
    return { username, followers: response.data.followers, friends: response.data.friends };
  }
);

export const deleteUser = createAsyncThunk<void, string>(
  'user/deleteUser',
  async (username: string) => {
    await axios.delete(`${host}/users/${username}`);
    return username;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.users[action.payload.username] = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchFollowers.fulfilled, (state, action) => {
        const { username, followers } = action.payload;
        if (state.users[username]) {
          state.users[username].followers = followers;
        }
      })
      .addCase(fetchFollowers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
        delete state.users[action.payload];
      });
  },
});

export const selectUser = (state: RootState, username: string) =>
  state.user.users[username];
export const selectUserStatus = (state: RootState) => state.user.status;

export default userSlice.reducer;
