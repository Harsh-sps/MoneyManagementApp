import {createSlice} from '@reduxjs/toolkit';

const transactionSlice = createSlice({
  name: 'transactions',
  initialState: [],
  reducers: {
    setTransaction: (state, action) => {
      console.log('Updating state with:', action.payload);
      return action.payload;
    },
  },
});

export const {setTransaction} = transactionSlice.actions;
export default transactionSlice.reducer;
