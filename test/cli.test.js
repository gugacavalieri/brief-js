/* mock dependencies */
jest.mock('../src/yargs')
const logger = require('../src/logger/console')
jest.mock('../src/logger/console')
const cli = require('../src/cli')

describe('cli.test.js', () => {
  it('it should call logger to print endpoints first', async () => {
    await cli.run()
    expect(logger.info).toHaveBeenCalledWith('found endpoints:', [{ method: 'get', url: 'todos/1' }])
  })
})
