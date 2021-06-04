import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useDispatch, useSelector } from 'react-redux';
import {
  setDarkMode, setInfosVisibility, setWarningsVisibility, setErrorsVisibility,
} from '../features/settingsSlice';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const {
    children, classes, onClose,
  } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h5">{children}</Typography>
      <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  formLine: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export default function Settings() {
  const [open, setOpen] = useState(false);
  const {
    isDarkMode,
    infosVisible,
    warningsVisible,
    errorsVisible,
  } = useSelector((state) => state.settings);
  const dispatch = useDispatch();

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
    dispatch(setInfosVisibility(!infosVisible));
  };

  const toggleWarningsVisibility = () => {
    dispatch(setWarningsVisibility(!warningsVisible));
  };

  const toggleErrorsVisibility = () => {
    dispatch(setErrorsVisibility(!errorsVisible));
  };

  return (
    <div>
      <IconButton color="inherit" aria-label="settings" onClick={handleClickOpen}>
        <SettingsIcon />
      </IconButton>
      <Dialog onClose={handleClose} aria-labelledby="settings-dialog" open={open}>
        <DialogTitle id="settings-dialog-title" onClose={handleClose}>
          Settings
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="h6">Appearence</Typography>
          <FormGroup aria-label="position">
            <FormControlLabel
              value="start"
              control={<Switch checked={isDarkMode} onChange={toggleDarkMode} color="primary" />}
              label="Dark mode"
              labelPlacement="start"
            />
          </FormGroup>
        </DialogContent>
        <DialogContent dividers>
          <Typography variant="h6">Content</Typography>
          <FormGroup aria-label="position">
            <FormControlLabel
              value="start"
              control={<Switch checked={infosVisible} onChange={toggleInfosVisibility} color="primary" />}
              label="Show infos"
              labelPlacement="start"
            />
            <FormControlLabel
              value="start"
              control={<Switch checked={errorsVisible} onChange={toggleErrorsVisibility} color="primary" />}
              label="Show errors"
              labelPlacement="start"
            />
            <FormControlLabel
              value="start"
              control={<Switch checked={warningsVisible} onChange={toggleWarningsVisibility} color="primary" />}
              label="Show warnings"
              labelPlacement="start"
            />
          </FormGroup>
        </DialogContent>
      </Dialog>
    </div>
  );
}
