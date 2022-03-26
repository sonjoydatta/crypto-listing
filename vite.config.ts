import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import paths from 'vite-plugin-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), paths()],
	server: {
		proxy: {
			'/api': {
				target: 'https://staging-api-pluang.pluang.org/',
				changeOrigin: true,
			},
		},
	},
});
