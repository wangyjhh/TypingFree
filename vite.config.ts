import { fileURLToPath, URL } from "node:url"
import { visualizer } from "rollup-plugin-visualizer"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import UnoCSS from "unocss/vite"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		UnoCSS(),
		visualizer({
			open: true,
		}),
	],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
	build: {
		rollupOptions: {
			treeshake: true,
			manualChunks(id) {
				if (id.includes("pinyin")) {
					return "pinyin"
				}
				if (id.includes("@vueuse/")) {
					return "vueuse"
				}
			},
		},
	},
})
