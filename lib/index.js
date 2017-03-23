'use strict'

const debug = require('debug')('metalsmith-collections-filter')
const { filter } = require('lodash')

module.exports = opts => ((files, metalsmith, done) => {
  const metadata = metalsmith.metadata()
  const keys = Object.keys(opts)

  keys.forEach(key => {
    debug(`filtering collection: ${key}`)
    metadata[key] = filter(metadata[key], opts[key])
  })

  done()
})
