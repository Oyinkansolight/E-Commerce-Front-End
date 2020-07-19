import React from "react";
import {
    createMuiTheme,
    withStyles,
    makeStyles,
    ThemeProvider,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { green, purple, blue } from "@material-ui/core/colors";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(blue[700]),
        backgroundColor: blue[700],
        "&:hover": {
            backgroundColor: blue[900],
        },
    },
}))(Button);

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

export default function AddButton({ item, updateCart, id }) {
    const classes = useStyles();

    return (
        <div>
            <ColorButton
                variant="contained"
                color="primary"
                id={id}
                className={classes.margin}
                style={{ width: "100%" }}
                onClick={() => updateCart(item)}
            >
            <AddShoppingCartIcon style={{width: "1rem"}} />
                Add to Cart
            </ColorButton>
        </div>
    );
}
