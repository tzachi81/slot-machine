import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: './src/game.ts',
      name: 'SlotMachine',
      fileName: 'game',
      formats: ['umd']
    }
  },
  plugins: [dts()]
});