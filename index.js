module.exports = RMMigrate;

function RMMigrate (backup, options) {
  return require('webhook-migrate')(backup, options)
}