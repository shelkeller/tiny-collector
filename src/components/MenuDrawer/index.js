import { makeStyles, useTheme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import InfoIcon from '@material-ui/icons/Info';
import SpaIcon from '@material-ui/icons/Spa';

import {
  Link
} from "react-router-dom";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-start',
    }
}));

const MenuDrawer = props => {
let { open, setOpen } = props;

 const handleDrawerOpen = () => {
   setOpen(true);
 };

 const handleDrawerClose = () => {
   setOpen(false);
 };

 const theme = useTheme();
 const classes = useStyles();
 const linkStyle = { color: "#666", textDecoration: "none"};
  return (
    <Drawer
  className={classes.drawer}
  variant="persistent"
  anchor="right"
  open={open}
  classes={{
    paper: classes.drawerPaper,
  }}
>
  <div className={classes.drawerHeader}>
    <IconButton onClick={handleDrawerClose}>
      {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
    </IconButton>
  </div>
  <Divider />
  <List>
  <Link style={linkStyle} to="/tiny-collector">
    <ListItem onClick={handleDrawerClose}>
      <ListItemIcon><SpaIcon /></ListItemIcon>
      <ListItemText>Tiny Collector</ListItemText>
    </ListItem>
  </Link>
  <Link style={linkStyle}  to="/about">
    <ListItem onClick={handleDrawerClose}>
      <ListItemIcon><InfoIcon /></ListItemIcon>
      <ListItemText>About</ListItemText>
    </ListItem>
    </Link>
  </List>
  <Divider />
</Drawer>
  )
}

export default MenuDrawer;
