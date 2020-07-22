import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Axios from "axios";
import ErrorSnack from "../../components/Message/Error";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
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
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function SignUp({history}) {
	const classes = useStyles();

	const { register, errors, handleSubmit } = useForm({
		mode: "onChange",
		reValidateMode: "onChange",
	});

	var baseURL = "http://localhost:1337/";

	const onSubmit = (data, e) => {
		e.preventDefault();
		const roleType = {
			_id: "5edea832bd12214a8551e4bb",
            name: "Authenticated",
            description: "Default role given to authenticated user.",
            type: "authenticated",
            id: "5edea832bd12214a8551e4bb"
		};
		data.role = roleType;
		data.username = data.username.toLowerCase();

		Axios.post(`${baseURL}users`, data)
			.then(function (response) {
				history.push('/login')
				alert('Check your E-Mail to confirm your account')
				// console.log(response);
			})
			.catch(function (error) {
				// console.log(error);
			});
	};

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Sign up
				</Typography>
				<form
					className={classes.form}
					noValidate
					onSubmit={handleSubmit(onSubmit)}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete='fname'
								name='firstName'
								variant='outlined'
								required
								fullWidth
								id='firstName'
								label='First Name'
								autoFocus
								inputRef={register({
									required: true,
								})}
								error={!!errors.firstName}
							/>
						</Grid>

						{errors.firstName &&
							errors.firstName.type === "required" && (
								<ErrorSnack message={"First name required"} />
							)}

						<Grid item xs={12} sm={6}>
							<TextField
								variant='outlined'
								required
								fullWidth
								id='lastName'
								label='Last Name'
								name='lastName'
								autoComplete='lname'
								inputRef={register({
									required: true,
								})}
								error={!!errors.lastName}
							/>
						</Grid>

						{errors.lastName &&
							errors.lastName.type === "required" && (
								<ErrorSnack message={"Last name required"} />
							)}

						<Grid item xs={12}>
							<TextField
								variant='outlined'
								required
								fullWidth
								id='username'
								label='User Name'
								name='username'
								autoComplete='username'
								inputRef={register({
									required: true,
									validate: async (value) =>
										await Axios.get(`${baseURL}users`)
											.then(function (response) {
												for (let i of response.data) {
													if (
														i.username.toLowerCase() ===
															value.toLowerCase() ||
														value.toLowerCase() ===
															"admin" ||
														value.toLowerCase() ===
															"administrator"
													)
														return false;
												}
											})
											.catch(function (error) {
												console.log(error);
											}),
								})}
								error={!!errors.username}
							/>
						</Grid>

						{errors.username &&
							errors.username.type === "required" && (
								<ErrorSnack message={"User name required"} />
							)}

						{errors.username &&
							errors.username.type === "validate" && (
								<ErrorSnack
									message={
										"Sorry! Username already taken by another user"
									}
								/>
							)}

						<Grid item xs={12}>
							<TextField
								variant='outlined'
								required
								fullWidth
								id='email'
								label='Email Address'
								name='email'
								autoComplete='email'
								inputRef={register({
									required: true,
									pattern: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
								})}
								error={!!errors.email}
							/>
						</Grid>

						{errors.email && errors.email.type === "required" && (
							<ErrorSnack message={"Email required"} />
						)}

						{errors.email && errors.email.type === "pattern" && (
							<ErrorSnack
								message={"Ooops! That is not a valid e-mail"}
							/>
						)}

						<Grid item xs={12}>
							<TextField
								variant='outlined'
								required
								fullWidth
								name='password'
								label='Password'
								type='password'
								id='password'
								autoComplete='current-password'
								inputRef={register({
									required: true,
									minLength: 8,
									pattern: /^(?=.*\d)(?=.*[a-z]*[A-Z])[\w~@#$%^&*+=`|{}:;!.?\"()\[\]-]{8,30}$/,
								})}
								error={!!errors.password}
							/>
						</Grid>

						{errors.password &&
							errors.password.type === "required" && (
								<ErrorSnack message={"Password required"} />
							)}

						{errors.password &&
							errors.password.type === "minLength" && (
								<ErrorSnack message={"Too short!"} />
							)}

						{errors.password &&
							errors.password.type === "pattern" && (
								<ErrorSnack
									message={
										"Letters and at least 1 number and Uppercase letter please! Special characters allowed"
									}
								/>
							)}
					</Grid>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}
						disabled={
							!!errors.email ||
							!!errors.password ||
							!!errors.firstName ||
							!!errors.lastName ||
							!!errors.username
						}>
						Sign Up
					</Button>
					<Grid container justify='flex-end'>
						<Grid item>
							<Link to='/login' variant='body2'>
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={5}></Box>
		</Container>
	);
}
