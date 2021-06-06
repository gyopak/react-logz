import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MuiChip from '@material-ui/core/Chip';

const Chip = withStyles((theme) => ({
  root: {
    minWidth: '150px',
    margin: theme.spacing(1),
    marginRight: 0,
  },
}))(MuiChip);

const TimeChip = ({ time }) => {
  const labelToShow = new Date(time).toLocaleString();
  return (
    <Chip size="small" variant="outlined" label={labelToShow} />);
};

TimeChip.propTypes = {
  time: PropTypes.number,
};

TimeChip.defaultProps = {
  time: Date.now(),
};

export default TimeChip;
