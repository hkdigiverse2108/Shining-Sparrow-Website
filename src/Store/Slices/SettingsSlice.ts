import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Settings } from "../../Types/Settings";

interface SettingsState {
  settings: Settings | null;
}

const initialState: SettingsState = {
  settings: null,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettings: (state, action: PayloadAction<Settings>) => {
      state.settings = action.payload;
    },
  },
});

export const { setSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
