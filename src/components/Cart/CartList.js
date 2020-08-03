import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { CartContext } from "../Cart/CartContext";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		maxWidth: "36ch",
		backgroundColor: theme.palette.background.paper,
	},
	inline: {
		display: "inline",
	},
}));

var baseURL = "http://localhost:1337";

export default function CartList() {
	const classes = useStyles();

	const [cart, dispatchCart] = React.useContext(CartContext);

	const handleRemoveItem = (item) => {
		dispatchCart({ type: "REMOVE_FROM_CART", payload: item });
	};

	return (
		<List className={classes.root}>
			{cart.cartCount < 1 ? (
				<ListItem alignItems='flex-start'>
					<ListItemText
						primary='Your cart is empty'
						style={{ height: "0" }}
					/>
				</ListItem>
			) : (
				cart.currentCart.map((item) => (
					<>
						<ListItem alignItems='flex-start' key={item.id}>
							<ListItemAvatar>
								<Avatar
									alt='cart image'
									src={`${baseURL}${item.displayImg.formats.thumbnail.url}`}
								/>
							</ListItemAvatar>
							<ListItemText
								style={{ width: "10rem" }}
								primary={
									<>
										<p
											style={{
												width: "10rem",
												height: "0.5rem",
												marginTop: "0rem",
											}}>
											{item.name}
										</p>
									</>
								}
								secondary={
									<React.Fragment>
										<Typography
											component='span'
											variant='body2'
											className={classes.inline}
											color='textPrimary'>
											<span
												style={{ marginLeft: "6rem" }}>
												${item.price}
											</span>
										</Typography>
									</React.Fragment>
								}
							/>

							<DeleteIcon
								style={{
									marginLeft: "10rem",
									width: "1.1rem",
									marginTop: "0.3rem",
								}}
								onClick={() => handleRemoveItem(item)}
								color='secondary'
							/>
						</ListItem>

						<Divider
							key="divider"
							variant='inset'
							component='li'
							style={{ marginLeft: "22px", marginRight: "22px" }}
						/>
					</>
				))
			)}

			{!cart.cartCount < 1 ? (
				<ListItemText
					primary={`Total :$${cart.totalPrice}`}
					style={{ float: "right", margin: "1% 7% 0 0" }}
				/>
			) : (
				""
			)}
			<br />

			{!cart.cartCount < 1 ? (
				<Link to='/cart' stye={{ textDecoration: "none" }}>
					<Button color='primary'>Open Cart</Button>
				</Link>
			) : (
				""
			)}
		</List>
	);
}
