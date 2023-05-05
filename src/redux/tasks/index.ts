/* eslint-disable no-unneeded-ternary */
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
    deleteTask: (state, action: PayloadAction<Task>) => {
      const newTasks = state.tasks.filter(
        (task) => task.date !== action.payload.date,
      );
      return { ...state, tasks: newTasks };
    },
    pinTask: (state, action: PayloadAction<Task>) => {
      let newTask = state.tasks.find(
        (task) => task.date === action.payload.date,
      );

      newTask = newTask ? newTask : { date: '', name: '', isPinned: false };

      const pinedTask = { ...newTask, isPinned: true };

      const newTasks = [
        pinedTask,
        ...state.tasks.filter((task) => task.date !== action.payload.date),
      ];

      return { ...state, tasks: newTasks };
    },
  },
});

export const { addTask, deleteTask, pinTask } = tasksSlice.actions;

export default tasksSlice.reducer;
