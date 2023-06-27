export default () => {
  switch (process.env.BABEL_MODE) {
    case 'module':
      return {
        presets: [
          [
            '@babel/preset-env',
            {
              modules: false,
            },
          ],
        ],
      }
    default:
      return {
        plugins: [
          [
            'replace-import-extension',
            {
              extMapping: { '.js': '.cjs' },
            },
          ],
        ],
        presets: [
          [
            '@babel/preset-env',
            {
              modules: 'commonjs',
              forceAllTransforms: true,
            },
          ],
        ],
      }
  }
}
