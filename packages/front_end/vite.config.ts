import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'

import { visualizer } from 'rollup-plugin-visualizer'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

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
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    build: {
        rollupOptions: {
            treeshake: true,
            manualChunks(id) {
                if (id.includes('@vueuse/')) {
                    return 'vueuse'
                }
            },
        },
    },
})
