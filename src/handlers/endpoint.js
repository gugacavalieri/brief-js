const jsonDiff = require('json-diff')

class EndpointHandler {
  constructor (httpClient, domains, logger) {
    this.httpClient = httpClient
    this.domains = domains
    this.logger = logger
  }

  async handle (endpoints) {
    endpoints.forEach(this.forEachEndpoint, this)
  }

  async forEachEndpoint (endpoint) {
    const oldApiRequest = this.httpClient(Object.assign({}, endpoint, { url: `${this.domains.old}/${endpoint.url}` }))
    const newApiRequest = this.httpClient(Object.assign({}, endpoint, { url: `${this.domains.new}/${endpoint.url}` }))

    const results = await Promise.all([oldApiRequest, newApiRequest]).catch(this.logger.error)

    this.logger.info('called endpoints:', `${endpoint.url}`)
    this.logger.info('got responses:', results[0].status, results[1].status)
    this.logger.error(jsonDiff.diffString(results[0].data, results[1].data))
  }
}

module.exports = EndpointHandler
