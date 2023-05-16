import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

import { useDispatch } from 'react-redux';
import { AppDispatch, RootState, useAppSelector } from '../../redux/store';

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

import { fetchDogWidget } from '../../redux/widgets/dog';
import { fetchIpWidget } from '../../redux/widgets/ip';
import { fetchActivityWidget } from '../../redux/widgets/activity';
import { fetchFactWidget } from '../../redux/widgets/fact';
import { fetchWeatherWidget } from '../../redux/widgets/weather';

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [taskName, setTaskName] = React.useState('');

  const [tasks, setTasks] = React.useState<Task[]>(
    window.localStorage.getItem('tasks')
      ? JSON.parse(window.localStorage.getItem('tasks') as string)
      : [],
  );

  const dogWidget = useAppSelector((state: RootState) => state.dog.data);

  const [ip, setIp] = React.useState('24.48.0.1');
  const ipWidget = useAppSelector((state: RootState) => state.ip.data);

  const activityWidget = useAppSelector(
    (state: RootState) => state.activity.data,
  );

  const factWidget = useAppSelector((state: RootState) => state.fact.data);

  const weatherWidget = useAppSelector(
    (state: RootState) => state.weather.data,
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
    const fetchWidgets = async (): Promise<void> => {
      await dispatch(fetchDogWidget());
      await dispatch(fetchIpWidget(ip));
      await dispatch(fetchActivityWidget());
      await dispatch(fetchFactWidget());
      await dispatch(
        fetchWeatherWidget({ lat: ipWidget.lat, lon: ipWidget.lon }),
      );
    };
    fetchWidgets();
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
          <Paper elevation={3} className={styles.widget}>
            <div className={styles.widgetBody}>
              <h2>Генератор собак</h2>
              <div className={styles.containerForImages}>
                <img
                  src={dogWidget.imageUrl}
                  alt='dog'
                  className={styles.dogImage}
                />
              </div>
              <Button
                onClick={() => dispatch(fetchDogWidget())}
                variant='contained'
                fullWidth
              >
                Отримати нове зображення
              </Button>
            </div>
          </Paper>
          <Paper elevation={3} className={styles.widget}>
            <div className={styles.widgetBody}>
              <h2>Знайти по IP</h2>
              <TextField
                id='outlined-basic'
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                label='Введіть IP'
                variant='outlined'
                size='small'
                sx={{ marginTop: 2 }}
                fullWidth
              />
              <div className={styles.info}>
                <p>
                  Країна:
                  {ipWidget.country}
                </p>
                <p>
                  Область:
                  {ipWidget.city}
                </p>
                <p>
                  Місто:
                  {ipWidget.regionName}
                </p>
              </div>
              <Button
                onClick={() => dispatch(fetchIpWidget(ip))}
                className={styles.createBtn}
                variant='contained'
                fullWidth
              >
                Знайти
              </Button>
            </div>
          </Paper>
          <Paper elevation={3} className={styles.widget}>
            <div className={styles.widgetBody}>
              <div className={styles.flexBox}>
                <h3>{activityWidget.activity}</h3>
                <span className={styles.type}>{activityWidget.type}</span>
              </div>
              <h2>
                Ціна:
                {activityWidget.price}
              </h2>
              <div className={styles.flexBox}>
                <span className={styles.accessibility}>
                  Доступність:
                  {activityWidget.accessibility}
                </span>
              </div>
            </div>
          </Paper>
          <Paper elevation={3} className={styles.widget}>
            <div className={styles.widgetBody}>
              <h2>Факти про котів</h2>
              <div className={styles.info}>
                <p>{factWidget.fact}</p>
              </div>
            </div>
          </Paper>
          <Paper elevation={3} className={styles.widget}>
            <div className={styles.widgetBody}>
              <h2>Місцева погода</h2>
              <div className={styles.info}>
                <p>
                  Погода:
                  {weatherWidget.weather}
                </p>
                <p>
                  Деталі:
                  {weatherWidget.description}
                </p>
                <p>
                  Температура:
                  {`${weatherWidget.temp}°F`}
                </p>
                <p>
                  Мін. темп.:
                  {`${weatherWidget.tempMin}°F`}
                </p>
                <p>
                  Макс. темп.:
                  {`${weatherWidget.tempMax}°F`}
                </p>
                <p>
                  Вологість:
                  {`${weatherWidget.humidity}%`}
                </p>
                <p>
                  Тиск:
                  {`${weatherWidget.pressure}гПа`}
                </p>
              </div>
            </div>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default Home;
