'use client';

import FileUploadInput from '@/components/FileUploadInput';
import { Grid, Typography } from '@mui/material';

const TrainModel = () => {
	return (
		<Grid
			sx={{
				margin: '0 10rem',
				padding: '2rem',
			}}
		>
			<Grid sx={{ marginBottom: '2.4rem' }}>
				<Typography sx={{ fontSize: '1.6rem', marginBottom: '1.2rem' }}>
					Upload the CSV file containing the customer data.
				</Typography>
				<Typography sx={{ fontSize: '1.6rem' }}>
					<span style={{ fontWeight: '600' }}>Note: </span>
					The file should contain the columns customerID, gender, SeniorCitizen,
					Partner, Dependents, tenure, PhoneService, MultipleLines,
					InternetService, OnlineSecurity, OnlineBackup, DeviceProtection,
					TechSupport, StreamingTV, StreamingMovies, Contract, PaperlessBilling,
					PaymentMethod, MonthlyCharges, TotalCharges and Churn inorder to train
					the model.
				</Typography>
			</Grid>
			<Grid sx={{ display: 'flex', justifyContent: 'center' }}>
				<FileUploadInput />
			</Grid>
		</Grid>
	);
};

export default TrainModel;
