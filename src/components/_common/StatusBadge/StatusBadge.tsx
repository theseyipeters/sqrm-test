import { Status } from "@chakra-ui/react";

interface StatusBadgeProps {
	status: string;
}

const statusConfig: Record<
	string,
	{ color: string; borderColor: string; background?: string }
> = {
	Processed: { color: "green", borderColor: "green", background: "#EFFDED" },
	Failed: { color: "red", borderColor: "red", background: "#FEECEE" },
	Pending: { color: "orange", borderColor: "orange", background: "" },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
	const config = statusConfig[status] || { color: "gray", borderColor: "gray" };

	return (
		<Status.Root
			px={3}
			py={1}
			rounded="2xl"
			color={config.color}
			colorPalette={config.color}
			border="1px solid"
			background={config.background}
			borderColor={config.borderColor}>
			<Status.Indicator />
			{status}
		</Status.Root>
	);
}
