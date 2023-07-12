import { Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

function Footer(props) {
	return (
		<Paper>
			<Typography variant='h6'>Created By:</Typography>
			<Typography>
				<Link to='https://www.linkedin.com/in/jackson-abeyta-960243281/'>
					Jackson Abeyta
				</Link>
			</Typography>

			<Typography>
				<Link to='https://www.linkedin.com/in/morgan-bastian-a6a715181/'>
					Morgan Bastian
				</Link>
			</Typography>

			<Typography>
				<Link to='https://www.linkedin.com/in/tina-funderburk-5440b2255/'>
					Tina Funderburk
				</Link>
			</Typography>

			<Typography>
				<Link to='https://www.linkedin.com/in/mckain-badger-131044237/'>
					McKain Badger
				</Link>
			</Typography>

			<Typography>
				<Link to='https://www.linkedin.com/in/colt-andrews-717bb11a6/'>
					Colt Andrews
				</Link>
			</Typography>

			<Typography>
				<Link to='https://www.linkedin.com/in/william-godfrey-492568278/'>
					William Godfrey
				</Link>
			</Typography>
		</Paper>
	);
}

export default Footer;
