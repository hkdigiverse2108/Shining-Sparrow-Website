import { configureStore } from "@reduxjs/toolkit";
import VideoModalSlice from "./Slices/VideoModalSlice"
import ModalSlice from "./Slices/ModalSlice"
import UserSlice from "./Slices/UserSlice"
import SettingsSlice from "./Slices/SettingsSlice";
import CoursePlayerSlice from "./Slices/CoursePlayerSlice";

export const Store = configureStore({
  reducer: {
    videoModal: VideoModalSlice,
    Modal: ModalSlice,
    user: UserSlice,
    settings: SettingsSlice,
    coursePlayer: CoursePlayerSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
