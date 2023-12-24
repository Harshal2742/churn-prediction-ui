import {
	AppBar,
	Box,
	Button,
	Divider,
	Drawer,
	Grid,
	List,
	ListItem,
	ListItemButton,
	Toolbar,
	Typography,
} from '@mui/material';
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Layout.module.css';

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
	return (
		<Box display={'flex'} overflow={'hidden'}>
			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
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
				<AppBar position="relative">
					<Toolbar sx={{ justifyContent: 'right' }}>
						<Button
							variant="contained"
							sx={{
								borderRadius: '5rem',
								textTransform: 'unset',
							}}
						>
							<Typography fontSize={'1.6rem'} fontWeight={'700'}>
								{'Sign in'}
							</Typography>
						</Button>
					</Toolbar>
				</AppBar>
				<Box
					component={'main'}
					sx={{
						width: '100%',
						backgroundColor: '#171717',
						height: '100%',
					}}
				>
					{children}
				</Box>
			</Grid>
		</Box>
	);
};

export default Layout;
