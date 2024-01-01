import {
	Button,
	FormControl,
	Grid,
	TextField,
	Typography,
} from '@mui/material';
import styles from './authcard.module.css';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '@/store';
import { setUser } from '@/store/user-slice';
import { useRouter } from 'next/navigation';
import { AuthService, OpenAPI } from '@/client';

const LoginCard = () => {
	const [isShowLogin, setIsShowLogin] = useState(true);
	const dispatch = useAppDispatch();
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors, defaultValues },
		watch,
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			confirm_password: '',
		},
	});

	useEffect(() => {
		OpenAPI.TOKEN = localStorage.getItem('access_token') ?? '';
		OpenAPI.BASE = process.env.API_BASE_URL ?? '';

		(async () => {
			try {
				const res = await AuthService.getCurrentUserCurrentUserGet();
				dispatch(
					setUser({
						isAuthenticated: true,
						user: {
							email: res.email,
							role: res.role,
						},
					})
				);
				router.replace('/predict');
			} catch (e) {
				console.log(e);
			}
		})();
	}, [dispatch, router]);

	const onSubmit = async (data: typeof defaultValues) => {
		try {
			if (isShowLogin) {
				const res = await AuthService.loginAuthPost({
					requestBody: {
						email: data?.email!,
						password: data?.password!,
					},
				});
				localStorage.setItem('access_token', res.access_token);
				OpenAPI.TOKEN = res.access_token;
				dispatch(
					setUser({
						isAuthenticated: true,
						user: {
							email: res.email,
							role: res.role,
						},
					})
				);
				router.replace('/predict');
			} else {
				const res = await AuthService.createUserCreateUserPost({
					requestBody: {
						email: data?.email!,
						password: data?.password!,
						confirm_password: data?.confirm_password!,
					},
				});
				localStorage.setItem('access_token', res.access_token);
				OpenAPI.TOKEN = res.access_token;
				dispatch(
					setUser({
						isAuthenticated: true,
						user: {
							email: res.email,
							role: res.role,
						},
					})
				);
				router.replace('/predict');
			}
		} catch (e) {
			console.log(e);
		}
	};

	const password = watch('password');

	return (
		<Grid className={styles.authcard} boxShadow={3}>
			<Typography className={styles.cardTitle}>
				{isShowLogin ? 'Login' : 'Sign Up'}
			</Typography>
			<form className={styles.fromContainer}>
				<Grid className={styles.inputBox}>
					<FormControl className={styles.inputContainer}>
						<Typography className={styles.inputLabel}>E-mail</Typography>
						<TextField
							inputProps={{
								className: styles.fromInput,
							}}
							type="email"
							variant="filled"
							{...register('email', {
								validate: (val) => {
									if (val.length === 0) {
										return 'Please enter email.';
									}

									if (!val.includes('@')) {
										return 'Please enter valid email.';
									}
									return true;
								},
							})}
							helperText={errors.email?.message}
							FormHelperTextProps={{
								className: styles.helperText,
							}}
						/>
					</FormControl>
					<FormControl className={styles.inputContainer}>
						<Typography className={styles.inputLabel}>Password</Typography>
						<TextField
							inputProps={{
								className: styles.fromInput,
							}}
							type="password"
							variant="filled"
							{...register('password', {
								validate: (val) => {
									if (val.length === 0) {
										return 'Please enter password.';
									}

									if (val.length < 8) {
										return 'Password should contains at least 8 characters.';
									}
									return true;
								},
							})}
							FormHelperTextProps={{
								className: styles.helperText,
							}}
							helperText={errors.password?.message}
						/>
					</FormControl>
					{!isShowLogin && (
						<FormControl className={styles.inputContainer}>
							<Typography className={styles.inputLabel}>
								Confirm password
							</Typography>
							<TextField
								inputProps={{
									className: styles.fromInput,
								}}
								type="password"
								variant="filled"
								{...register('confirm_password', {
									validate: (val) => {
										if (val.length === 0) {
											return 'Please confirm password.';
										}

										if (val !== password) {
											return `Confirmed password doesn't match! Confirm again.`;
										}
										return true;
									},
								})}
								FormHelperTextProps={{
									className: styles.helperText,
								}}
								helperText={errors.confirm_password?.message}
							/>
						</FormControl>
					)}
				</Grid>
				<Grid className={styles.btnContainer}>
					<Button
						variant="contained"
						className={styles.btn}
						onClick={handleSubmit(onSubmit)}
					>
						{isShowLogin ? 'Login' : 'Sign up'}
					</Button>
					<Typography
						sx={{
							cursor: 'pointer',
							fontSize: '1.6rem',
							textAlign: 'center',
							color: '#ffffff',
						}}
					>
						{isShowLogin ? 'New user? ' : 'Existing user? '}
						<span
							onClick={() => setIsShowLogin((prev) => !prev)}
							className={styles.signInLoginLink}
						>
							{isShowLogin ? 'Sign Up' : 'Login'}
						</span>
					</Typography>
				</Grid>
			</form>
		</Grid>
	);
};

export default LoginCard;
