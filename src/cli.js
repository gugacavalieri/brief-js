#!/usr/bin/env node
const argv = require('./yargs')
const logger = require('./logger/console')
const axios = require('axios')
const EndpointHandler = require('./handlers/endpoint')
const fs = require('fs')
const config = JSON.parse(fs.readFileSync(argv.config, 'utf8'))

const axiosInstance = axios.create({
  ...config.http
})

const endpointHandler = new EndpointHandler(axiosInstance, { ...config.domains }, logger)

/**
 * main function
 */
const run = async () => {
  logger.info('found endpoints:', config.endpoints)
  await endpointHandler.handle(config.endpoints)
};

/* run main function */
(() => {
  run()
})()

module.exports = { run }
