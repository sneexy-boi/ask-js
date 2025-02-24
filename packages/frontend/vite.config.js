import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

const apiurl = process.env.ASK_API_URL
	? process.env.ASK_API_URL
	: `http://localhost:3579/`;

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		proxy: {
			'/api': {
				target: apiurl,
				changeOrigin: true
			}
		}
	},
	css: {
		preprocessorOptions: {}
	}
});
