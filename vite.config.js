import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	base: '/',
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					// Vendor dependencies
					if (id.includes('node_modules/react')) {
						return 'vendor-react';
					}
					if (id.includes('node_modules/jotai')) {
						return 'vendor-jotai';
					}
					if (id.includes('node_modules/@tanstack/react-query')) {
						return 'vendor-query';
					}
					if (
						id.includes('node_modules/lucide-react') ||
						id.includes('node_modules/react-hot-toast')
					) {
						return 'vendor-ui';
					}

					// Core application logic
					if (id.includes('src/api')) {
						return 'core-api';
					}
					if (id.includes('src/Atoms')) {
						return 'core-atoms';
					}
					if (id.includes('src/services')) {
						return 'core-services';
					}
					if (id.includes('src/hooks')) {
						return 'core-hooks';
					}

					// Feature modules
					if (id.includes('src/components/Dashboard')) {
						return 'feature-dashboard';
					}
					if (id.includes('src/components/Common')) {
						return 'feature-common';
					}
					if (id.includes('src/components/Auth')) {
						return 'feature-auth';
					}
				},
			},
		},
	},
});
