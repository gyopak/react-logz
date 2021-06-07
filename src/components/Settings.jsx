import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';
import MuiSwitch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useDispatch, useSelector } from 'react-redux';

import {
  setDarkMode, setSeverityVisible,
} from '../features/settingsSlice';

import {
  setCacheSize,
  reset,
} from '../features/logCacheSlice';

const Switch = withStyles((theme) => ({
  root: {
    marginRight: theme.spacing(3),
  },
}))(MuiSwitch);

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
  tabs: {
    display: 'flex',
  },
  dropdown: {
    margin: `0 ${theme.spacing(2)}px`,
  },
  button: {
    margin: `${theme.spacing(1)}px 0`,
  },
  formRow: {
    paddingTop: theme.spacing(1),
  },
  control: {
    marginTop: theme.spacing(1),
  },
}));

export default function Settings() {
  const [open, setOpen] = useState(false);
  const {
    isDarkMode,
    visibleSeverities,
  } = useSelector((state) => state.settings);
  const {
    cacheSize,
  } = useSelector((state) => state.logCache);
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

  const changeCacheSize = (e) => {
    dispatch(setCacheSize(e.target.value));
  };

  const requestReset = () => {
    dispatch(reset());
    handleClose();
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
        <div className={classes.tabs}>
          <div className={classes.leftTab}>
            <DialogContent>
              <Typography variant="h6">Tweaks</Typography>
              <FormGroup aria-label="position">
                <FormControlLabel
                  className={classes.formRow}
                  value="start"
                  control={<Switch checked={isDarkMode} onChange={toggleDarkMode} color="primary" />}
                  label="Dark mode"
                  labelPlacement="end"
                />
              </FormGroup>
              <FormControl>
                <FormControlLabel
                  className={classes.formRow}
                  value="start"
                  control={(
                    <Select
                      className={classes.dropdown}
                      value={cacheSize}
                      onChange={changeCacheSize}
                    >
                      <MenuItem value={100}>100</MenuItem>
                      <MenuItem value={200}>200</MenuItem>
                      <MenuItem value={999}>999</MenuItem>
                    </Select>
)}
                  label="Cache size"
                  labelPlacement="end"
                />
              </FormControl>
              <FormGroup className={classes.button} aria-label="position">
                <Button variant="outlined" color="secondary" className={classes.control} onClick={requestReset}>
                  Reset
                </Button>
              </FormGroup>
            </DialogContent>
          </div>
          <div className={classes.rightTab}>
            <DialogContent>
              <Typography variant="h6">Filters</Typography>
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
          </div>
        </div>
      </Dialog>
    </>
  );
}
