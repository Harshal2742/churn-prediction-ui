import {
	Button,
	Divider,
	FormControl,
	Grid,
	MenuItem,
	Modal,
	Select,
	TextField,
	Typography,
} from '@mui/material';
import styles from './styles/predictsinglevalue.module.css';
import { useForm, UseFormRegisterReturn } from 'react-hook-form';
import { HTMLInputTypeAttribute, useEffect, useState } from 'react';
import { PredictService } from '@/client';
import { LoadingButton } from '@mui/lab';

const DEFAULT_VALUES = {
	gender: 'Male',
	senior_citizen: 'No',
	partner: 'No',
	dependents: 'No',
	tenure: 0,
	phone_service: 'No',
	multiple_lines: 'No phone service',
	internet_service: 'DSL',
	online_security: 'Yes',
	online_backup: 'Yes',
	device_protection: 'Yes',
	tech_support: 'Yes',
	streaming_tv: 'Yes',
	streaming_movies: 'Yes',
	contract: 'One year',
	paperless_billing: 'No',
	payment_method: 'Electronic check',
	monthly_charges: 0,
	total_charges: 0,
};

type DropDownProps = {
	title: string;
	options: string[];
	register: UseFormRegisterReturn<keyof typeof DEFAULT_VALUES>;
	defaultValue?: string;
};

type InputTextFieldProps = {
	title: string;
	type: HTMLInputTypeAttribute;
	register: UseFormRegisterReturn<keyof typeof DEFAULT_VALUES>;
};

const InputTextField = ({ title, type, register }: InputTextFieldProps) => {
	return (
		<FormControl>
			<Typography className={styles.inputLabel}>{title}</Typography>
			<TextField
				type={type}
				{...register}
				inputProps={{
					className: styles.inputField,
				}}
			/>
		</FormControl>
	);
};

