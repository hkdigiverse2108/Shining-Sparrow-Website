import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  isLogoutModalOpen: false,
  isAuthModalOpen: false,
  purchaseContext: null as { courseId?: string; workshopId?: string } | null,
};

const ModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
    setLogoutModalOpen: (state, action) => {
      state.isLogoutModalOpen = action.payload;
    },
    setAuthModalOpen: (state, action) => {
      if (action.payload && typeof action.payload === "object") {
        state.isAuthModalOpen = action.payload.open;
        state.purchaseContext = action.payload.context || null;
      } else {
        state.isAuthModalOpen = action.payload;
        state.purchaseContext = null;
      }
    },
  },
});

export const { setModalOpen, setLogoutModalOpen, setAuthModalOpen } =
  ModalSlice.actions;

export default ModalSlice.reducer;
