import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Axios from 'axios';
import DeleteModal from './DeleteModal'

const useStyles = makeStyles({
    root: {
        maxWidth: 245,
        margin: "0 0 0 2%",
        float: "left",
    },
});

var baseURL = "http://localhost:1337";
export default function MerchantProducts() {
    const classes = useStyles();

    const LimitDesc = ({ str }) => `${str.slice(0, 40)}.....`;

    const [products, setProducts] = React.useState([]);

    React.useEffect(() => {
        Axios.get('http://localhost:1337/products', {
            headers: {
                Authorization:
                `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then(function (response) {
            // console.log(response.data);
            setProducts(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });
    }, [])

    return (
        <>
            <div style={{ marginLeft: "10%" }}>
            <CssBaseline />
            <Container maxWidth="xl">
            
            <Grid container spacing={3}>

            {products.map(product => {
                if (product.user.email === localStorage.getItem('email')) {
                    return (
                        <Grid item xs={12} sm={6} md={3}>
                            <Card className={classes.root}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        alt="Contemplative Reptile"
                                        height="140"
                                        image={`${baseURL}${product.displayImg.formats.thumbnail.url}`}
                                        title="Contemplative Reptile"
                                    />
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            component="h2"
                                        >
                                            {product.name}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            component="p"
                                        >
                                            <LimitDesc
                                                str={product.shortDescription}
                                            />
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        Edit
                                    </Button>
                                    <DeleteModal />
                                </CardActions>
                            </Card>
                        </Grid>
                    )
                }
            }   
            )}

            </Grid>
            </Container>
            </div>
        </>
    );
}
