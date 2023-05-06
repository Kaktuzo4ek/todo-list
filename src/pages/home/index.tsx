/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable object-curly-newline */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { useDispatch } from 'react-redux';

import styles from './home.module.scss';
import BasicTable from '../../components/Table';
import Widget from '../../components/Widget';
import {
  addTask,
  Task,
  deleteTask,
  pinTask,
  unpinTask,
} from '../../redux/tasks';

const Home: React.FC = () => {
  const dispatch = useDispatch();

  const [taskName, setTaskName] = React.useState('');

  const [tasks, setTasks] = React.useState<Task[]>(
    window.localStorage.getItem('tasks')
      ? JSON.parse(window.localStorage.getItem('tasks') as string)
      : [],
  );

  const createTask = (): void => {
    const task = {
      date: `${new Date().toISOString().split('T')[0]} ${new Date()
        .toISOString()
        .split('T')[1]
        .slice(0, 8)}`,
      name: taskName,
      isPinned: false,
    };
    dispatch(addTask(task));
    setTasks((prev) => [...prev, task]);
    window.localStorage.setItem('tasks', JSON.stringify([...tasks, task]));
  };

  const removeTask = (task: Task): void => {
    dispatch(deleteTask(task));
    setTasks((prev) => prev.filter((item) => item.date !== task.date));
    window.localStorage.setItem(
      'tasks',
      JSON.stringify(tasks.filter((item) => item.date !== task.date)),
    );
  };

  const clickPinTask = (task: Task): void => {
    dispatch(pinTask(task));
    let newTask = tasks.find((item) => item.date === task.date);

    newTask = newTask ? newTask : { date: '', name: '', isPinned: false };

    const pinedTask = { ...newTask, isPinned: true };

    setTasks([pinedTask, ...tasks.filter((item) => item.date !== task.date)]);
    window.localStorage.setItem(
      'tasks',
      JSON.stringify([
        pinedTask,
        ...tasks.filter((item) => item.date !== task.date),
      ]),
    );
  };

  const clickUnpinTask = (task: Task): void => {
    dispatch(unpinTask(task));
    let newTask = tasks.find((item) => item.date === task.date);

    newTask = newTask ? newTask : { date: '', name: '', isPinned: false };

    const pinedTask = { ...newTask, isPinned: false };

    setTasks(
      [pinedTask, ...tasks.filter((item) => item.date !== task.date)].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      ),
    );
    window.localStorage.setItem(
      'tasks',
      JSON.stringify(
        [pinedTask, ...tasks.filter((item) => item.date !== task.date)].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        ),
      ),
    );
  };

  return (
    <div>
      <div className={styles.flexBox}>
        <TextField
          className={styles.inputField}
          id='outlined-basic'
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          label='Введіть назву справи'
          variant='outlined'
          size='small'
        />
        <Button
          onClick={createTask}
          className={styles.createBtn}
          variant='contained'
        >
          Створити
        </Button>
      </div>
      <div className={styles.flexBox}>
        <div className={styles.tasks}>
          <h1>Список справ</h1>
          <BasicTable
            onRemoveTask={removeTask}
            onPinTask={clickPinTask}
            onUnpinTask={clickUnpinTask}
          />
          <h1>Завершені справи</h1>
          {/* <BasicTable /> */}
        </div>
        <div className={styles.widgets}>
          <h1>Віджети</h1>
          <Paper elevation={3} className={styles.widget}>
            <Widget />
          </Paper>
          <Paper elevation={3} className={styles.widget}>
            <Widget />
          </Paper>
          <Paper elevation={3} className={styles.widget}>
            <Widget />
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default Home;
