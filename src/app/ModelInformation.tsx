import {
	CurrentModelInformationResponse,
	GetCurrentUserResponse,
	TrainService,
} from '@/client';
import {
	CircularProgress,
	Grid,
	Typography,
	TableCell,
	TableContainer,
	TableBody,
	Table,
	TableRow,
	Paper,
} from '@mui/material';
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
				<TableContainer component={Paper} sx={{ maxHeight: '30rem' }}>
					<Table stickyHeader aria-label="customized table">
						<TableBody>
							<TableRow>
								<TableCell
									sx={{ fontSize: '1.6rem' }}
									component="th"
									align="center"
									scope="row"
								>
									{'Model name'}
								</TableCell>
								<TableCell sx={{ fontSize: '1.6rem' }} align="center">
									{modelInfo.model_name}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell
									sx={{ fontSize: '1.6rem' }}
									component="th"
									align="center"
									scope="row"
								>
									{'Accurancy'}
								</TableCell>
								<TableCell sx={{ fontSize: '1.6rem' }} align="center">
									{modelInfo.accurancy * 100}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell
									sx={{ fontSize: '1.6rem' }}
									component="th"
									align="center"
									scope="row"
								>
									{'Precision'}
								</TableCell>
								<TableCell sx={{ fontSize: '1.6rem' }} align="center">
									{modelInfo.precision * 100}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell
									sx={{ fontSize: '1.6rem' }}
									component="th"
									align="center"
									scope="row"
								>
									{'F1 score'}
								</TableCell>
								<TableCell sx={{ fontSize: '1.6rem' }} align="center">
									{modelInfo.f_score * 100}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell
									sx={{ fontSize: '1.6rem' }}
									component="th"
									align="center"
									scope="row"
								>
									{'Recall'}
								</TableCell>
								<TableCell sx={{ fontSize: '1.6rem' }} align="center">
									{modelInfo.recall * 100}
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
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
