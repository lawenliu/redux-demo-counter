require('babel-register')

const config = require('../config/_base')
const fs = require('fs-extra')
const debug = require('debug')('app:bin:compile')

const paths = config.utils_paths
const index = config.file_index

debug('Create webpack compiler.')
const compiler = require('webpack')(require('../config/webpack.config'))

compiler.run(function (err, stats) {
  const jsonStats = stats.toJson()

  debug('Webpack compile completed.')
  console.log(stats.toString(config.compiler_stats))

  if (err) {
    debug('Webpack compiler encountered a fatal error.', err)
    process.exit(1)
  } else if (jsonStats.errors.length > 0) {
    debug('Webpack compiler encountered errors.')
    console.log(jsonStats.errors)
    process.exit(1)
  } else if (jsonStats.warnings.length > 0) {
    debug('Webpack compiler encountered warnings.')

    if (config.compiler_fail_on_warning) {
      process.exit(1)
    }
  } else {
    debug('No errors or warnings encountered.')
  }

  debug('Copy static assets to dist folder.')
  fs.copySync(paths.client('static'), paths.dist('static'))

  debug('Copy index.html to dist folder.')
  fs.copySync(paths.client(index), paths.dist(index))
})
