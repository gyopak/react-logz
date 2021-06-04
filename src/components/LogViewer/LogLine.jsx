import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
}));

export default function LogLine({ time, type, line }) {
  const classes = useStyles();
  const { visibleSeverities } = useSelector((state) => state.settings);
  if (!visibleSeverities.includes(type)) return null;

  return (
    <Typography variant="h6" className={classes.title}>
      {type}
      {line}
    </Typography>
  );
}
