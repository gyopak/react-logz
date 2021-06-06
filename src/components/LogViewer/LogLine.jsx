import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import SeverityChip from './SeverityChip';
import TimeChip from './TimeChip';

const useStyles = makeStyles((theme) => ({
  logLine: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
    border: '1px solid',
    borderColor: theme.palette.divider,
    cursor: 'default',
    '&:hover': {
      background: theme.palette.action.selected,
    },
  },
  line: {
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
      paddingTop: 0,
    },
  },
}));

const LogLine = ({ time, type, line }) => {
  const classes = useStyles();
  const { visibleSeverities } = useSelector((state) => state.settings);
  if (!visibleSeverities.includes(type)) return null;

  return (
    <div
      className={classes.logLine}
    >
      <TimeChip time={time} />
      <SeverityChip size="small" type={type.toLowerCase()} />
      <Typography variant="body1" className={classes.line}>
        {line}
      </Typography>
    </div>

  );
};

LogLine.propTypes = {
  time: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['INFO', 'ERROR', 'WARNING']).isRequired,
  line: PropTypes.string,
};

LogLine.defaultProps = {
  line: '',
};

export default LogLine;
