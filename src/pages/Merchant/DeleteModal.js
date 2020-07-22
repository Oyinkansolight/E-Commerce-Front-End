import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

var baseURL = "http://localhost:1337/";

export default function DeleteModal({ history, id }) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Button size='small' color='primary' onClick={handleOpen}>
				Delete
			</Button>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				className={classes.modal}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}>
				<Fade in={open}>
					<div className={classes.paper}>
						<h2 id='transition-modal-title'>
							Are you sure you want to delete this product?
						</h2>
						<Button
							size='small'
							color='secondary'
							onClick={() => {
								Axios.delete(`${baseURL}products/${id}`, {
									headers: {
										Authorization: `Bearer ${localStorage.getItem(
											"token"
										)}`,
									},
								})
									.then(function (response) {
										// console.log(response);
									})
									.catch(function (error) {
										// console.log(error);
									});
								setOpen(false);
								history.push("/merchant");
							}}>
							Yes
						</Button>
						<Button
							size='small'
							color='primary'
							onClick={() => setOpen(false)}>
							No
						</Button>
					</div>
				</Fade>
			</Modal>
		</div>
	);
}
