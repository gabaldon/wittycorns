import { FastifyPluginAsync, FastifyRequest } from 'fastify'
import { Bufficorn } from '../domain/bufficorn'
import { Ranch } from '../domain/ranch'

import {
  AuthorizationHeader,
  ExtendedPlayerVTO,
  GetByStringKeyParams,
  JwtVerifyPayload,
} from '../types'

const players: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  if (!fastify.mongo.db) throw Error('mongo db not found')

  const { playerModel, ranchModel, bufficornModel } = fastify

  fastify.get<{
    Params: GetByStringKeyParams
    Reply: ExtendedPlayerVTO | Error
  }>('/players/:key', {
    schema: {
      params: GetByStringKeyParams,
      headers: AuthorizationHeader,
      response: {
        200: ExtendedPlayerVTO,
      },
    },
    handler: async (
      request: FastifyRequest<{ Params: { key: string } }>,
      reply
    ) => {
      const { key } = request.params
      let playerKey: string
      try {
        const decoded: JwtVerifyPayload = fastify.jwt.verify(
          request.headers.authorization as string
        )
        playerKey = decoded.id
      } catch (err) {
        return reply.status(403).send(new Error(`Forbidden: invalid token`))
      }
      if (playerKey !== key)
        return reply.status(403).send(new Error(`Forbidden: invalid token`))

      // Unreachable: valid server issued token refers to non-existent player
      const player = await playerModel.get(key)
      if (!player) {
        return reply
          .status(404)
          .send(new Error(`Player does not exist (key: ${key})`))
      }

      // Unreachable: valid server issued token refers to an unclaimed player
      if (!player.token) {
        return reply
          .status(405)
          .send(new Error(`Player has not been claimed yet (key: ${key})`))
      }

      //GET RANCH Info
      const ranch: Ranch = (await ranchModel.getByName(player.ranch)) as Ranch

      const ranchBufficorns: Array<Bufficorn> =
        (await bufficornModel.getBufficornsByRanch(
          player.ranch
        )) as Array<Bufficorn>

      ranch.addBufficorns(ranchBufficorns)

      // return extended player
      return reply.status(200).send(
        await player.toExtendedPlayerVTO(ranch, {
          // get last incoming trade
          lastTradeIn: await fastify.tradeModel.getLast({
            from: player.username,
          }),
          // get last outgoing trade
          lastTradeOut: await fastify.tradeModel.getLast({
            to: player.username,
          }),
        })
      )
    },
  })
}

export default players
