import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useDispatch, useSelector } from 'react-redux';

import {
  setDarkMode, setSeverityVisible,
} from '../features/settingsSlice';

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
  formRow: {
    padding: theme.spacing(1),
  },
}));

export default function Settings() {
  const [open, setOpen] = useState(false);
  const {
    isDarkMode,
    visibleSeverities,
  } = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  const classes = useStyles();

  const isInfosVisible = visibleSeverities.includes('INFO');
  const isWarningsVisible = visibleSeverities.includes('WARNING');
  const isErrorsVisible = visibleSeverities.includes('ERROR');

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const toggleDarkMode = () => {
    dispatch(setDarkMode(!isDarkMode));
  };

  const toggleInfosVisibility = () => {
    dispatch(setSeverityVisible({
      severity: 'INFO',
      shouldShow: !isInfosVisible,
    }));
  };

  const toggleWarningsVisibility = () => {
    dispatch(setSeverityVisible({
      severity: 'WARNING',
      shouldShow: !isWarningsVisible,
    }));
  };

  const toggleErrorsVisibility = () => {
    dispatch(setSeverityVisible({
      severity: 'ERROR',
      shouldShow: !isErrorsVisible,
    }));
  };

  return (
    <>
      <IconButton color="inherit" aria-label="settings" onClick={handleClickOpen}>
        <SettingsIcon />
      </IconButton>
      <Dialog onClose={handleClose} aria-labelledby="settings-dialog" open={open}>
        <DialogTitle>
          <Typography variant="h5">Settings</Typography>
          <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="h6">Appearence</Typography>
          <FormGroup aria-label="position">
            <FormControlLabel
              className={classes.formRow}
              value="start"
              control={<Switch checked={isDarkMode} onChange={toggleDarkMode} color="primary" />}
              label="Dark mode"
              labelPlacement="end"
            />
          </FormGroup>
        </DialogContent>
        <DialogContent dividers>
          <Typography variant="h6">Content</Typography>
          <FormGroup aria-label="position">
            <FormControlLabel
              value="start"
              className={classes.formRow}
              control={<Switch checked={isInfosVisible} onChange={toggleInfosVisibility} color="primary" />}
              label="Show infos"
              labelPlacement="end"
            />
            <FormControlLabel
              value="start"
              className={classes.formRow}
              control={<Switch checked={isErrorsVisible} onChange={toggleErrorsVisibility} color="primary" />}
              label="Show errors"
              labelPlacement="end"
            />
            <FormControlLabel
              value="start"
              className={classes.formRow}
              control={<Switch checked={isWarningsVisible} onChange={toggleWarningsVisibility} color="primary" />}
              label="Show warnings"
              labelPlacement="end"
            />
          </FormGroup>
        </DialogContent>
      </Dialog>
    </>
  );
}
