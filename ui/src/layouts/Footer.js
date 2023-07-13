// import { Box, Paper } from '@mui/material';
// import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

// function Footer(props) {
// 	return (
// 		<Box
// 			sx={{
// 				display: 'flex',
// 				flexDirection: 'column',
// 				minHeight: '100vh',
// 				borderTop: '1px solid #000',
// 				marginTop: 'auto',
// 				p: 4,
// 			}}
// 		>
// 			<Typography variant='h6'>Created By:</Typography>
// 			<Typography>
// 				<Link to='https://www.linkedin.com/in/jackson-abeyta-960243281/'>
// 					Jackson Abeyta
// 				</Link>
// 			</Typography>

// 			<Typography>
// 				<Link to='https://www.linkedin.com/in/morgan-bastian-a6a715181/'>
// 					Morgan Bastian
// 				</Link>
// 			</Typography>

// 			<Typography>
// 				<Link to='https://www.linkedin.com/in/tina-funderburk-5440b2255/'>
// 					Tina Funderburk
// 				</Link>
// 			</Typography>

// 			<Typography>
// 				<Link to='https://www.linkedin.com/in/mckain-badger-131044237/'>
// 					McKain Badger
// 				</Link>
// 			</Typography>

// 			<Typography>
// 				<Link to='https://www.linkedin.com/in/colt-andrews-717bb11a6/'>
// 					Colt Andrews
// 				</Link>
// 			</Typography>

// 			<Typography>
// 				<Link to='https://www.linkedin.com/in/william-godfrey-492568278/'>
// 					William Godfrey
// 				</Link>
// 			</Typography>
// 		</Box>
// 	);
// }

import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';

function Footer(props) {
	return (
		<Box
			sx={{
				position: 'fixed',
				width: '100%',
				height: 'auto',
				// backgroundColor: 'secondary.main',
				paddingTop: '1rem',
				paddingBottom: '1rem',
			}}
		>
			<Container maxWidth='lg'>
				<Grid container direction='column' alignItems='center'>
					<Grid item xs={12}>
						<Typography color='black' variant='h5'>
							Created By
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography color='textSecondary' variant='subtitle1'>
							<Link
								to='https://www.linkedin.com/in/jackson-abeyta-960243281/'
								style={{ textDecoration: 'none' }}
							>
								Jackson Abeyta
							</Link>
							<span> | </span>
							<Link
								to='https://www.linkedin.com/in/morgan-bastian-a6a715181/'
								style={{ textDecoration: 'none' }}
							>
								Morgan Bastian
							</Link>
							<span> | </span>
							<Link
								to='https://www.linkedin.com/in/tina-funderburk-5440b2255/'
								style={{ textDecoration: 'none' }}
							>
								Tina Funderburk
							</Link>
							<span> | </span>
							<Link
								to='https://www.linkedin.com/in/mckain-badger-131044237/'
								style={{ textDecoration: 'none' }}
							>
								McKain Badger
							</Link>
							<span> | </span>
							<Link
								to='https://www.linkedin.com/in/colt-andrews-717bb11a6/'
								style={{ textDecoration: 'none' }}
							>
								Colt Andrews
							</Link>
							<span> | </span>
							<Link
								to='https://www.linkedin.com/in/william-godfrey-492568278/'
								style={{ textDecoration: 'none' }}
							>
								William Godfrey
							</Link>
							<span> | </span>
						</Typography>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
}

export default Footer;
