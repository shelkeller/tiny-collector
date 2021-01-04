import LocalFlorist from "@material-ui/icons/LocalFlorist";
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Badge from '@material-ui/core/Badge';

import { makeStyles, createMuiTheme, withStyles } from '@material-ui/core/styles';
/*
  TODO:
  sort items before displaying.
  
  This component displays a row of colored squares
  aligning with an inventory array
  which is expected to contain one object per
  color present and a quantity.

  Inventory item: { flowerColor<int>, colorName<string>, quantity<int> }
  We want to display nothing if quantity is 0
  an Avatar without a Badge if quantity is 1
  and an Avatar with a Badge if quantity is 0
*/
  const Inventory = ( props ) =>{
    let { flowerHues, items, setItems } = props;

    const useStyles = makeStyles((theme) => ({
       root: {
         flexGrow: 1
       },
       paper: {
         height: 50,
         width: 50
       }
     }));

     const StyledBadge = withStyles((theme) => ({
         badge: {
           top: 35,
           right: 5,
           border: `2px solid ${theme.palette.background.paper}`,
           padding: '0 4px',
         },
       }))(Badge);

    const classes = useStyles();


/*
  This is a conditional wrapper to avoid duplicate code -
  I didn't want to make a whole new component to render for
  when I don't want to display a badge.
*/
    const OnlyWrapIf = ({ children, condition, wrapper }) =>
condition ? wrapper(children) : children;

    return (
      <Container maxWidth="sm" style={{ paddingTop: "1em"}}>
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
             <Grid container justify="center" spacing={1}>
               {items.map((value, index) => {
                 return(
                 <Grid key={index} item>
                 <OnlyWrapIf
                    condition={ value.quantity >1 }
                    wrapper={children =>
                        <StyledBadge
                        color="primary"
                        badgeContent={value.quantity}
                        >{children}
                        </StyledBadge>
                    }>
                     <Avatar component={Paper} style={{backgroundColor: flowerHues[value.flowerColor], color: "white"}}elevation={1} variant="rounded">
                         <LocalFlorist />
                       </Avatar>
                      </OnlyWrapIf>

                 </Grid>
               )})}
             </Grid>
          </Grid>
        </Grid>
      </Container>
    )
  };

  export default Inventory;
