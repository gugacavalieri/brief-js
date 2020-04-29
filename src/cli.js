#!/usr/bin/env node
const argv = require('./yargs')
const handlers = require('./handlers')

const axios = require('axios')
const jsonDiff = require('json-diff')

const fs = require('fs')
const config = JSON.parse(fs.readFileSync(argv.config, 'utf8'))

const axiosInstance = axios.create({
  ...config.http
});

(async () => {
  try {
    console.info('found endpoints:', config.endpoints)
    config.endpoints.forEach(async (endpoint) => {
      const oldApiRequest = axiosInstance(Object.assign({}, endpoint, { url: `${config.domains.old}/${endpoint.url}` }))
      const newApiRequest = axiosInstance(Object.assign({}, endpoint, { url: `${config.domains.new}/${endpoint.url}` }))

      const results = await Promise.all([oldApiRequest, newApiRequest]).catch(handlers.handleError)

      console.log('called endpoints:', `${endpoint.url}`)
      console.log('got responses:', results[0].status, results[1].status)
      console.log(jsonDiff.diffString(results[0].data, results[1].data))
    })
  } catch (error) {
  }
})()
