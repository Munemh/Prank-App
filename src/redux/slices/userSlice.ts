
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  users: [];
  isAuthenticated: boolean;
  error: string | null; 
}

const initialState: UserState = {
  users: [], 
  isAuthenticated: false,
  error: null, 
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<[]>) => {
      state.users = action.payload;
    },
   
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setUsers,
  setError,
} = userSlice.actions;

export default userSlice.reducer;
