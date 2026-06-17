import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  isLogoutModalOpen: false,
  isAuthModalOpen: false,
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
      state.isAuthModalOpen = action.payload;
    },
  },
});

export const { setModalOpen, setLogoutModalOpen, setAuthModalOpen } =
  ModalSlice.actions;

export default ModalSlice.reducer;
