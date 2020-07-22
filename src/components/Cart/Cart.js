import React from "react";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const StyledBadge = withStyles((theme) => ({
	badge: {
		right: -3,
		top: 13,
		border: `2px solid ${theme.palette.background.paper}`,
		padding: "0 4px",
	},
}))(Badge);

export default function CartIcon({ count, onClick }) {
	return (
		<IconButton
			aria-label='cart'
			onClick={onClick}
			style={{ marginTop: "-0.5rem" }}>
			<StyledBadge badgeContent={count} color='secondary'>
				<ShoppingCartIcon />
			</StyledBadge>
		</IconButton>
	);
}
