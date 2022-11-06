import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    root: resolve(__dirname, 'src'),
    publicDir: resolve(__dirname, 'public'),
    build: {
        outDir: resolve(__dirname, 'dist'),
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html'),
                countdown: resolve(__dirname, 'src/countdown/index.html')
            }
        }
    }
})