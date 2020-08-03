import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import Axios from "axios";
import formatISO from 'date-fns/formatISO'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: 752,
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        margin: theme.spacing("0, auto"),
    },
}));


export default function UserOrders() {
    const classes = useStyles();
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);
    const [orders, setOrders] = React.useState([]);

    React.useEffect(() => {
        Axios.get(`${process.env.REACT_APP_BASEURL}/orders`, {
            headers: {
                Authorization:
                `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then(function (response) {
            // console.log(response.data);
            setOrders(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });
    }, [])

    return (
        <div className={classes.root} style={{ margin: "0 auto" }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} style={{ margin: "0 auto" }}>
                    <Typography variant="h6" className={classes.title}>
                        Your Pending Orders
                    </Typography>
                    <div className={classes.demo}>
                        <List dense={dense}>
                            {orders.filter((order) => order.complete  === false && order.email === localStorage.getItem('email')).map(order => 
                               <span>
                                    {order.products.map(item => 
                                        <ListItem key={item.id}>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <LocalShippingIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={secondary ? 'You have no orders' : `${item.name} ${order.delivering ? '(Delivering)' : '(Pending)'}`}
                                                secondary={
                                                    secondary ? null : `$${item.price}, ${formatISO(new Date(`${item.createdAt}`), { format: 'extended', representation: 'date' })}`
                                                }
                                            />
                                        </ListItem>
                                    )}
                               </span>     
                            )}
                        </List>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}
