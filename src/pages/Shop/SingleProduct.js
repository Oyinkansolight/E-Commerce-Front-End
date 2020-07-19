import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ProductImage from "../../components/SingleProduct/Image";
import AddButton from "../../components/Cart/AddButton";
import { CartContext } from "../../components/Cart/CartContext";
import LinearIndeterminate from "../../components/Loading/LinearProgress";
import ViewRating from "../../components/Rating/ViewRating";

import Axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
    },
}));

var baseURL = "http://localhost:1337";

const SingleProduct = ({ match }) => {
    const classes = useStyles();

    const [isLoading, setIsLoading] = React.useState(true);
    const [data, setData] = React.useState([]);
    const [cart, dispatchCart] = React.useContext(CartContext);

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await Axios.get(
                `${baseURL}/products?id=${match.params.id}`
            );

            setData(result.data[0]);
            setIsLoading(false);
        };
        fetchData();
    }, []);


    const handleAddToCart = (item) => {
        dispatchCart({type: "ADD_TO_CART", payload: item})
    };

    return (
        <>
            <CssBaseline />
            <Container maxWidth="xl">
                {!isLoading ? (
                    <div className={classes.root}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <Paper
                                    className={classes.paper}
                                    style={{ boxShadow: "none" }}
                                >
                                    {!data ? (
                                        "Image Loading"
                                    ) : (
                                        <ProductImage image={data} />
                                    )}
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Paper
                                    className={classes.paper}
                                    style={{ boxShadow: "none" }}
                                >
                                    <h3>Procuct Details</h3>
                                    <p style={{ textAlign: "justify" }}>
                                        {data.shortDescription}
                                    </p>

                                    <div>Rating: <ViewRating /> </div>

                                    <AddButton
                                        item={data}
                                        updateCart={handleAddToCart}
                                        id={match.params.id}
                                    />
                                </Paper>
                            </Grid>

                            <Grid item xs={12}>
                                <Paper
                                    className={classes.paper}
                                    style={{ boxShadow: "none" }}
                                >
                                    <h3>Full Description</h3>
                                    <p style={{ textAlign: "justify" }}>
                                        {data.description}
                                    </p>
                                </Paper>
                            </Grid>
                            {/* <Grid item xs={6} sm={3}>
                            <Paper className={classes.paper}>xs=6 sm=3</Paper>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Paper className={classes.paper}>xs=6 sm=3</Paper>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Paper className={classes.paper}>xs=6 sm=3</Paper>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Paper className={classes.paper}>xs=6 sm=3</Paper>
                        </Grid> */}
                        </Grid>
                    </div>
                ) : (
                    <div style={{ margin: "20% auto" }}>
                        <LinearIndeterminate />
                    </div>
                )}
            </Container>
        </>
    );
};

export default SingleProduct;
