import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Axios from "axios";

const useStyles = makeStyles({
	root: {
		width: "20rem",
		margin: "0 auto 0 17%",
	},
	bullet: {
		display: "inline-block",
		margin: "0 2px",
		transform: "scale(0.8)",
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
	loading: {
		display: "flex",
		"& > * + *": {
			marginLeft: "2rem",
		},
	},
});

const userReducer = (state, action) => {
	switch (action.type) {
		case "INIT_FETCH":
			return {
				...state,
				isLoading: true,
				isError: false,
			};
		case "USER_GET_SUCCESS":
			return {
				...state,
				data: action.payload,
				isLoading: false,
				isError: false,
			};
		case "USER_GET_FAILURE":
			return {
				...state,
				isLoading: false,
				isError: true,
			};
		default:
			throw new Error();
	}
};

export default function UserDetails() {
	const classes = useStyles();
	const bull = <span className={classes.bullet}>•</span>;

	const [user, dispatchUser] = React.useReducer(userReducer, {
		data: [],
		isLoading: false,
		isError: false,
	});

	const getUserData = React.useCallback(() => {
		const id = localStorage.getItem("id");
		if (!id) return;

		dispatchUser({ type: "INIT_FETCH" });

		Axios.get(`${process.env.REACT_APP_BASEURL}/users/${id}`)
			.then(function (response) {
				dispatchUser({
					type: "USER_GET_SUCCESS",
					payload: response.data,
				});
			})
			.catch(function (error) {
				dispatchUser({ type: "USER_GET_FAILURE" });
			});
	});

	React.useEffect(() => {
		getUserData();
	}, []);

	return (
		<>
			{user.isLoading ? (
				<>
					<div className={classes.loading}>
						<CircularProgress />
					</div>
				</>
			) : (
				<>
					<Card className={classes.root}>
						<CardContent>
							<Typography
								className={classes.title}
								color='textSecondary'
								gutterBottom>
								User Info
							</Typography>
							<Typography variant='h5' component='h2'>
								{user.data.firstName} {user.data.lastName}
							</Typography>
							<Typography
								className={classes.pos}
								color='textSecondary'>
								{user.data.username}
							</Typography>
							<Typography variant='body2' component='p'>
								{user.data.email}
							</Typography>
						</CardContent>
					</Card>
				</>
			)}
		</>
	);
}
