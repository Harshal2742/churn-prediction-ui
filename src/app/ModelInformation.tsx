import {
	CurrentModelInformationResponse,
	GetCurrentUserResponse,
	TrainService,
} from '@/client';
import { CircularProgress, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

const ModelInformation = () => {
	const [modelInfo, setModelInfo] = useState<
		CurrentModelInformationResponse | undefined
	>();

	useEffect(() => {
		(async () => {
			try {
				const res =
					await TrainService.getCurrentModelInformationTrainCurrentModelInformationGet();
				setModelInfo(res);
			} catch (e) {}
		})();
	}, []);

	return modelInfo ? (
		<Grid sx={{ display: 'flex', flexDirection: 'column', padding: '40px' }}>
			<Grid>
				<Typography
					sx={{
						fontSize: '24px',
						fontWeight: '600',
						marginBottom: '20px',
					}}
				>
					{'Current model infomation'}
				</Typography>
			</Grid>
			<Grid
				sx={{
					display: 'flex',
					flexDirection: 'column',
					maxWidth: '40rem',
				}}
			>
				{['model_name', 'accurancy'].map((val, index) => {
					return (
						<Grid
							key={index}
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								marginBottom: '1.2rem',
							}}
						>
							<Typography
								sx={{
									textTransform: 'capitalize',
									fontWeight: '600',
									fontSize: '1.6rem',
								}}
							>
								{val.replace('_', ' ')}
							</Typography>
							<Typography
								sx={{
									fontSize: '1.6rem',
								}}
							>
								{modelInfo[val as keyof typeof modelInfo]}
							</Typography>
						</Grid>
					);
				})}
			</Grid>
		</Grid>
	) : (
		<Grid
			sx={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
				height: '100%',
			}}
		>
			<CircularProgress />
		</Grid>
	);
};

export default ModelInformation;
