import { FormControl, Grid, MenuItem, Select, Typography } from '@mui/material';
import styles from './styles/predictsinglevalue.module.css';
import { useForm, UseFormRegisterReturn } from 'react-hook-form';

const defaultValues = {
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
	register: UseFormRegisterReturn<keyof typeof defaultValues>;
};

const DropDown = ({ title, options, register }: DropDownProps) => {
	console.log(register.name);
	return (
		<FormControl>
			<Typography className={styles.inputLabel}>{title}</Typography>
			<Select className={styles.inputField} {...register}>
				{options.map((option, index) => (
					<MenuItem
						key={index}
						className={styles.dropdownListItem}
						value={title}
					>
						{option}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

const PredictSingleValue = () => {
	const { register } = useForm({
		defaultValues,
	});

	return (
		<Grid
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				marginX: '20rem',
			}}
		>
			<DropDown
				title={'Select gender of customer'}
				options={['Male', 'Female']}
				register={{ ...register('gender') }}
			/>
		</Grid>
	);
};

export default PredictSingleValue;
