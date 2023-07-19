import { Paper } from '@mui/material';
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { blue } from '@mui/material/colors';
import {getToken, isUserLoggedIn, setToken, clearToken} from '../utility/utils'

//settings for the profile dropdown
const settings = ['Profile', 'Account', 'Logout'];
function Logout() {
	clearToken();
	window.location.reload(false);
}
function Navbar() {
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const [anchorElSearch, setAnchorElSearch] = React.useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const StyledInputBase = styled(InputBase)(({ theme }) => ({
		color: 'inherit',
		'& .MuiInputBase-input': {
		  padding: theme.spacing(1, 1, 1, 0),
		  // vertical padding + font size from searchIcon
		  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		  transition: theme.transitions.create('width'),
		  width: '100%',
		  [theme.breakpoints.up('md')]: {
			width: '20ch',
		  },
		},
	  }));

	  const Search = styled('div')(({ theme }) => ({
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: alpha(theme.palette.common.white, 0.15),
		'&:hover': {
		  backgroundColor: alpha(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
		  marginLeft: theme.spacing(3),
		  width: 'auto',
		},
	  }));
	   
	  const SearchIconWrapper = styled('div')(({ theme }) => ({
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	  }));
	  
	  
	return (
		<Paper>
			<AppBar position="static">
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						{/* linked the iWitness text to the homepage */}
						<Link
							to="/"
							style={{ textDecoration: "none", color: "white" }}>
							<Typography
								variant="h6"
								noWrap
								component="a"
								href="/"
								sx={{
									mr: 2,
									display: { xs: "none", md: "flex" },
									fontFamily: "monospace",
									fontWeight: 700,
									letterSpacing: ".3rem",
									color: "inherit",
									textDecoration: "none",
								}}>
								iWitness
							</Typography>
						</Link>

						<Box
							sx={{
								flexGrow: 1,
								display: { xs: "flex", md: "none" },
								alignItems: "center",
							}}>
							<Menu
								id="menu-appbar"
								anchorEl={anchorElNav}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "left",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "left",
								}}
								open={Boolean(anchorElNav)}
								onClose={handleCloseNavMenu}
								sx={{
									display: { xs: "block", md: "none" },
						}}></Menu>
						</Box>
						<Box
							sx={{
								flexGrow: 1,
								display: { xs: "none", md: "flex" },
								flexDirection: "flex-end",
								alignItems: "center",
								justifyContent: "flex-end",
								textDecoration: "none",
								color: "white",
							}}>
							<Link to="/reports/search">
								<Search>
									<SearchIconWrapper>
										<SearchIcon />
									</SearchIconWrapper>
									<StyledInputBase
									placeholder="Search…"
									inputProps={{ "aria-label": "search" }}
									/>
								</Search>
							</Link>
							<Link
								to="/reports"
								style={{ textDecoration: "none" }}>
								<Button
									sx={{
										display: { xs: "none", md: "flex" },
										mr: 1,
										textDecoration: "none",
										color: "white",
									}}>
									Report a Crime
								</Button>
							</Link>
							{/* linked the leaderboard trophy icon to /leaderboard */}
							<Link to="/leaderboard">
								<EmojiEventsIcon
									sx={{
										display: { xs: "none", md: "flex" },
										mr: 1,
										textDecoration: "none",
										color: "white",
									}}
								/>
							</Link>
							{/* link the notification bell icon to /notifications */}
							<Link to="/notfications">
								<NotificationsIcon
									sx={{
										display: { xs: "none", md: "flex" },
										mr: 1,
										textDecoration: "none",
										color: "white",
									}}
								/>
							</Link>
						</Box>

						<Box sx={{ flexGrow: 0 }}>
							<Tooltip>
								{/* profile avatar on far right side */}
								{isUserLoggedIn() ? (
									<IconButton
										onClick={handleOpenUserMenu}
										sx={{ p: 0 }}>
										<Avatar alt="Profile" />
									</IconButton>
								) : (
									<Link to="/login">
										<Button
											sx={{
												// display: { xs: 'none', md: 'flex' },
												mr: 1,
												textDecoration: "none",
												color: "white",
												flex: "row-reverse",
											}}>
											Login
										</Button>
									</Link>
								)}
							</Tooltip>
							<Menu
								sx={{ mt: "45px" }}
								id="menu-appbar"
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>
								<MenuItem><Link to='/profile' style={{ textDecoration: 'none'}}>Profile</Link></MenuItem>
								<MenuItem><Link to='/account/settings' style={{ textDecoration: 'none' }}>Account Settings</Link></MenuItem>
								<MenuItem onClick={() => Logout()}><Link to='/' style={{ textDecoration: 'none' }}>Logout</Link></MenuItem>
							</Menu>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
		</Paper>
	);
}

export default Navbar;
