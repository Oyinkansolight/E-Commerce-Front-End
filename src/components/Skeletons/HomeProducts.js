import React from "react";
import Axios from "axios";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const usePersistentData = (props) => {
	let { loading = false } = props;

	const [data, setData] = React.useState([]);

	React.useEffect(() => {
		Axios.get(`${process.env.REACT_APP_BASEURL}/products?_limit=4`)
			.then(function (response) {
				setData(response.data);
				// console.log(response.data)
			})
			.catch(function (error) {
				console.log(error);
			});
	}, []);

	return [data, setData, loading];
};

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(0),
		textAlign: "center",
		color: theme.palette.text.secondary,
	},
}));

function Media(props) {
	// const { loading = false } = props;
	const [data, setData, loading = true, limit] = usePersistentData(props);
	const classes = useStyles();

	return (
		<Grid container>
			{(loading ? Array.from([]) : data).map((item, index) => (
				<Grid item xs style={{ flexGrow: 0.25 }}>
					<Paper
						className={classes.paper}
						style={{ boxShadow: "none" }}>
						<Box key={index} width={310} marginRight={0.5} my={5}>
							{item ? (
								<Link to={`/shop/${item.id}`}>
									<img
										style={{ width: 310, height: 200 }}
										alt={item.displayImg.name}
										loading='lazy'
										src={`${process.env.REACT_APP_BASEURL}${item.displayImg.formats.small.url}`}
									/>
								</Link>
							) : (
								<Skeleton
									variant='rect'
									width={310}
									height={118}
								/>
							)}

							{item ? (
								<Link to={`/shop/${item.id}`}>
									<Box pr={2}>
										<Typography
											gutterBottom
											variant='body2'>
											{item.name}
										</Typography>
										<Typography
											display='block'
											variant='caption'
											color='textSecondary'>
											<strong>{`$ ${item.price}`}</strong>
										</Typography>
										<Typography
											variant='caption'
											color='textSecondary'>
											{`${item.user.username}•`}
										</Typography>
									</Box>
								</Link>
							) : (
								<Box pt={0.5}>
									<Skeleton />
									<Skeleton width='60%' />
								</Box>
							)}
						</Box>
					</Paper>
				</Grid>
			))}
		</Grid>
	);
}

Media.propTypes = {
	loading: PropTypes.bool,
};

export default function ProductSkeleton({ limitValue }) {
	return (
		<Box overflow='hidden'>
			{/* <Media loading /> */}
			{/* <HomeProducts products={ } /> */}
			<Media limit={limitValue} />
		</Box>
	);
}
