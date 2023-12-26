import { Grid } from '@mui/material';

const PredictMultipleValues = () => {
	return (
		<Grid>
			<label>Upload dataset</label>
			<input type="file" accept=".csv" />
		</Grid>
	);
};

export default PredictMultipleValues;
