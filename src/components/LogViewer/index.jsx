import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Backdrop from '@material-ui/core/Backdrop';
import Fab from '@material-ui/core/Fab';
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useFetchNewLogsQuery, useFetchOldLogsQuery } from '../../features/logApiSlice';
import { receivePolledLogs, receiveOldLogs, reset } from '../../features/logCacheSlice';
import LogLine from './LogLine';

const useStyles = makeStyles((theme) => ({
  loader: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    color: 'white',
    zIndex: 1,
  },
  followLogs: {
    position: 'fixed',
    bottom: theme.spacing(2),
    left: '50%',
    transform: 'translateX(-50%);',
    width: '170px',
    display: 'flex',
    justifyContent: 'space-around',
  },
}));

export default function LogViewer() {
  const classes = useStyles();
  const theme = useTheme();
  const containerRef = useRef(null);
  const { logs, isPollingEnabled } = useSelector((state) => state.logCache);
  const dispatch = useDispatch();

  const [before, setBefore] = useState();
  const [followLogs, setFollowLogs] = useState(true);
  const [after, setAfter] = useState();

  const {
    data: polledData, isError: isPollingError, isLoading: isPollingLoading,
  } = useFetchNewLogsQuery(after);

  const {
    data: oldData, isError: isOldLogError, isFetching: isOldLogFetching,
  } = useFetchOldLogsQuery(before, {
    skip: !before,
  });

  useEffect(() => {
    const newLogs = polledData?.logs || [];
    if (newLogs.length) dispatch(receivePolledLogs(newLogs));
  }, [polledData, dispatch]);

  useEffect(() => {
    const oldLogs = oldData?.logs || [];
    if (oldLogs.length) dispatch(receiveOldLogs(oldLogs));
  }, [oldData, dispatch]);

  // RTK queries pollingInterval and disabled refetchOnMountOrArgChange
  // are not working together but hey, it's beta
  // trigger polling with an arg update in a classic way
  useEffect(() => {
    const pollingID = setInterval(() => {
      if (isPollingEnabled) setAfter(logs?.[logs.length - 1]?.time);
    }, 1000);
    return () => clearInterval(pollingID);
  }, [logs, isPollingEnabled]);

  useEffect(() => {
    if (!isPollingEnabled) {
      const lastReceivedLogIndex = oldData.logs.length;
      const logToScroll = containerRef.current.children[lastReceivedLogIndex];
      const logOffsetY = logToScroll.getBoundingClientRect().y;
      const headerOffsetY = theme.spacing(9);
      window.scroll(0, logOffsetY - headerOffsetY);
    }
  }, [logs, isPollingEnabled, oldData?.logs?.length, theme]);

  useEffect(() => {
    // TODO: handle errors :)
    const error = isOldLogError || isPollingError;
    if (error) console.error(error);
  }, [isOldLogError, isPollingError]);

  const scrollToBottom = () => {
    containerRef?.current?.scrollIntoView(
      {
        block: 'end',
        inline: 'nearest',
      },
    );
  };

  const requestOldLogs = () => {
    const beforeFirstLog = logs?.[0].time;
    setBefore(beforeFirstLog);
  };

  const handleScroll = (event) => {
    const { y } = containerRef.current.getBoundingClientRect();
    const shouldRequestOldLogs = y >= theme.spacing(6);
    if (shouldRequestOldLogs && !isOldLogFetching) requestOldLogs();
    if (followLogs && event.deltaY < 0) setFollowLogs(false);
  };

  const onFollowLogsClick = () => {
    if (!isPollingEnabled) {
      setAfter(undefined);
      dispatch(reset());
    }
    scrollToBottom();
    setFollowLogs(true);
  };

  useEffect(() => {
    if (followLogs) scrollToBottom();
  },
  [logs, followLogs]);

  return (
    <>
      <Backdrop
        className={classes.loader}
        open={isPollingLoading || isOldLogFetching || !logs.length}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className={classes.container} ref={containerRef} onWheel={handleScroll}>
        {logs.map(({ time, type, line }) => (
          <LogLine
            time={time}
            type={type}
            line={line}
          />
        ))}
        {!followLogs && (
        <Fab variant="extended" color="primary" className={classes.followLogs} onClick={onFollowLogsClick}>
          <VerticalAlignBottomIcon />
          Tail logs
        </Fab>
        ) }
      </div>
    </>
  );
}
