import { FastifyPluginAsync, FastifyRequest } from 'fastify'

import { LeaderboardParams, LeaderboardResponse } from '../types'
import { Ranch } from '../domain/ranch'
import { Bufficorn } from '../domain/bufficorn'
import { Player } from '../domain/player'
import { groupBufficornsByRanch } from '../utils'

const leaderboard: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {
  if (!fastify.mongo.db) throw Error('mongo db not found')

  const { playerModel, ranchModel, bufficornModel } = fastify

  //GET /leaderboard?resource=RESOURCE&limit=LIMIT&offset=OFFSET
  fastify.get<{
    Querystring: LeaderboardParams
    Reply: LeaderboardResponse | Error
  }>('/leaderboard', {
    schema: {
      querystring: LeaderboardParams,
      response: {
        200: LeaderboardResponse,
      },
    },
    handler: async (
      request: FastifyRequest<{ Querystring: LeaderboardParams }>,
      reply
    ) => {
      const bufficorns: Array<Bufficorn> = await bufficornModel.getAll()
      const sorted_bufficorns = Bufficorn.getLeaderboard(
        bufficorns,
        request.query.resource
      )

      const bufficornsByRanch = groupBufficornsByRanch(bufficorns)
      const ranches: Array<Ranch> = (await ranchModel.getAll()).map((r) => {
        r.addBufficorns(bufficornsByRanch[r.name])
        return r
      })
      const sorted_ranches = Ranch.getLeaderboard(ranches)

      const players: Array<Player> = await playerModel.getMany({
        limit: request.query.limit || 10,
        offset: request.query.offset || 0,
      })

      const totalPlayers = await playerModel.countActive()
      const paginatedPlayers = Player.getLeaderboard(
        players,
        totalPlayers,
        request.query.offset
      )

      return reply.status(200).send({
        bufficorns: sorted_bufficorns,
        ranches: sorted_ranches,
        players: paginatedPlayers,
      })
    },
  })
}

export default leaderboard
