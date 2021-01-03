import LocalFlorist from "@material-ui/icons/LocalFlorist";
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Badge from '@material-ui/core/Badge';

import { makeStyles, createMuiTheme, withStyles } from '@material-ui/core/styles';

  const Inventory = ( data ) =>{
    let { flowerHues, items, setItems } = data;

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


    //The purpose of the Wrapper function is to ensure that
    // the element is only wrapped if the condition is met.
    // We only want the quantity badge to appear if the
    // quantity is greater than 1.
    const Wrapper = ({ children, condition, wrapper }) =>
condition ? wrapper(children) : children;

    return (
      <Container maxWidth="sm" style={{ paddingTop: "1em"}}>
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
             <Grid container justify="center" spacing={1}>
               {items.map((value, index) => {
                 return(
                 <Grid key={index} item>
                 <Wrapper
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
                      </Wrapper>

                 </Grid>
               )})}
             </Grid>
          </Grid>
        </Grid>
      </Container>
    )
  };

  export default Inventory;
