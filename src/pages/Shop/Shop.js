import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import ProductSkeleton from "../../components/Skeletons/ProductSkeleton";
import Categories from "../../components/Categories/Categories";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
		color: theme.palette.text.secondary,
	},
	search: {
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		"&:hover": {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing(3),
			width: "auto",
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "right",
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "20ch",
		},
	},
}));

export default function Shop() {
	const classes = useStyles();

	const [searchTerm, setSearchTerm] = React.useState("");
	const [searchValue, setSearchValue] = React.useState("");

	const handleChange = (event) => {
		setSearchValue(event.target.value);
	};

	const handleSearch = (event) => {
		setSearchTerm(searchValue);
		// console.log(searchTerm);
	};

	return (
		<div className={classes.root}>
			<Container maxWidth='xl'>
				<Grid container spacing={3}>
					<Grid item xs={4}>
						{/* <Paper className={classes.paper}>xs=12</Paper> */}
						<div className={classes.search}>
							<InputBase
								placeholder='Search…'
								classes={{
									root: classes.inputRoot,
									input: classes.inputInput,
								}}
								inputProps={{ "aria-label": "search" }}
								isFocused
								onChange={handleChange}
							/>
							<IconButton
								color='primary'
								aria-label='search'
								component='span'
								onClick={handleSearch}
								style={{
									float: "right",
									margin: "-0.4rem 0rem",
								}}
								disabled={!searchValue}>
								<SearchIcon />
							</IconButton>
						</div>
					</Grid>
					<Grid item xs={12} sm={9}>
						<Paper
							className={classes.paper}
							style={{ boxShadow: "none" }}>
							<CssBaseline />
							<ProductSkeleton searchTerm={searchTerm} />
						</Paper>
					</Grid>
					<Grid item xs={12} sm={3}>
						<Paper className={classes.paper}>
							<div>
								<h3>Categories</h3>
							</div>
							<Categories />
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
			</Container>
		</div>
	);
}
