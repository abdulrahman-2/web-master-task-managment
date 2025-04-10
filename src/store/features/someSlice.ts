// features/someSlice.ts
import { createSlice } from "@reduxjs/toolkit";

const someSlice = createSlice({
  name: "some",
  initialState: { count: 0 },
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
  },
});

export const { increment } = someSlice.actions;
export default someSlice.reducer;
