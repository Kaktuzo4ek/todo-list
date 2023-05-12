import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';

import { lightTheme, darkTheme } from './theme';
import './index.scss';
import App from './App';
import { RootState, useAppSelector, store } from './redux/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const ThemeProviderWithCustomTheme: React.FC = () => {
  const isDarkTheme = useAppSelector(
    (state: RootState) => state.theme.darkTheme,
  );

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <App />
    </ThemeProvider>
  );
};

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProviderWithCustomTheme />
    </BrowserRouter>
  </Provider>,
);
