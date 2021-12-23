import { MongoClient } from 'mongodb'
import Fastify from 'fastify'
import { app } from '../src/app'
import { FastifyInstance } from 'fastify'

let server: FastifyInstance

let client = new MongoClient(process.env.MONGO_URI)
let db

beforeAll(async () => {
  client = await client.connect()
  db = await client.db(process.env.MONGO_INITDB_DATABASE)
})

beforeEach(async () => {
  // Drop mongodb collections
  try {
    await client
      .db(process.env.MONGO_INITDB_DATABASE)
      .listCollections()
      .forEach((collection) => {
        client
          .db(process.env.MONGO_INITDB_DATABASE)
          .dropCollection(collection.name)
      })
  } catch (err) {
    console.error('Error dropping mongo', err)
  }

  server = Fastify().register(app)
})

afterAll(async () => {
  await client.close()
})

afterEach(async () => {
  await server.close()
})

export { server }
