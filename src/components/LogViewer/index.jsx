import React, { useEffect, useState } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { useFetchLogsQuery } from '../../features/logApiSlice';
import LogLine from './LogLine';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
}));

export default function Header() {
  const classes = useStyles();
  const [before, setBefore] = useState(Date.now());
  const [after, setAfter] = useState();
  const [logs, setLogs] = useState([]);
  const { data, isError, isLoading } = useFetchLogsQuery(null, {
    pollingInterval: 1000,
  });

  useEffect(() => {
    const newLogs = data?.logs || [];
    setLogs([
      ...logs,
      ...newLogs,
    ]);
  }, [data]);

  return (
    <>
      <Backdrop open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className={classes.container}>
        {logs.map(({ time, type, line }) => (
          <LogLine time={time} type={type} line={line} />
        ))}
      </div>
    </>
  );
}
