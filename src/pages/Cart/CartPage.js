import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Axios from "axios";
import ColorAlerts from "../../components/Message/Toast";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import { CartContext } from "../../components/Cart/CartContext";

const TAX_RATE = 0.07;

const useStyles = makeStyles({
	table: {
		minWidth: 700,
	},
	root: {
		width: "100%",
		maxWidth: 500,
	},
	cont: {
		marginTop: "2%",
	},
});

function ccyFormat(num) {
	return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
	return qty * unit;
}

function createRow(desc, qty, unit) {
	const price = priceRow(qty, unit);
	return { desc, qty, unit, price };
}

function subtotal(items) {
	return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

var msg, sev;

const checkQty = (msg, sev) => (
	<ColorAlerts severity={sev} color={sev} Text={msg} />
);

// const invoiceSubtotal = subtotal(rows);
// const invoiceTaxes = TAX_RATE * invoiceSubtotal;
// const invoiceTotal = invoiceTaxes + invoiceSubtotal;

export default function CartPage({ history }) {
	const classes = useStyles();
	const [cart, dispatchCart] = React.useContext(CartContext);
	const [controlQty, setControlQty] = React.useState(false);

	// setControlQty(true)
	// msg=`Please reduce the items of ${item[0].name}`
	// sev="info"

	return (
		<>
			<TableContainer component={Paper} className={classes.cont}>
				{controlQty ? checkQty(msg, sev) : <span> </span>}
				{cart.currentCart.length > 0 ? (
					<Table
						className={classes.table}
						aria-label='spanning table'>
						<TableHead>
							<TableRow>
								<TableCell align='center' colSpan={3}>
									Details
								</TableCell>
								<TableCell align='right'>Price</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Name</TableCell>
								<TableCell align='center'>Qty.</TableCell>
								<TableCell align='right'>Unit Price</TableCell>
								<TableCell align='right'>Sum</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{cart.currentCart.map((row) => (
								<TableRow key={row.id}>
									<TableCell>
										<ListItemAvatar>
											<Avatar
												alt={row.name}
												src={`${process.env.REACT_APP_BASEURL}${row.displayImg.formats.thumbnail.url}`}
											/>
										</ListItemAvatar>
										{row.name}
									</TableCell>
									<TableCell align='center'>
										<span align='right'>
											{/* <IconButton aria-label="remove">
                                            <RemoveIcon />
                                        </IconButton> */}

											<ButtonGroup
												size='small'
												disableElevation
												variant='contained'
												color='default'>
												<Button
													onClick={() => {
														setControlQty(false);
														dispatchCart({
															type: "SUB_QTY",
															payload: row,
														});
													}}>
													<RemoveIcon />
												</Button>

												<Button
													disabled={controlQty}
													onClick={() => {
														// console.log(
														// 	cart.totalPrice
														// );
														if (
															row.quantity ===
															row.qty - 1
														) {
															setControlQty(true);
															msg = `Please reduce the items of ${row.name}`;
															sev = "info";
														} else {
															setControlQty(
																false
															);
														}

														dispatchCart({
															type: "ADD_QTY",
															payload: row,
														});
													}}>
													<AddIcon />
												</Button>
											</ButtonGroup>

											<span>{row.quantity}</span>

											{/* <IconButton aria-label="add">
                                            <AddIcon />
                                        </IconButton> */}
										</span>
									</TableCell>
									<TableCell align='right'>
										{row.price}
									</TableCell>
									<TableCell align='right'>
										{ccyFormat(row.price * row.quantity)}
									</TableCell>
								</TableRow>
							))}

							{/* <TableRow>
                                <TableCell rowSpan={3} />
                                <TableCell colSpan={2}>Subtotal</TableCell>
                                <TableCell align="right">
                                    {ccyFormat(invoiceSubtotal)}
                                </TableCell>
                            </TableRow> */}
							{/* <TableRow>
                                <TableCell>Tax</TableCell>
                                <TableCell align="right">{`${(
                                    TAX_RATE * 100
                                ).toFixed(0)} %`}</TableCell>
                                <TableCell align="right">
                                    {ccyFormat(invoiceTaxes)}
                                </TableCell>
                            </TableRow> */}
							<TableRow>
								<TableCell colSpan={2}>Total</TableCell>
								<TableCell align='right'>
									{ccyFormat(cart.totalPrice)}
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				) : (
					<Typography
						variant='h2'
						gutterBottom
						style={{ textAlign: "center", margin: "15%" }}>
						Your cart is empty!
					</Typography>
				)}
			</TableContainer>

			{cart.currentCart.length > 0 ? (
				<Link to='/checkout'>
					<Button
						variant='contained'
						color='primary'
						disableElevation
						style={{ float: "right", margin: "1rem" }}
						disabled={controlQty}>
						<DoneAllIcon />
						Checkout
					</Button>
				</Link>
			) : (
				<div> </div>
			)}
		</>
	);
}
