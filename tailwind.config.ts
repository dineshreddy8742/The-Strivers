import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
    darkMode: "class",
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
    theme: {
    		extend: {
    			colors: {
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
    				},
            // New custom colors
            'background-light': '#f8f9fa',
            'background-neutral': '#e9ecef',
            'card-bg': '#ffffff',
            'primary-bold': '#2255a6',
            'primary-accent': '#4f8fff',
            'secondary-gray': '#6c757d',
            'heading-dark': '#2d3748',
            'metric-positive': '#2ecc40',
            'metric-warning': '#ffa726',
            'metric-negative': '#f44336',
            'button-primary': '#1976d2',
            'button-secondary': '#43b581',
            'button-warning': '#ff9800',
            'border-light': '#e0e0e0',
            'border-accent': '#b3d6ea',
            'divider-light': '#ededed',
            'divider-blue': '#dbeafe',
    			},
    			borderRadius: {
    				lg: 'var(--radius)',
    				md: 'calc(var(--radius) - 2px)',
    				sm: 'calc(var(--radius) - 4px)'
    			}
    		}
    	},
    	plugins: [tailwindcssAnimate],
    };
    export default config;
