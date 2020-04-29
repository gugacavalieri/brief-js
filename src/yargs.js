const argv = require('yargs')
  .option('config', {
    alias: 'c',
    type: 'string',
    description: 'Config file path'
  })
  .usage('Usage: $0 -c [configFile]')
  .demandOption(['c'])
  .argv

module.exports = argv
