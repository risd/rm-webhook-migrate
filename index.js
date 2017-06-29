module.exports = RMMigrate;

function RMMigrate (backup, options, callback) {
  return require('webhook-migrate')(backup, options, callback )
}