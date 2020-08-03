import React from "react";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import SaveIcon from "@material-ui/icons/Save";
import { Button } from "@material-ui/core";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
	root: {
		"& .MuiTextField-root": {
			margin: theme.spacing(1),
			width: "25ch",
		},
	},
}));


async function getBankDetails() {
	const { data } = await Axios.get(`${process.env.REACT_APP_BASEURL}/bank-infos`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	});
	return data;
}

export default function AccountDetails() {
	const { register, handleSubmit, errors } = useForm();

	const onSubmit = async (data, e) => {
		const userData = await getBankDetails();

		if (userData.length === 0) {
			data.userId = localStorage.getItem("id");

			Axios.post(`${process.env.REACT_APP_BASEURL}/bank-infos`, data, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});
		} else {
			for (let res of userData) {
				if (res.userId == localStorage.getItem("id")) {
					Axios.put(`${process.env.REACT_APP_BASEURL}/bank-infos/${res.id}`, data, {
						headers: {
							Authorization: `Bearer ${localStorage.getItem(
								"token"
							)}`,
						},
					});
				}
			}
		}
	};

	const classes = useStyles();

	return (
		<div style={{ marginLeft: "0 auto", textAlign: "center" }}>
			<Typography variant='h4' gutterBottom>
				Merchant Bank Information
			</Typography>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className={classes.root}
				noValidate
				autoComplete='off'>
				<div>
					<TextField
						id='outlined-flexible-fname'
						label='First Name'
						type='text'
						placeholder='First name'
						name='firstName'
						inputRef={register({ required: true, maxLength: 80 })}
						variant='outlined'
					/>

					<TextField
						id='outlined-flexible-lname'
						label='Last Name'
						type='text'
						placeholder='Last name'
						name='lastName'
						inputRef={register({ required: true, maxLength: 100 })}
						variant='outlined'
					/>
				</div>

				<div>
					<TextField
						id='outlined-multiline-flexible'
						label='Phone Number'
						type='tel'
						placeholder='08012345678'
						name='phone'
						inputRef={register({
							required: true,
							minLength: 11,
						})}
						variant='outlined'
					/>
				</div>

				<div>
					<TextField
						id='outlined-multiline-flexible'
						label='Bank Name'
						type='text'
						placeholder='Bank Name'
						name='bank'
						inputRef={register({ required: true })}
						variant='outlined'
					/>

					<TextField
						id='outlined-multiline-flexible'
						label='Account Number'
						type='text'
						placeholder='Account Number'
						name='accountNo'
						inputRef={register({ required: true })}
						variant='outlined'
					/>
				</div>

				<Button
					variant='contained'
					color='primary'
					size='large'
					className={(classes.button, classes.submit)}
					startIcon={<SaveIcon />}
					type='submit'
					style={{ marginTop: "2%" }}>
					Save
				</Button>
			</form>
		</div>
	);
}
