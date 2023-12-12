import { createSlice } from "@reduxjs/toolkit";
import { data } from "../DummyData";

const initialState = {
  tableData: [
   ...data.tableRows
  ],
};




export const ExpensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    getData: function (state, action) {
      return { ...state, tableData: [...action.payload] };
    },
    updateData: function (state, action) {
      console.log(action.payload , "particulr id")
      return {...state , tableData: [...state.tableData.map((todo) => (
        todo.id === action.payload.id ? [{...todo,firstName: action.payload.firstName,lastName: action.payload.lastName,age: action.payload.age}] : [...todo]
    ))]}
    },
  },
});

export const { getData, updateData } = ExpensesSlice.actions;
export default ExpensesSlice.reducer;
