import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InfoIcon from '@material-ui/icons/Info';
import SpaIcon from '@material-ui/icons/Spa';
import { makeStyles, useTheme } from '@material-ui/core/styles';

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
    {['Tiny Collector', 'About'].map((text, index) => (
      <ListItem button key={text}>
        <ListItemIcon>{index % 2 === 0 ? <SpaIcon /> : <InfoIcon />}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    ))}
  </List>
  <Divider />
</Drawer>
  )
}

export default MenuDrawer;
