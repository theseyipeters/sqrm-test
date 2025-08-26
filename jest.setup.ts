import "@testing-library/jest-dom";

// Polyfill for Chakra's use of structuredClone
if (typeof global.structuredClone === "undefined") {
	global.structuredClone = (val: any) => {
		// Handle null/undefined directly
		if (val === null || val === undefined) return val;

		// For JSON-safe values
		try {
			return JSON.parse(JSON.stringify(val));
		} catch {
			// For non-serializable (functions, symbols, React nodes, etc.)
			// just return the original reference (enough for tests)
			return val;
		}
	};
}

// Polyfill for Chakra's use of matchMedia (useMediaQuery)
if (!window.matchMedia) {
	window.matchMedia = (query: string) => ({
		matches: false, // pretend all queries are false by default
		media: query,
		onchange: null,
		addListener: () => {}, // deprecated
		removeListener: () => {}, // deprecated
		addEventListener: () => {},
		removeEventListener: () => {},
		dispatchEvent: () => false,
	});
}
