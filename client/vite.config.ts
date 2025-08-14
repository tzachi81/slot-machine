import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: 'game.ts',
      name: 'SlotMachine',
      fileName: 'game',
      formats: ['umd']
    }
  },
  plugins: [dts()]
});