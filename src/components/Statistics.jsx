import React from 'react';
import { makeStyles, styled, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import red from '@material-ui/core/colors/red';
import orange from '@material-ui/core/colors/orange';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  error: {
    backgroundColor: red[900],
  },
  warning: {
    backgroundColor: orange[800],
  },
}));

const SeverityButton = styled(Button)({
  borderRadius: 3,
  color: 'white',
  height: 48,
  border: '2px solid transparent',
  padding: '0 30px',
  '&:hover': {
    borderColor: 'white',
  },
});

const SeverityCounter = styled(Chip)({
  color: 'white',
});

const SeverityText = withStyles((theme) => ({
  root: {
    marginRight: theme.spacing(2),
  },
}))(Typography);

export default function Statistics() {
  const classes = useStyles();

  return (
    <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
      <SeverityButton>
        <SeverityText>ALL</SeverityText>
        <SeverityCounter className={classes.info} label="112" />
      </SeverityButton>
      <SeverityButton>
        <SeverityText>INFO</SeverityText>
        <SeverityCounter className={classes.info} label="96" />
      </SeverityButton>
      <SeverityButton>
        <SeverityText>WARNING</SeverityText>
        <SeverityCounter className={classes.warning} label="12" />
      </SeverityButton>
      <SeverityButton>
        <SeverityText>ERROR</SeverityText>
        <SeverityCounter className={classes.error} label="5" />
      </SeverityButton>
    </ButtonGroup>
  );
}
