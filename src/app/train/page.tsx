'use client';

import { TrainService } from '@/client';
import FileUploadInput from '@/components/FileUploadInput';
import { LoadingButton } from '@mui/lab';
import { CircularProgress, Grid, Typography } from '@mui/material';
import { useState } from 'react';

const TrainModel = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [isTraning, setIsTraning] = useState(false);
	const onFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.currentTarget.files?.[0];
		if (file) {
			setIsLoading(true);
			try {
				const res = await TrainService.uploadDatasetTrainUploadDatasetPost({
					formData: {
						dataset: file,
					},
				});
			} catch (e) {
				console.log(e);
			}

			setIsLoading(false);
		}
		if (e.currentTarget && e.currentTarget.value) {
			e.currentTarget.value = '';
			e.currentTarget.files = null;
		}
	};

	const onTrain = async () => {
		setIsTraning(true);
		try {
			const res = await TrainService.trainModelTrainTrainModelGet();
		} catch (e) {
			console.log(e);
		}
		setIsTraning(false);
	};

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
			<Grid
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					gap: '20px',
				}}
			>
				<FileUploadInput onChange={onFileUpload} />
				<LoadingButton
					variant={'contained'}
					sx={{
						padding: '0.6rem 2.4rem',
						fontSize: '1.6rem',
						textTransform: 'capitalize',
					}}
					loading={isTraning}
					onClick={onTrain}
				>
					{'Train Model'}
				</LoadingButton>
			</Grid>
			{isLoading && (
				<Grid sx={{ display: 'flex', justifyContent: 'center' }}>
					<CircularProgress />
				</Grid>
			)}
		</Grid>
	);
};

export default TrainModel;
