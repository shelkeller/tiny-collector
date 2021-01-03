import CancelIcon from '@material-ui/icons/Cancel';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { red, blue } from '@material-ui/core/colors';


const useStyles = makeStyles({
  red: {
    backgroundColor: red[100],
    color: red[600],
  },
  blue: {
    backgroundColor: blue[100],
    color: blue[600]
  }
});

const OptionsDialog = props => {

  let { onClose, title, selectedValue, selectedPlot, open } = props;


  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value, selectedPlot);
  };

  let classes = useStyles();


  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} maxWidth={true}>
        <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
        <List>
          <ListItem button onClick={() => handleListItemClick('gather')}>
            <ListItemAvatar>
              <Avatar className={classes.blue}>
                <LibraryAddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Gather" />
          </ListItem>

          <ListItem button onClick={() => handleListItemClick('delete')}>
            <ListItemAvatar>
              <Avatar className={classes.red}>
                <DeleteForeverIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Delete" />
          </ListItem>
        </List>
        <DialogActions>
         <Button onClick={handleClose} color="primary">
          <CancelIcon />
         </Button>
       </DialogActions>
      </Dialog>
  )
}
export default OptionsDialog;
