import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
	  extend: {
		  contrast: {
			  '25': '.15'
		  },

		  backgroundColor: {
			  primary: '#804ceb'
		  },
		  textColor: {
			  primary: '#804ceb'
		  },
		  borderColor: {
			  primary: '#804ceb'
		  },
		  outlineColor: {
			  primary: '#804ceb'
		  },
		  borderRadius: {
			  lg: 'var(--radius)',
			  md: 'calc(var(--radius) - 2px)',
			  sm: 'calc(var(--radius) - 4px)'
		  },
		  colors: {
			  ThemePrimary: {
				  100: '#e4d9fd',
				  200: '#c9b4fb',
				  300: '#ae8ef9',
				  400: '#9369f7',
				  500: '#804ceb', // Base color
				  600: '#683ecc',
				  700: '#5130ad',
				  800: '#3a228e',
				  900: '#23146f',
			  },

			  background: 'hsl(var(--background))',
			  foreground: 'hsl(var(--foreground))',
			  card: {
				  DEFAULT: 'hsl(var(--card))',
				  foreground: 'hsl(var(--card-foreground))'
			  },
			  popover: {
				  DEFAULT: 'hsl(var(--popover))',
				  foreground: 'hsl(var(--popover-foreground))'
			  },
			  primary: {
				  DEFAULT: 'hsl(var(--primary))',
				  foreground: 'hsl(var(--primary-foreground))'
			  },
			  secondary: {
				  DEFAULT: 'hsl(var(--secondary))',
				  foreground: 'hsl(var(--secondary-foreground))'
			  },
			  muted: {
				  DEFAULT: 'hsl(var(--muted))',
				  foreground: 'hsl(var(--muted-foreground))'
			  },
			  accent: {
				  DEFAULT: 'hsl(var(--accent))',
				  foreground: 'hsl(var(--accent-foreground))'
			  },
			  destructive: {
				  DEFAULT: 'hsl(var(--destructive))',
				  foreground: 'hsl(var(--destructive-foreground))'
			  },
			  border: 'hsl(var(--border))',
			  input: 'hsl(var(--input))',
			  ring: 'hsl(var(--ring))',
			  chart: {
				  '1': 'hsl(var(--chart-1))',
				  '2': 'hsl(var(--chart-2))',
				  '3': 'hsl(var(--chart-3))',
				  '4': 'hsl(var(--chart-4))',
				  '5': 'hsl(var(--chart-5))'
			  }
		  }
	  }
  },
	plugins: [require("tailwindcss-animate")],
};
export default config;
