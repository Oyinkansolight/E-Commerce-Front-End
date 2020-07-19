import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { CartContext } from "../Cart/CartContext";


const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        maxWidth: "36ch",
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: "inline",
    },
}));

var baseURL = "http://localhost:1337";

export default function CartList() {
    const classes = useStyles();

    const [cart, dispatchCart] = React.useContext(CartContext);

    const handleRemoveItem = (item) => {
        dispatchCart({type: "REMOVE_FROM_CART", payload: item})
    };

    return (
        <List className={classes.root}>
            {cart.cartCount < 1 ? (
                <ListItem alignItems="flex-start">
                    <ListItemText
                        primary="Your cart is empty"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                    {/* {item.name} */}
                                </Typography>
                                {/* {item.price} */}
                            </React.Fragment>
                        }
                    />
                </ListItem>
            ) : (
                cart.currentCart.map((item) => (
                    <ListItem alignItems="flex-start" key={item.id}>
                        <ListItemAvatar>
                            <Avatar
                                alt="Remy Sharp"
                                src={`${baseURL}${item.displayImg.formats.thumbnail.url}`}
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={item.name}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                        ${item.price}
                                    </Typography>
                                </React.Fragment>
                            }
                        />

                        <DeleteIcon
                            onClick={() => handleRemoveItem(item)}
                            color="secondary"
                        />
                        <Divider variant="inset" component="li" />
                    </ListItem>
                ))
            )}

            {cart.cartCount > 0 && <ListItemText primary={`Total :$${cart.totalPrice}`} />}
            <br />

            {cart.cartCount && 
                <Link to="/cart" stye={{ textDecoration: "none" }}>
                    <Button color="primary">Open Cart</Button>
                </Link>
            }
            
        </List>
    );
}
