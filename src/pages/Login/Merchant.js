import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";
import { useForm } from "react-hook-form";
import ErrorSnack from "../../components/Message/Error";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="/">
                MarketSquare
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2, 0, 0, 0),
        height: "100vh",
    },
    image: {
        backgroundImage: "url(https://source.unsplash.com/random)",
        backgroundRepeat: "no-repeat",
        backgroundColor:
            theme.palette.type === "light"
                ? theme.palette.grey[50]
                : theme.palette.grey[900],
        backgroundSize: "cover",
        backgroundPosition: "center",
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


export default function MerchantLogin() {
    const classes = useStyles();

    const { register, errors, handleSubmit, control, getValues } = useForm({
        mode: "onChange",
        reValidateMode: "onChange",
    });

    const onSubmit = (data, e) => {
        e.preventDefault();
        // let loginData = new FormData();

        // loginData.append("identifier", data.email);
        // loginData.append("password", data.password);

        Axios.post(`${process.env.REACT_APP_BASEURL}/auth/local`, data)
            .then(function (response) {
                // console.log(response);
                window.location = `${process.env.REACT_APP_FRONT_END}/merchant`;
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <>
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7} className={classes.image} />
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    component={Paper}
                    elevation={6}
                    square
                >
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form
                            className={classes.form}
                            noValidate
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="identifier"
                                autoComplete="email"
                                autoFocus
                                inputRef={register({
                                    required: true,
                                    pattern: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
                                })}
                                error={!!errors.identifier}
                            />
                            {errors.identifier &&
                                errors.identifier.type === "pattern" && (
                                    <ErrorSnack
                                        message={"Valid Email required"}
                                    />
                                )}
                            {errors.identifier &&
                                errors.identifier.type === "required" && (
                                    <ErrorSnack message={"Email required"} />
                                )}

                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                inputRef={register({
                                    required: true,
                                    minLength: 8,
                                })}
                                error={!!errors.password}
                            />
                            {errors.password &&
                                errors.password.type === "required" && (
                                    <ErrorSnack message={"Password required"} />
                                )}
                            {errors.password &&
                                errors.password.type === "minLength" && (
                                    <ErrorSnack
                                        message={
                                            "Password minimum length is 8 characters"
                                        }
                                    />
                                )}

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="remember"
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                disabled={!!errors.email || !!errors.password}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Box mt={5}>
                                <Copyright />
                            </Box>
                        </form>
                    </div>
                </Grid>
            </Grid>
        </>
    );
}
