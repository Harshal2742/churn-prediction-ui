'use client';
import {
	AppBar,
	Avatar,
	Box,
	Button,
	Divider,
	Drawer,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	Toolbar,
	Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Layout.module.css';
import { useAppDispatch, useAppSelector } from '@/store';
import { usePathname, useRouter } from 'next/navigation';
import { setUser } from '@/store/user-slice';

const TABS = [
	{
		title: 'Model information',
		link: '/',
	},
	{
		title: 'Predict churn',
		link: '/predict',
	},
	{
		title: 'Train model',
		link: '/train',
	},
	{
		title: 'About dataset',
		link: '/about-dataset',
	},
];

const Layout = ({ children }: { children: React.ReactNode }) => {
	const drawerWidth = 240;
	const [activeTab, setActiveTab] = useState(0);
	const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
	const router = useRouter();
	const dispath = useAppDispatch();
	const pathname = usePathname();

	useEffect(() => {
		if (isAuthenticated) {
			console.log(pathname);
			const idx = TABS.findIndex((tab) => tab.link.includes(pathname));
			console.log(idx);
			setActiveTab(idx);
		}
	}, [isAuthenticated, pathname]);

	useEffect(() => {
		if (!isAuthenticated) {
			router.replace('/auth');
		}
	}, [isAuthenticated, router]);

	if (!isAuthenticated) {
		return <Box>{children}</Box>;
	}

	const onLogout = () => {
		localStorage.removeItem('access_token');
		dispath(
			setUser({
				isAuthenticated: false,
				user: {
					email: '',
					role: '',
				},
			})
		);
		router.replace('/auth');
	};

	return (
		<Box display={'flex'} overflow={'hidden'}>
			<Drawer
				sx={{
					width: drawerWidth,
					'& .MuiDrawer-paper': {
						width: drawerWidth,
						boxSizing: 'border-box',
					},
				}}
				variant="permanent"
				anchor="left"
			>
				<Toolbar sx={{ backgroundColor: '#262626' }} />
				<Divider />
				<List
					sx={{
						backgroundColor: '#262626',
						height: '100%',
					}}
				>
					{TABS.map(({ title, link }, index) => (
						<ListItem
							key={index}
							sx={{
								padding: '0',
								margin: '0',
								backgroundColor: index === activeTab ? '#84cc16' : 'unset',
							}}
						>
							<ListItemButton sx={{ padding: 0, margin: 0 }}>
								<Link
									href={link}
									onClick={() => {
										setActiveTab(index);
									}}
									className={styles.navLink}
								>
									<Typography
										sx={{
											paddingY: '1rem',
											fontSize: '1.6rem',
											color: index === activeTab ? '#171717' : '#fff',
											fontWeight: '700',
										}}
									>
										{title}
									</Typography>
								</Link>
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Drawer>
			<Grid
				sx={{
					width: `calc(100% - ${drawerWidth}px)`,
					height: '100vh',
					overflow: 'hidden',
				}}
			>
				<AppBar sx={{ position: 'relative' }}>
					<Toolbar sx={{ justifyContent: 'right' }}>
						<IconButton id="basic-button">
							<Avatar />
						</IconButton>
						<Button
							variant="outlined"
							sx={{ textTransform: 'unset', fontSize: '1.6rem' }}
							onClick={onLogout}
						>
							Logout
						</Button>
					</Toolbar>
				</AppBar>
				<Box
					component={'main'}
					sx={{
						backgroundColor: '#171717',
						height: '100%',
						position: 'relative',
					}}
				>
					{children}
				</Box>
			</Grid>
		</Box>
	);
};

export default Layout;
