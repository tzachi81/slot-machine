import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        rollupOptions: {
            input: 'public/index.html',
        },
        outDir: 'dist',
        emptyOutDir: true,
    },
    server: {
        port: 5500
    },
});