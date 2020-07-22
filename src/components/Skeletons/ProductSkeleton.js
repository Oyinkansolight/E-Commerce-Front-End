import React from "react";
import Axios from "axios";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import AddButton from "../../components/Cart/AddButton";
import { CartContext } from "../Cart/CartContext";
import { Link } from "react-router-dom";
import ViewRating from "../../components/Rating/ViewRating";

var baseURL = "http://localhost:1337";

const productReducer = (state, action) => {
	switch (action.type) {
		case "START_FETCH_INIT":
			return {
				...state,
				isLoading: true,
				isError: false,
				cart: {
					cartItem: [{ 1: "one" }],
					totalAmount: 0,
					cartCount: 0,
				},
			};
		case "START_FETCH_SUCCESS":
			return {
				...state,
				isLoading: false,
				isError: false,
				limit: 100,
				data: action.payload,
			};
		case "START_FETCH_FAILURE":
			return {
				...state,
				isLoading: false,
				isError: true,
			};
		case "SORT_FETCH":
			return {
				...state,
				data: action.payload,
				isLoading: false,
				isError: false,
				limit: 100,
			};
		default:
			throw new Error();
	}
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

function Media() {
	const [products, dispatchProducts] = React.useReducer(productReducer, {
		data: [],
		isLoading: false,
		isError: false,
		limit: 100,
		cart: {
			cartItem: [],
			totalAmount: 0,
			cartCount: 0,
		},
	});

	const [cart, dispatchCart] = React.useContext(CartContext);

	React.useEffect(() => {
		dispatchProducts({ type: "START_FETCH_INIT" });

		Axios.get(`${baseURL}/products?_limit=${products.limit}`)
			.then(function (response) {
				setTimeout(
					() =>
						dispatchProducts({
							type: "START_FETCH_SUCCESS",
							payload: response.data,
						}),
					1500
				);
			})
			.catch(() => dispatchProducts({ type: "START_FETCH_FAILURE" }));
	}, [products.limit]);

	const handleAddToCart = (item) => {
		dispatchCart({ type: "ADD_TO_CART", payload: item });
	};

	const classes = useStyles();

	return (
		<Grid container>
			{products.isError && (
				<h2>An error occured while fetching products</h2>
			)}

			{(products.isLoading ? Array.from([]) : products.data).map(
				(item, index) => (
					<Grid item xs style={{ flexGrow: 0.25 }} key={item.key}>
						<Paper
							className={classes.paper}
							style={{ boxShadow: "none" }}>
							<Box
								key={item._id}
								width={310}
								marginRight={0.3}
								my={5}>
								{item ? (
									<Link to={`/shop/${item.id}`}>
										<img
											style={{ width: 310, height: 200 }}
											alt={item.displayImg.name}
											loading='lazy'
											src={`${baseURL}${item.displayImg.formats.small.url}`} //Preferably small (Better Quality) thumbnail alternative
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
									<Box pr={2}>
										<Link to={`/shop/${item.id}`}>
											<Typography
												gutterBottom
												variant='body3'>
												{item.name}
											</Typography>
											<Typography
												display='block'
												variant='caption'
												style={{ color: "black" }}
												// color="textSecondary"
											>
												<strong>{`$ ${item.price}`}</strong>
											</Typography>
											<ViewRating />
										</Link>

										<AddButton
											item={item}
											updateCart={handleAddToCart}
											id={item.id}
										/>
									</Box>
								) : (
									<Box pt={0.5}>
										<Skeleton />
										<Skeleton width='60%' />
									</Box>
								)}
							</Box>
						</Paper>
					</Grid>
				)
			)}
		</Grid>
	);
}

Media.propTypes = {
	loading: PropTypes.bool,
};

export default function ProductSkeleton() {
	return (
		<Box overflow='hidden'>
			<Media />
		</Box>
	);
}
