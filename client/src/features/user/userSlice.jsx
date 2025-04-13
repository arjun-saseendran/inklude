import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: true
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUserData: (state, action) => {
      state.user = action.payload;
      state.loading = false
    },
  },
});

export const { saveUserData } = userSlice.actions;

export default userSlice.reducer;
