import { EventEmitter } from 'node:events'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import send2server from 'vite-plugin-send2server'
import { config } from './send2server.config'

EventEmitter.defaultMaxListeners = 0

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        UnoCSS(),
        send2server(config),
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
