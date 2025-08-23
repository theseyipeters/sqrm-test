import { createSystem, defaultConfig } from "@chakra-ui/react";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";

export const system = createSystem(defaultConfig, {
	theme: {
		tokens: {
			colors: {
				brand: {
					"50": { value: "#e3f9f0" },
					"100": { value: "#c6eedd" },
					"200": { value: "#99e0c3" },
					"300": { value: "#66d2a7" },
					"400": { value: "#33c48c" },
					"500": { value: "#0cab70" },
					"600": { value: "#088c5b" },
					"700": { value: "#066e47" },
					"800": { value: "#044f32" },
					"900": { value: "#02311f" },
				},
			},
			fonts: {
				heading: { value: `'Inter', sans-serif` },
				body: { value: `'Inter', sans-serif` },
			},
		},
	},
});
