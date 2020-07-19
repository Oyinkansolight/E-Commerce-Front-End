import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
// import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import SvgIcon from "@material-ui/core/SvgIcon";
import { Link } from "react-router-dom";
import CartPopover from "../../components/Cart/Popover";
import auth from "../../helpers/auth";

const useStyles = makeStyles((theme) => ({
	root: {
		"& > svg": {
			margin: theme.spacing(2),
		},
	},
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		display: "none",
		[theme.breakpoints.up("sm")]: {
			display: "block",
		},
	},
	search: {
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		"&:hover": {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing(3),
			width: "auto",
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	inputRoot: {
		color: "inherit",
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "20ch",
		},
	},
	sectionDesktop: {
		display: "none",
		[theme.breakpoints.up("md")]: {
			display: "flex",
		},
	},
	sectionMobile: {
		display: "flex",
		[theme.breakpoints.up("md")]: {
			display: "none",
		},
	},
}));

export default function Header() {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
	const [isLoggedIn, setIsLoggedIn] = React.useState(
		Boolean(localStorage.getItem("loggedIn"))
	);

	React.useEffect(() => {
		setIsLoggedIn(Boolean(localStorage.getItem("loggedIn")));
	}, [isLoggedIn]);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const menuId = "primary-search-account-menu";
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			id={menuId}
			keepMounted
			transformOrigin={{ vertical: "top", horizontal: "right" }}
			open={isMenuOpen}
			onClose={handleMenuClose}>
			<MenuItem onClick={handleMenuClose}>Profile</MenuItem>
			<MenuItem onClick={handleMenuClose}>My account</MenuItem>
		</Menu>
	);

	const mobileMenuId = "primary-search-account-menu-mobile";
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{ vertical: "top", horizontal: "right" }}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}>
			<MenuItem>
				<Link to='/shop' style={{ textDecoration: "none" }}>
					<Button color='default'>Shop</Button>
				</Link>
			</MenuItem>

			<MenuItem>
				<Link to='/about' style={{ textDecoration: "none" }}>
					<Button color='default'>About</Button>
				</Link>
			</MenuItem>
			<MenuItem>
				<Link to='/contact' style={{ textDecoration: "none" }}>
					<Button color='default'>Contact Us</Button>
				</Link>
			</MenuItem>

			{!isLoggedIn ? (
				<>
					<MenuItem>
						<Link to='/login' style={{ textDecoration: "none" }}>
							<Button color='default'>Login</Button>
						</Link>
					</MenuItem>

					<MenuItem>
						<Link to='/signup' style={{ textDecoration: "none" }}>
							<Button color='default'>Sign Up</Button>
						</Link>
					</MenuItem>
				</>
			) : (
				<>
					<MenuItem>
						<Link
							to={"/" + localStorage.getItem("user")}
							style={{ textDecoration: "none" }}>
							<Button
								color='default'
								startIcon={<AccountCircle />}>
								My Account
							</Button>
						</Link>
					</MenuItem>
				</>
			)}

			<MenuItem>
				<Button color='default'>
					<CartPopover />
				</Button>
			</MenuItem>
		</Menu>
	);

	return (
		<div className={classes.grow}>
			<AppBar
				position='static'
				color='transparent'
				style={{ boxShadow: "none" }}>
				<Toolbar>
					<Typography className={classes.title} variant='h6' noWrap>
						<Link to='/' style={{ textDecoration: "none" }}>
							MarketSquare
						</Link>
					</Typography>
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon />
						</div>
						<InputBase
							placeholder='Search…'
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput,
							}}
							inputProps={{ "aria-label": "search" }}
						/>
					</div>
					<div className={classes.grow} />
					<div className={classes.sectionDesktop}>
						<Link to='/shop' style={{ textDecoration: "none" }}>
							<Button color='default'>Shop</Button>
						</Link>

						<Link to='/about' style={{ textDecoration: "none" }}>
							<Button color='default'>About</Button>
						</Link>

						<Link to='/contact' style={{ textDecoration: "none" }}>
							<Button color='default'>Contact Us</Button>
						</Link>

						{!auth.isAuthenticated() ? (
							<>
								<Link
									to='/login'
									style={{ textDecoration: "none" }}>
									<Button color='default'>Login</Button>
								</Link>

								<Link
									to='/signup'
									style={{ textDecoration: "none" }}>
									<Button color='default'>Sign Up</Button>
								</Link>
							</>
						) : (
							<>
								<Link
									to={"/" + localStorage.getItem("user")}
									style={{ textDecoration: "none" }}>
									<Button
										color='default'
										startIcon={<AccountCircle />}>
										My Account
									</Button>
								</Link>
							</>
						)}

						{/* <Button color='default'> */}
						<CartPopover />
						{/* </Button> */}
					</div>
					<div className={classes.sectionMobile}>
						<IconButton
							aria-label='show more'
							aria-controls={mobileMenuId}
							aria-haspopup='true'
							onClick={handleMobileMenuOpen}
							color='inherit'>
							<MoreIcon />
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
			{renderMenu}
		</div>
	);
}