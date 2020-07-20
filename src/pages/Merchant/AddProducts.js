import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	TextField,
	Typography,
	Input,
	InputLabel,
	InputAdornment,
	Button,
	Icon,
} from "@material-ui/core";

import PhotoLibraryTwoToneIcon from "@material-ui/icons/PhotoLibraryTwoTone";
import InsertPhotoTwoToneIcon from "@material-ui/icons/InsertPhotoTwoTone";
import SaveIcon from "@material-ui/icons/Save";
import Axios from "axios";
import { useForm } from "react-hook-form";
// import { DevTool } from "react-hook-form-devtools";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
		width: "70%",
		margin: theme.spacing("0", "auto"),
	},
	textField: {
		margin: "0.5rem",
		width: "25ch",
	},
	input: {
		display: "none",
	},
	button: {
		margin: theme.spacing(1),
	},
	submit: {
		width: "22rem",
		marginTop: "2%",
	},
}));

var baseURL = "http://localhost:1337/";

export default function AddProductForm() {
	const { register, errors, handleSubmit, control, getValues } = useForm({
		mode: "onChange",
		reValidateMode: "onChange",
	});
	const classes = useStyles();

	const onSubmit = async (data, e) => {
		const formValues = {};
		formValues.name = data.name;
		formValues.price = data.price;
		formValues.qty = data.qty;
		formValues.shortDescription = data.shortDescription;
		formValues.description = data.description;
		formValues.user = JSON.parse(localStorage.getItem("details"));

		let bodyFormData = new FormData();

		const display = data.displayImg[0];
		bodyFormData.append(`files.displayImg`, display, display.name);

		for (let i = 0, length = data.image.length; i < length; i++) {
			const file = data.image[i];
			bodyFormData.append(`files.image`, file, file.name);
		}

		bodyFormData.append("data", JSON.stringify(formValues));

		await Axios({
			method: "POST",
			url: `${baseURL}products`,
			data: bodyFormData,
			// onUploadProgress: (progress) => console.log("Uploading..."),
			headers: {
				"Content-Type": "multipart/form-data",
			},
		})
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	return (
		<>
			{/* <DevTool control={control} /> */}
			<Typography variant='h4' gutterBottom style={{ marginLeft: "15%" }}>
				Add Product
			</Typography>

			<div className={classes.root}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div>
						<TextField
							id='outlined-full-width'
							label='Product Name'
							style={{ margin: 8 }}
							placeholder='Enter Product Name'
							fullWidth
							margin='normal'
							InputLabelProps={{
								shrink: true,
							}}
							variant='outlined'
							name='name'
							type='text'
							error={!!errors.name}
							inputRef={register({ required: true })}
						/>
						<TextField
							label='$ Price'
							id='outlined-margin-none'
							// defaultValue="Default Value"
							className={classes.textField}
							placeholder='Enter Price'
							// helperText="Some important text"
							// style={{ margin: "1rem, 0.5rem" }}
							variant='outlined'
							name='price'
							type='number'
							error={!!errors.price}
							inputRef={register({ required: true })}
						/>
						<TextField
							label='Quantity'
							id='outlined-margin-none'
							className={classes.textField}
							placeholder='No. of Units'
							variant='outlined'
							name='qty'
							type='number'
							error={!!errors.qty}
							inputRef={register({ required: true })}
						/>

						<TextField
							id='outlined-multiline-static'
							label='Short Description'
							placeholder='Brief Description'
							multiline
							rows={2}
							variant='outlined'
							fullWidth
							style={{ margin: 8 }}
							name='shortDescription'
							type='text'
							error={!!errors.shortDescription}
							inputRef={register({ required: true })}
						/>

						<TextField
							id='outlined-multiline-static'
							label='Full Description'
							placeholder='Full Description'
							multiline
							rows={5}
							fullWidth
							style={{ margin: 8 }}
							name='description'
							type='text'
							error={!!errors.description}
							inputRef={register({ required: true })}
						/>

						<Button
							variant='contained'
							component='label'
							style={{ margin: 8 }}
							startIcon={<InsertPhotoTwoToneIcon />}>
							Display Image
							<input
								type='file'
								style={{ display: "none" }}
								name='displayImg'
								error={!!errors.displayImg}
								ref={register({ required: true })}
							/>
						</Button>

						<input
							accept='image/*'
							className={classes.input}
							style={{ display: "none" }}
							id='raised-button-file'
							multiple
							type='file'
							name='image'
							error={!!errors.image}
							ref={register({ required: true })}
						/>
						<label htmlFor='raised-button-file'>
							<Button
								variant='raised'
								component='span'
								className={classes.button}
								style={{ margin: 8 }}
								startIcon={<PhotoLibraryTwoToneIcon />}>
								Slider Images
							</Button>
						</label>

						<br />
						<Button
							variant='contained'
							color='primary'
							size='large'
							className={(classes.button, classes.submit)}
							startIcon={<SaveIcon />}
							type='submit'
							style={{ marginBottom: "2%" }}
							disabled={
								!!errors.name ||
								!!errors.price ||
								!!errors.qty ||
								!!errors.shortDescription ||
								!!errors.description ||
								!!errors.displayImg ||
								!!errors.image
							}>
							Save
						</Button>
					</div>
				</form>
			</div>
		</>
	);
}
