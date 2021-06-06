import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MuiChip from '@material-ui/core/Chip';
import red from '@material-ui/core/colors/red';
import orange from '@material-ui/core/colors/orange';
import green from '@material-ui/core/colors/green';

const defaultLabel = {
  error: 'ERR',
  warning: 'WARN',
  info: 'INFO',
};

const useStyles = makeStyles(() => ({
  error: {
    backgroundColor: red[900],
  },
  warning: {
    backgroundColor: orange[900],
  },
  info: {
    backgroundColor: green[900],
  },
}));

const Chip = withStyles((theme) => ({
  root: {
    color: 'white',
    minWidth: '70px',
    [theme.breakpoints.down('sm')]: {
      minWidth: '20px',
    },
    margin: theme.spacing(1),
  },
}))(MuiChip);

const SeverityChip = ({ type, label, size }) => {
  const classes = useStyles();
  const labelToShow = label || defaultLabel[type] || '';
  return (
    <Chip size={size} className={classes[type]} label={labelToShow} />);
};

SeverityChip.propTypes = {
  type: PropTypes.oneOf(['info', 'error', 'warning']).isRequired,
  label: PropTypes.string,
  size: PropTypes.string,
};

SeverityChip.defaultProps = {
  label: undefined,
  size: 'medium',
};

export default SeverityChip;
