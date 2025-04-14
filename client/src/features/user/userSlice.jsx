import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    saveUserData: (state, action) => {
      return action.payload;
    },
    removeUserData: (state, _) => {
      return null;
    },
  },
});

export const { saveUserData, removeUserData } = userSlice.actions;

export default userSlice.reducer;
