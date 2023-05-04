/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { useDispatch } from 'react-redux';

import styles from './home.module.scss';
import BasicTable from '../../components/Table';
import Widget from '../../components/Widget';
import { addTask, Task } from '../../redux/tasks';

const Home: React.FC = () => {
  const dispatch = useDispatch();

  const [taskName, setTaskName] = React.useState('');

  const [tasks, setTasks] = React.useState<Task[]>([]);

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
    setTasks([...tasks, task]);
    window.localStorage.setItem('tasks', JSON.stringify([...tasks, task]));
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
          <BasicTable />
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
