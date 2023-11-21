import {createSlice} from '@reduxjs/toolkit';

export const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    data: [],
  },
  reducers: {
    setTodos(state, action) {
      state.data = action.payload;
    },
    addTodo(state, action) {
      state.data = [...state.data, action.payload];
    },
    deleteTodo(state, action) {
      state.data = state.data.filter((item, index) => index !== action.payload);
    },
  },
});

export const {setTodos, addTodo, deleteTodo} = todoSlice.actions;
export const selectTodos = state => state.todo.data;
export default todoSlice.reducer;
