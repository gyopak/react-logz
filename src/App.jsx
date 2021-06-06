import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './components/Header';
import LogViewer from './components/LogViewer';
import { setDarkMode } from './features/settingsSlice';

const App = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);

  // check if user has preferred dark mode, set it initially and if it changes
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  useEffect(() => {
    dispatch(setDarkMode(prefersDarkMode));
  }, [dispatch, prefersDarkMode]);

  const theme = React.useMemo(
    () => createMuiTheme({
      palette: {
        type: isDarkMode ? 'dark' : 'light',
        primary: {
          main: 'rgba(0, 0, 0, 0.90)',
        },
        background: {
          default: isDarkMode ? 'rgba(0, 0, 0, 0.95)' : 'rgba(0, 0, 0, 0.12)',
        },
      },
    }),
    [isDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <LogViewer />
    </ThemeProvider>
  );
};

export default App;
