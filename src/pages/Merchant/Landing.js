import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import Axios from "axios";

// const rows = [
//   createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
//   createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
//   createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
//   createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
//   createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
// ];

const useStyles = makeStyles((theme) => ({
	seeMore: {
		marginTop: theme.spacing(3),
	},
	root: {
		width: "80%",
		margin: theme.spacing("2%", "0%", "0%", "10%"),
	},
}));

export default function MerchantLanding() {
	const classes = useStyles();

	const [orders, setOrders] = React.useState([]);

	React.useEffect(() => {
		Axios.get("http://localhost:1337/orders", {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		})
			.then(function (response) {
				// console.log(response.data);
				setOrders(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	}, []);

	return (
		<React.Fragment>
			<div className={classes.root}>
				<Title>Recent Orders</Title>
				<Table size='small'>
					<TableHead>
						<TableRow>
							<TableCell>Date</TableCell>
							<TableCell>Product</TableCell>
							<TableCell>Name</TableCell>
							<TableCell>Ship To</TableCell>
							<TableCell>Qty</TableCell>
							<TableCell align='right'>Sale Amount</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{orders.map((row) =>
							row.products
								.filter(
									(item) =>
										item.sellerEmail ===
										localStorage.getItem("email")
								)
								.map((item) => (
									<TableRow key={row.id}>
										<TableCell>{item.createdAt}</TableCell>
										<TableCell>{item.name}</TableCell>
										<TableCell>
											{row.lastName} {row.firstName}
										</TableCell>
										<TableCell>{row.address}</TableCell>
										<TableCell>{item.quantity}</TableCell>
										<TableCell align='right'>
											${item.price}
										</TableCell>
									</TableRow>
								))
						)}
					</TableBody>
				</Table>
				{/* <div className={classes.seeMore}>
					<Link color='primary' href='#'>
						See more orders
					</Link>
				</div> */}
			</div>
		</React.Fragment>
	);
}
