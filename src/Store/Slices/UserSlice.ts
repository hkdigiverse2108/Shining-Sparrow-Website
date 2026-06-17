import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../../Types";
import { STORAGE_KEYS } from "../../Constants/StorageKeys";

const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
const user: User | null = storedUser ? JSON.parse(storedUser) : null;

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  user: user,
  isAuthenticated: !!user,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      window.location.reload();
    },
  },
});

export const { setUser, clearUser } = UserSlice.actions;
export default UserSlice.reducer;
