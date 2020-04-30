const EndpointHandler = require('../../src/handlers/endpoint')
const axios = require('axios')
const domains = { new: 'https://jsonplaceholder.typicode.com', old: 'https://jsonplaceholder.typicode.com' }
const loggerMock = { info: jest.fn(), error: jest.fn() }
const endpointHandler = new EndpointHandler(axios, domains, loggerMock)
jest.setTimeout(30000)

beforeEach(() => {
  loggerMock.info.mockClear()
  loggerMock.error.mockClear()
})

describe('endpoint.test.js', () => {
  it('should log endpoint call', async () => {
    await endpointHandler.forEachEndpoint({ method: 'get', url: 'todos/1' })
    expect(loggerMock.info).toHaveBeenNthCalledWith(1, 'called endpoints:', 'todos/1')
  })
  it('should log response code', async () => {
    await endpointHandler.forEachEndpoint({ method: 'get', url: 'todos/1' })
    expect(loggerMock.info).toHaveBeenNthCalledWith(2, 'got responses:', 200, 200)
  })
  it('should log response diff', async () => {
    await endpointHandler.forEachEndpoint({ method: 'get', url: 'todos/1' })
    expect(loggerMock.error).toHaveBeenCalledWith('')
  })
  it('log diff when running different endpoints', async () => {
    const diffDomains = { new: 'https://jsonplaceholder.typicode.com/posts/1', old: 'https://jsonplaceholder.typicode.com/posts/2' }
    const diffEndpointHandler = new EndpointHandler(axios, diffDomains, loggerMock)

    await diffEndpointHandler.forEachEndpoint({ method: 'get', url: '' })
    expect(loggerMock.error).toHaveBeenCalledWith(expect.stringContaining('id: 2'))
    expect(loggerMock.error).toHaveBeenCalledWith(expect.stringContaining('body:'))
  })
})
