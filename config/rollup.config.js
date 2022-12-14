import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.ts',
  output: [
    {
      format: 'iife',
      file: 'dist/bundle/topic-carousel.min.js',
      name: 'TopicCarousel',
      plugins: [terser()],
    },
    {
      format: 'iife',
      file: 'dist/bundle/topic-carousel.js',
      name: 'TopicCarousel',
    },
    {
      dir: 'dist/esm',
      format: 'esm',
      preserveModules: true,
    },
    {
      dir: 'lib/cjs',
      format: 'cjs',
      preserveModules: true,
    },
    {
      dir: 'lib/esm',
      format: 'esm',
      preserveModules: true,
    },
  ],
  plugins: [
    typescript({
      declaration: false,
      module: 'esnext',
      declarationMap: false,
      declarationDir: undefined,
      tsconfig: 'config/tsconfig.build.json',
    }),
  ],
};
