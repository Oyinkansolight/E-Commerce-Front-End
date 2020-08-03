import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 400,
		flexGrow: 1,
		margin: "0 auto",
	},
	header: {
		display: "flex",
		alignItems: "center",
		height: 50,
		paddingLeft: theme.spacing(4),
		backgroundColor: theme.palette.background.default,
	},
	img: {
		height: 255,
		maxWidth: 400,
		overflow: "hidden",
		display: "block",
		width: "100%",
	},
}));

export default function ProductImage({ image }) {
	const classes = useStyles();
	const theme = useTheme();
	const [activeStep, setActiveStep] = React.useState(0);
	const getImageLength = () => {
		let images = image.image.filter((image) => typeof image === "object");
		return images.length;
	};
	const maxSteps = getImageLength();

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	return (
		<div className={classes.root}>
			<Paper square elevation={0} className={classes.header}>
				<Typography>{image.name}</Typography>
			</Paper>
			<img
				className={classes.img}
				src={`${process.env.REACT_APP_BASEURL}${image.image[activeStep].url}`}
				// src={`${process.env.REACT_APP_BASEURL}${image.image[activeStep].formats.medium.url}`}
				alt={image.image[activeStep].name}
			/>
			<MobileStepper
				steps={maxSteps}
				position='static'
				variant='text'
				activeStep={activeStep}
				nextButton={
					<Button
						size='small'
						onClick={handleNext}
						disabled={activeStep === maxSteps - 1}>
						Next
						{theme.direction === "rtl" ? (
							<KeyboardArrowLeft />
						) : (
							<KeyboardArrowRight />
						)}
					</Button>
				}
				backButton={
					<Button
						size='small'
						onClick={handleBack}
						disabled={activeStep === 0}>
						{theme.direction === "rtl" ? (
							<KeyboardArrowRight />
						) : (
							<KeyboardArrowLeft />
						)}
						Back
					</Button>
				}
			/>
		</div>
	);
}