const DropDown = ({
	title,
	options,
	register,
	defaultValue,
}: DropDownProps) => {
	return (
		<FormControl>
			<Typography className={styles.inputLabel}>{title}</Typography>
			<Select
				className={styles.inputField}
				{...register}
				defaultValue={defaultValue}
			>
				{options.map((option, index) => (
					<MenuItem
						key={index}
						className={styles.dropdownListItem}
						value={option}
					>
						{option}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

const PredictSingleValue = () => {
	const {
		handleSubmit,
		register,
		formState: { errors, defaultValues },
	} = useForm({
		defaultValues: { ...DEFAULT_VALUES },
	});

	const [isChurn, setIsChurn] = useState<boolean | undefined>(undefined);

	const [isLoading, setIsLoading] = useState(false);

	const onPredict = async (data: any) => {
		setIsLoading(true);
		try {
			const res =
				await PredictService.predictSingleValuePredictSingleDatasetPost({
					requestBody: {
						...data,
					},
				});
			setIsChurn(res.is_chrun);
		} catch (e) {
			console.log(e);
		}
		setIsLoading(false);
	};

	return (
		<Grid
			sx={{
				margin: '2rem 10rem',
				paddingLeft: '2rem',
				paddingRight: '2rem',
			}}
		>
			<Grid
				style={{
					display: 'flex',
					flexDirection: 'column',
					overflowY: 'auto',
					height: '63vh',
					paddingLeft: '2rem',
					paddingRight: '2rem',
					paddingBottom: '2rem',
					gap: '2rem',
				}}
			>
				<DropDown
					title={'Gender of customer'}
					options={['Male', 'Female']}
					defaultValue={defaultValues?.gender}
					register={register('gender')}
				/>
				<DropDown
					title={'Does customer is senior citizen?'}
					options={['Yes', 'No']}
					defaultValue={defaultValues?.senior_citizen}
					register={register('senior_citizen')}
				/>
				<DropDown
					title={'Does customer have partner?'}
					options={['Yes', 'No']}
					defaultValue={defaultValues?.partner}
					register={register('partner')}
				/>
				<DropDown
					title={'Customer is dependentts'}
					options={['Yes', 'No']}
					defaultValue={defaultValues?.dependents}
					register={register('dependents')}
				/>
				<InputTextField
					title={'Enter customer tenure'}
					type={'number'}
					register={register('tenure')}
				/>
				<DropDown
					title={'Does customer have phone service?'}
					options={['Yes', 'No']}
					defaultValue={defaultValues?.phone_service}
					register={register('phone_service')}
				/>
				<DropDown
					title={'Does customer have multiple lines?'}
					options={['Yes', 'No', 'No phone service']}
					defaultValue={defaultValues?.multiple_lines}
					register={register('multiple_lines')}
				/>
				<DropDown
					title={'What kind of internet service customer have?'}
					options={['DSL', 'Fiber Optic', 'No']}
					defaultValue={defaultValues?.internet_service}
					register={register('internet_service')}
				/>
				<DropDown
					title={'Does customer have online security?'}
					options={['No internet service', 'Yes', 'No']}
					defaultValue={defaultValues?.online_security}
					register={register('online_security')}
				/>
				<DropDown
					title={'Does customer have online backup?'}
					options={['No internet service', 'Yes', 'No']}
					defaultValue={defaultValues?.online_backup}
					register={register('online_backup')}
				/>
				<DropDown
					title={'Does customer have device protection service?'}
					options={['No internet service', 'Yes', 'No']}
					defaultValue={defaultValues?.device_protection}
					register={register('device_protection')}
				/>
				<DropDown
					title={'Does customer have tech support service?'}
					options={['No internet service', 'Yes', 'No']}
					defaultValue={defaultValues?.tech_support}
					register={register('tech_support')}
				/>
				<DropDown
					title={'Does customer have streaming TV service?'}
					options={['No internet service', 'Yes', 'No']}
					defaultValue={defaultValues?.streaming_tv}
					register={register('streaming_tv')}
				/>
				<DropDown
					title={'Does customer have streaming movies service?'}
					options={['No internet service', 'Yes', 'No']}
					defaultValue={defaultValues?.streaming_movies}
					register={register('streaming_movies')}
				/>
				<DropDown
					title={'Select customer contract type'}
					options={['One year', 'Month-to-month', 'Two year']}
					defaultValue={defaultValues?.contract}
					register={register('contract')}
				/>
				<DropDown
					title={'Does customer uses paperless billing'}
					options={['Yes', 'No']}
					defaultValue={defaultValues?.paperless_billing}
					register={register('paperless_billing')}
				/>
				<DropDown
					title={'Select payment method of the customer.'}
					options={[
						'Electronic check',
						'Mailed check',
						'Credit card (automatic)',
						'Bank transfer (automatic)',
					]}
					defaultValue={defaultValues?.payment_method}
					register={register('payment_method')}
				/>
				<InputTextField
					title={'Enter monthly charges for customer'}
					type={'number'}
					register={register('monthly_charges')}
				/>
				<InputTextField
					title={'Enter total charges for customer'}
					type={'number'}
					register={register('total_charges')}
				/>
			</Grid>
			<Divider />
			<Grid
				sx={{
					marginTop: '1.4rem',
					display: 'flex',
					justifyContent: 'flex-end',
					paddingLeft: '2rem',
					paddingRight: '2rem',
				}}
			>
				<LoadingButton
					variant="contained"
					sx={{
						textTransform: 'unset',
						fontSize: '1.6rem',
						fontWeight: 700,
					}}
					onClick={handleSubmit(onPredict)}
					loading={isLoading}
				>
					<Typography fontSize={'1.6rem'}>{'Predict'}</Typography>
				</LoadingButton>
			</Grid>
			{!isLoading && isChurn !== undefined && (
				<Grid
					sx={{
						padding: '0.5rem',
						borderRadius: '0.4rem',
						margin: '0rem 2rem',
					}}
				>
					<Typography sx={{ fontSize: '1.6rem', color:'#a3e635' }}>
						{isChurn
							? 'Customer will terminate service.'
							: 'Customer will not terminate service.'}
					</Typography>
				</Grid>
			)}
		</Grid>
	);
};

export default PredictSingleValue;
