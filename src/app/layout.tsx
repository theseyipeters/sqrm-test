import { Providers } from "./providers";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				<link
					rel="shortcut icon"
					href="/favicon.svg"
					type="image/x-icon"
				/>
			</head>
			<body style={{ fontFamily: "Inter", overscrollBehavior: "none" }}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
