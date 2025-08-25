export const calcPercentageChange = (current: number, prev: number) => {
	if (prev === 0) return "0.00%";
	const change = ((current - prev) / prev) * 100;
	return `${change.toFixed(2)}%`;
};
