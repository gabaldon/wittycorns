import { server } from '../../setup'

const initialPlayers = [
  {
    key: 'ef12efbd765f9ad3',
    username: 'calm-bison',
  },
  {
    key: 'b75c34545e8cb4d2',
    username: 'particular-newt',
  },
]

function authenticatePlayer() {
  return async (index: number): Promise<string> =>
    new Promise((resolve) => {
      server.inject(
        {
          method: 'POST',
          url: '/auth',
          payload: { key: initialPlayers[index].key },
        },
        (err, response) => {
          //t.error(err)
          //t.equal(response.statusCode, 200)
          console.log(`Error: ${err}`)
          console.log(`Response: ${response}`)

          resolve(response.json().token)
        }
      )
    })
}

describe('authentication.ts', () => {
  it('should authenticate PLAYER #0', (done) => {
    server.inject(
      {
        method: 'POST',
        url: '/auth',
        payload: { key: initialPlayers[0].key },
      },
      (err, response) => {
        console.log('-----', response.json())
        const { key, token, username } = response.json()

        expect(key).toBeTruthy()
        expect(token).toBeTruthy()
        expect(username).toBeTruthy()

        done()
      }
    )
  })
})
