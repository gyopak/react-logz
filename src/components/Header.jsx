import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Settings from './Settings';
import Statistics from './Statistics';

const useStyles = makeStyles((theme) => ({
  toolBar: {
    minHeight: theme.spacing(9),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <AppBar position="sticky">
      <Toolbar className={classes.toolBar}>
        <Typography variant="h6" className={classes.title}>
          logz
        </Typography>
        <Statistics />
        <Settings />
      </Toolbar>
    </AppBar>
  );
}
