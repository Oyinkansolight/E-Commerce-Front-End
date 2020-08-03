import React from "react";
import Axios from "axios";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
}));

function Animations() {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			{/* <Skeleton /> */}
			{/* <Skeleton animation={false} /> */}
			<Skeleton animation='wave' height={40} />
		</div>
	);
}

export default function Categories() {
	const [categories, setCategories] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(false);

	React.useEffect(() => {
		setIsLoading(true);

		Axios.get(`${process.env.REACT_APP_BASEURL}/categories`)
			.then(function (response) {
				setTimeout(() => setCategories(response.data), 1500);
				setIsLoading(false);
			})
			.catch(function (error) {
				console.log(error);
			});
	}, []);

	function ListItemLink(props) {
		return <ListItem button component='a' {...props} />;
	}

	const AllCategories = () => (
		<>
			{!isLoading ? (
				categories.map((category) => (
					<>
						<ListItemLink key={category.id}>
							<ListItemText
								key={category.id}
								primary={`${category.name}`}
							/>
						</ListItemLink>
						<Divider key='divider' />
					</>
				))
			) : (
				<>
					<Animations />
					<Animations />
					<Animations />
					<Animations />
					<Animations />
					<Animations />
				</>
			)}
		</>
	);

	const classes = useStyles();
	return (
		<div className={classes.root}>
			<List component='nav' aria-label='secondary mailbox folders'>
				<AllCategories />
			</List>
		</div>
	);
}
