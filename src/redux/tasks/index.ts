import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  date: string;
  name: string;
  isPinned: boolean;
}

export interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: window.localStorage.getItem('tasks')
    ? JSON.parse(window.localStorage.getItem('tasks') as string)
    : [],
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      const newTasks = [...state.tasks, action.payload];
      return { ...state, tasks: newTasks };
    },
  },
});

export const { addTask } = tasksSlice.actions;

export default tasksSlice.reducer;
