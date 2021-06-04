import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './components/Header';
import LogViewer from './components/LogViewer';
import { setDarkMode } from './features/settingsSlice';

const App = () => {
  const isDarkMode = useSelector((state) => state.settings.isDarkMode);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDarkMode(prefersDarkMode));
  }, [dispatch, prefersDarkMode]);

  const theme = React.useMemo(
    () => createMuiTheme({
      palette: {
        type: isDarkMode ? 'dark' : 'light',
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
