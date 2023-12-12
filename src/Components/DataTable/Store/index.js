import { configureStore } from '@reduxjs/toolkit'
import  ExpensesSlice  from '../Reducers';


export const store = configureStore({
    reducer: {
        expenses: ExpensesSlice,
    },
  });