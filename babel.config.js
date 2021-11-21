module.exports = (api) => {
  api.cache.never()
  switch (process.env.BABEL_MODE) {
    case 'module':
      return {
        plugins: [
          [
            'module-extension-resolver',
            {
              extensionsToKeep: ['.js', '.json'],
            },
          ],
        ],
      }
    default:
      return {
        plugins: [
          [
            '@babel/plugin-transform-runtime',
            {
              absoluteRuntime: false,
              corejs: false,
              helpers: true,
              regenerator: true,
              useESModules: false,
            },
          ],
        ],
        presets: [
          [
            '@babel/preset-env',
            {
              forceAllTransforms: true,
            },
          ],
        ],
      }
  }
}
