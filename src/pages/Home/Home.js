import React from "react";
import Slider from "../../components/Slider/Slider";
// import HomeProducts from "../../components/Grids/HomeProducts_old";
import Banner from "../../components/Grids/Banner";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import CategoryBanner from "../../components/Grids/CategoryBanner";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import HomeProducts from "../../components/Skeletons/HomeProducts";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 0.25,
	},
	paper: {
		padding: theme.spacing(0),
		textAlign: "center",
		color: theme.palette.text.secondary,
	},
}));

function Home() {
	const classes = useStyles();

	return (
		<>
			<Slider />
			<Container maxWidth='xl'>
				<CssBaseline />
				<div className={classes.root}>
					<Grid container spacing={1}>
						<Grid item xs={12}>
							<Paper
								className={classes.paper}
								style={{ boxShadow: "none" }}>
								<HomeProducts />
							</Paper>
						</Grid>
					</Grid>
				</div>
			</Container>

			{/* <HomeProducts /> */}

			{/* <CategoryBanner />

			<Banner /> */}
		</>
	);
}

export default Home;
