const css2json = require('css2json')

function loader (source) {
  const logger = this.getLogger('css-to-json')
  logger.info('hello Logger')
  logger.info(this.resourcePath)
  const rules = Object.entries(css2json(source))
    .map(
      ([selector, block]) =>
        `"${formatSelector(selector)}":"${concatBlock(block)}"`
    )
    .join(',')
  return `/* eslint-disable */\nexport default {${rules}}\n/* eslint-enable */\n`
}

function formatSelector (selector) {
  return _fixQuote(selector).replace(/\r?\n/g, ' ')
}

function concatBlock (value) {
  const block = Object.entries(value)
    .map(([property, value]) => `${property}:${encodeURIComponent(value)}`)
    .join(';')

  return _fixQuote(block)
}

function _fixQuote (str) {
  return str.replace(/"/g, "'")
}


module.exports = loader
