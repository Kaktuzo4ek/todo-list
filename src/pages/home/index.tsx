/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-alert */
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
import { RootState, useAppSelector } from '../../redux/store';
import Widget from '../../components/widget';

import styles from './home.module.scss';
import BasicTable from '../../components/table';
import {
  addTask,
  Task,
  deleteTask,
  pinTask,
  unpinTask,
  completeTaskToggle,
} from '../../redux/tasks';
import {
  fetchWidget1,
  fetchWidget2,
  fetchWidget3,
  fetchWidget4,
  fetchWidget5,
} from '../../redux/widgets';

const Home: React.FC = () => {
  const dispatch = useDispatch();

  const [taskName, setTaskName] = React.useState('');

  const [tasks, setTasks] = React.useState<Task[]>(
    window.localStorage.getItem('tasks')
      ? JSON.parse(window.localStorage.getItem('tasks') as string)
      : [],
  );

  const widgets = useAppSelector(
    (state: RootState) => state.widgets.widgets.items,
  );

  const createTask = (): void => {
    if (window.confirm('Додати справу?')) {
      const task = {
        date: `${new Date().toISOString().split('T')[0]} ${new Date()
          .toISOString()
          .split('T')[1]
          .slice(0, 8)}`,
        name: taskName,
        isPinned: false,
        isCompleted: false,
      };
      dispatch(addTask(task));
      setTasks((prev) => [...prev, task]);
      window.localStorage.setItem('tasks', JSON.stringify([...tasks, task]));
    }
  };

  const removeTask = (task: Task): void => {
    if (window.confirm('Видалити справу?')) {
      dispatch(deleteTask(task));
      setTasks((prev) => prev.filter((item) => item.date !== task.date));
      window.localStorage.setItem(
        'tasks',
        JSON.stringify(tasks.filter((item) => item.date !== task.date)),
      );
    }
  };

  const clickPinTask = (task: Task): void => {
    dispatch(pinTask(task));
    let newTask = tasks.find((item) => item.date === task.date);

    newTask = newTask
      ? newTask
      : { date: '', name: '', isPinned: false, isCompleted: false };

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

    newTask = newTask
      ? newTask
      : { date: '', name: '', isPinned: false, isCompleted: false };

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

  const clickCompleteTaskToggle = (task: Task): void => {
    dispatch(completeTaskToggle(task));
    let newTask = tasks.find((item) => item.date === task.date);

    newTask = newTask
      ? newTask
      : { date: '', name: '', isPinned: false, isCompleted: false };

    const editedTask = { ...newTask, isCompleted: !newTask.isCompleted };

    setTasks([
      editedTask,
      ...tasks
        .filter((item) => item.date !== task.date)
        .sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        ),
    ]);

    window.localStorage.setItem(
      'tasks',
      JSON.stringify(
        [editedTask, ...tasks.filter((item) => item.date !== task.date)].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        ),
      ),
    );
  };

  React.useEffect(() => {
    dispatch(fetchWidget1() as any);
    dispatch(fetchWidget2() as any);
    dispatch(fetchWidget3() as any);
    dispatch(fetchWidget4() as any);
    dispatch(fetchWidget5() as any);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.flexBox}>
        <Paper className={styles.inputField} elevation={0}>
          <TextField
            id='outlined-basic'
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            label='Введіть назву справи'
            variant='outlined'
            size='small'
            fullWidth
          />
        </Paper>
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
            onCompleteTaskToggle={clickCompleteTaskToggle}
            completedTask={false}
          />
          <h1>Завершені справи</h1>
          <BasicTable
            onRemoveTask={removeTask}
            onPinTask={clickPinTask}
            onUnpinTask={clickUnpinTask}
            onCompleteTaskToggle={clickCompleteTaskToggle}
            completedTask
          />
        </div>
        <div className={styles.widgets}>
          <h1>Віджети</h1>
          {widgets.map((item) => (
            <Paper
              key={`paper#${item.title}`}
              elevation={3}
              className={styles.widget}
            >
              <Widget
                key={`widget#${item.title}`}
                title={item.title}
                type={item.type}
                price={item.price}
                percent={item.percent}
                description={item.description}
              />
            </Paper>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
