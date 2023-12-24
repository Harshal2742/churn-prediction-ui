'use client';
import './globals.css';
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry';
import Layout from '@/components/layout/Layout';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<ThemeRegistry>
					<Layout>{children}</Layout>
				</ThemeRegistry>
			</body>
		</html>
	);
}
