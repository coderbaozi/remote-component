// @ts-check
import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import externalGlobals from 'rollup-plugin-external-globals'

import { nodeResolve } from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import typescript from '@rollup/plugin-typescript'
import fg from 'fast-glob'

const dir = 'dist'

/**
 * @type {import('rollup').RollupOptions}
 */
const baseConfig = {
  plugins: [
    externalGlobals({
      'react': 'React',
      'react-dom': 'ReactDOM',
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'preventAssignment': true,
    }),
    nodeResolve(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: false,
    }),
    // minify(),
  ],
  treeshake: true,
  external: ['react', 'react-dom'],
}

function makeRollupConfig() {
  const paths = path.resolve(dirname(fileURLToPath(import.meta.url)), 'src/components')
  const files = fg.sync(`${paths}/**`, { objectMode: true })
  const config = files.map((file) => {
    const filename = file.name
    const [name, ext] = filename.split('.')
    if (ext !== 'tsx')
      return

    /**
     * @type {import('rollup').RollupOptions}
     */
    return {
      ...baseConfig,
      input: `src/components/${name}.tsx`,
      output: [
        {
          file: `${dir}/components/${name}.js`,
          format: 'umd',
          sourcemap: false,
          name: `REMOTE.${name}`,
        },
      ],
    }
  }).filter(Boolean)

  return config
}

export default makeRollupConfig()
