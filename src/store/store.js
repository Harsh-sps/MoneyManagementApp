import {configureStore} from '@reduxjs/toolkit';
import TransactionReducers from '../reducers/TransactionReducers';

const store = configureStore({
  reducer: {
    transactions: TransactionReducers,
  },
});

export default store;
