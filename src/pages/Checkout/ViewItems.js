import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { CartContext } from "../../components/Cart/CartContext"


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
    margin: "0% 0% 0% 40%"
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
}));

var baseURL = "http://localhost:1337";

export default function ViewItems() {
  const classes = useStyles();
  const [cart, dispatchCart] = React.useContext(CartContext)

  return (
    <List className={classes.root} subheader={<li />}>
        {/* <li key={`section-${item.id}`} className={classes.listSection}> */}
          {/* <ul className={classes.ul}> */}
            {/* <ListSubheader>{`${item.id}`}</ListSubheader> */}
            {cart.currentCart.map((item) => (
              <>
              <ListItem key={item.id}>
                    <Avatar
                        style={{marginRight: "0.5rem"}}
                        alt={item.name}
                        src={`${baseURL}${item.displayImg.formats.thumbnail.url}`}
                    />
                <ListItemText primary={`${item.name}`} /> <span>${item.price * item.quantity}</span>
              </ListItem>
              <hr />
              </>
            ))}
          {/* </ul> */}
        {/* </li> */}
    </List>
  );
}
