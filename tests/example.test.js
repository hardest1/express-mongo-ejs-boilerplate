
const request = require('supertest')

const { app } = require('../app/server')

describe('Check API Endpoints', () => {

  it('should get the correct version number', async () => {

    const res = await request(app)
      .get('/api/info')
      .send()

    expect(res.statusCode).toEqual(200)

    expect(res.body).toHaveProperty('version')

    expect(res.body.version).toEqual(APP_VERSION)

  })

})