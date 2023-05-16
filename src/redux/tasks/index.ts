import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  date: string;
  name: string;
  isPinned: boolean;
  isCompleted: boolean;
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

      newTask = newTask
        ? newTask
        : { date: '', name: '', isPinned: false, isCompleted: false };

      const pinedTask = { ...newTask, isPinned: true };

      const newTasks = [
        pinedTask,
        ...state.tasks.filter((task) => task.date !== action.payload.date),
      ];

      return { ...state, tasks: newTasks };
    },
    unpinTask: (state, action: PayloadAction<Task>) => {
      let newTask = state.tasks.find(
        (task) => task.date === action.payload.date,
      );

      newTask = newTask
        ? newTask
        : { date: '', name: '', isPinned: false, isCompleted: false };

      const unpinedTask = { ...newTask, isPinned: false };

      const newTasks = [
        unpinedTask,
        ...state.tasks.filter((task) => task.date !== action.payload.date),
      ];

      return {
        ...state,
        tasks: newTasks.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        ),
      };
    },
    completeTaskToggle: (state, action: PayloadAction<Task>) => {
      let newTask = state.tasks.find(
        (task) => task.date === action.payload.date,
      );

      newTask = newTask
        ? newTask
        : { date: '', name: '', isPinned: false, isCompleted: false };

      const editedTask = { ...newTask, isCompleted: !newTask.isCompleted };

      const newTasks = [
        editedTask,
        ...state.tasks.filter((task) => task.date !== action.payload.date),
      ];

      return {
        ...state,
        tasks: newTasks.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        ),
      };
    },
  },
});

export const { addTask, deleteTask, pinTask, unpinTask, completeTaskToggle } =
  tasksSlice.actions;

export default tasksSlice.reducer;
