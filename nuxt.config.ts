import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-04-03",
	css: ["@/assets/tailwind.css"],
	plugins: ["@/plugins/store"],
	devtools: { enabled: false },
	ssr: true,

	vite: {
		optimizeDeps: {
			include: ["vue", "vue-router", "vuex"],
		},
	},
	build: {
		transpile: ["@nuxt/"],
	},
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
});
