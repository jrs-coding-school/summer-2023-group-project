import { Paper, Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = (props) => {
	return (
		<Paper>
			<Navbar />
			<Outlet />{' '}
			{/* Outlet is not a “real” Component, it is imported from react-router-dom. it will be replaced by the element rendered by the route */}
			<Grid
				container
				spacing={0}
				direction='column'
				alignItems='center'
				justifyContent='center'
				sx={{ minHeight: '100vh' }}
			>
				<Grid item xs={3}>
					<Footer />
				</Grid>
			</Grid>
		</Paper>
	);
};

export default Layout;
