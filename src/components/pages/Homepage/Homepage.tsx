import PageLayout from "@/components/layout/PageLayout/PageLayout";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import React from "react";

export default function Homepage() {
	return (
		<PageLayout>
			<Box
				minH="100%"
				display="flex"
				alignItems="center"
				justifyContent="center">
				<Box
					textAlign="center"
					p={6}
					borderWidth="1px"
					rounded="lg"
					shadow="md">
					<Heading
						mb={4}
						color="brand.500">
						🚀 Next.js + Chakra UI + Custom Theme
					</Heading>
					<Text
						mb={6}
						fontFamily="body">
						Now using custom brand colors & fonts!
					</Text>
					<Button colorScheme="brand">Get Started</Button>
				</Box>
			</Box>
		</PageLayout>
	);
}
