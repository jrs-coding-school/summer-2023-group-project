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
	return (
		<Paper>
			<AppBar position='static'>
				<Container maxWidth='xl'>
					<Toolbar disableGutters>
						{/* linked the iWitness text to the homepage */}
						<Link to='/home' style={{ textDecoration: 'none', color: 'white' }}>
							<Typography
								variant='h6'
								noWrap
								component='a'
								href='/'
								sx={{
									mr: 2,
									display: { xs: 'none', md: 'flex' },
									fontFamily: 'monospace',
									fontWeight: 700,
									letterSpacing: '.3rem',
									color: 'inherit',
									textDecoration: 'none',
								}}
							>
								iWitness
							</Typography>
						</Link>

						<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, alignItems:'center' }}>
						<Link to='/leaderboard'>
								<EmojiEventsIcon
									sx={{
										// display: { xs: 'none', md: 'flex' },
										mr: 1,
										textDecoration: 'none',
										color: 'white',
									}}
								/>
							</Link>
							<Link to='/notfications'>
								<NotificationsIcon
									sx={{
										// display: { xs: 'none', md: 'flex' },
										mr: 1,
										textDecoration: 'none',
										color: 'white',
									}}
								/>
							</Link>
							<Link to='/report' style={{ textDecoration: 'none' }}><Button sx={{
										// display: { xs: 'none', md: 'flex' },
										mr: 1,
										textDecoration: 'none',
										color: 'white',
									}}>Report a Crime</Button></Link>
							
							<Menu
								id='menu-appbar'
								anchorEl={anchorElNav}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'left',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'left',
								}}
								open={Boolean(anchorElNav)}
								onClose={handleCloseNavMenu}
								sx={{
									display: { xs: 'block', md: 'none' },
								}}
							></Menu>
						</Box>
						<Typography
							variant='h5'
							noWrap
							component='a'
							href=''
							sx={{
								mr: 2,
								display: { xs: 'flex', md: 'none' },
								flexGrow: 1,
								fontFamily: 'monospace',
								fontWeight: 700,
								letterSpacing: '.3rem',
								color: 'inherit',
								textDecoration: 'none',
							}}
						>
							iWitness
						</Typography>
						<Box
							sx={{
								flexGrow: 1,
								display: { xs: 'none', md: 'flex' },
								flexDirection: 'flex-end',
								alignItems: 'center',
								justifyContent: 'flex-end',
								textDecoration: 'none',
								color: 'white',
							}}
						>   {/* Check if user is logged in, if true link to /report : if false link to /login */}
							{isUserLoggedIn() ? <Link to='/report' style={{ textDecoration: 'none' }}><Button sx={{
										display: { xs: 'none', md: 'flex' },
										mr: 1,
										textDecoration: 'none',
										color: 'white',
									}}>Report a Crime</Button></Link> 
									:
									<Link to='/login'><Button sx={{
										// display: { xs: 'none', md: 'flex' },
										mr: 1,
										textDecoration: 'none',
										color: 'white',
										flex: 'row-reverse',
									}}>Login to Report a Crime</Button></Link> }
							
							{/* linked the leaderboard trophy icon to /leaderboard */}
							<Link to='/leaderboard'>
								<EmojiEventsIcon
									sx={{
										display: { xs: 'none', md: 'flex' },
										mr: 1,
										textDecoration: 'none',
										color: 'white',
									}}
								/>
							</Link>
							{/* link the notification bell icon to /notifications */}
							<Link to='/notfications'>
								<NotificationsIcon
									sx={{
										display: { xs: 'none', md: 'flex' },
										mr: 1,
										textDecoration: 'none',
										color: 'white',
									}}
								/>
							</Link>
						</Box>

						<Box sx={{ flexGrow: 0 }}>
							<Tooltip >
								{/* profile avatar on far right side */}
								{isUserLoggedIn() ? <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
									<Avatar alt='Profile' />
								</IconButton> :<Link to='/login'><Button sx={{
										// display: { xs: 'none', md: 'flex' },
										mr: 1,
										textDecoration: 'none',
										color: 'white',
										flex: 'row-reverse',
									}}>Login</Button></Link> }
							</Tooltip>
							<Menu
								sx={{ mt: '45px',}}
								id='menu-appbar'
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>
								<MenuItem><Link to='/profile' style={{ textDecoration: 'none'}}>Profile</Link></MenuItem>
								<MenuItem><Link to='/account' style={{ textDecoration: 'none' }}>Account</Link></MenuItem>
								<MenuItem onClick={() => Logout()}><Link to='/home' style={{ textDecoration: 'none' }}>Logout</Link></MenuItem>
							</Menu>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
		</Paper>
	);
}

export default Navbar;
