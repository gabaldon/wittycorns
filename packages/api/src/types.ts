import { Static, Type } from '@sinclair/typebox'

export const ClaimPlayerParams = Type.Object({
  key: Type.String(),
})
export type ClaimPlayerParams = Static<typeof ClaimPlayerParams>

export enum RanchName {
  Ranch1,
  Ranch2,
  Ranch3,
  Ranch4,
  Ranch5,
  Ranch6,
}

export const Bufficorn = Type.Object({
  name: Type.String(),
  ranch: Type.String(),
  vigor: Type.Integer(),
  speed: Type.Integer(),
  coolness: Type.Integer(),
  stamina: Type.Integer(),
  coat: Type.Integer(),
  agility: Type.Integer(),
  medals: Type.Array(Type.Optional(Type.String()))
})

export type Bufficorn = Static<typeof Bufficorn>

export const Ranch = Type.Object({
  name: Type.String(),
  bufficorn1: Bufficorn,
  bufficorn2: Bufficorn,
  bufficorn3: Bufficorn,
  bufficorn4: Bufficorn,
  medals: Type.Array(Type.Optional(Type.String())),
  resource: Type.String(),
})

export type Ranch = Static<typeof Ranch>

export const DbRanch = Type.Object({
  name: Type.String(),
  resource: Type.String(),
  medals: Type.Array(Type.Optional(Type.String())),
})

export type DbRanch = Static<typeof DbRanch>

export enum Trait {
  vigor,
  speed,
  stamina,
  coolness,
  coat,
  agility
}

export const Player = Type.Object({
  key: Type.String(),
  token: Type.Optional(Type.String()),
  username: Type.String(),
  points: Type.Integer(),
  lastTradeIn: Type.Optional(Type.Integer()),
  lastTradeOut: Type.Optional(Type.Integer()),
  medals: Type.Array(Type.Optional(Type.String()))
})

export type Player = Static<typeof Player>

export const DbPlayer = Type.Object({
  key: Type.String(),
  token: Type.Optional(Type.String()),
  username: Type.String(),
  ranch: Type.String(),
  points: Type.Integer(),
  lastTradeIn: Type.Optional(Type.Integer()),
  lastTradeOut: Type.Optional(Type.Integer()),
  medals: Type.Array(Type.Optional(Type.String()))
})

export type DbPlayer = Static<typeof DbPlayer>

//TODO: define Medal type
export const Medal = Type.String()
export type Medal = Static<typeof Medal>






export const IndexedEgg = Type.Intersect([
  Player,
  Type.Object({ rarityIndex: Type.String() }),
])
export type IndexedEgg = Static<typeof IndexedEgg>

export const AuthorizationHeader = Type.Object({
  Authorization: Type.String(),
})
export type AuthorizationHeader = Static<typeof AuthorizationHeader>

export const GetByStringKeyParams = Type.Object({
  key: Type.String(),
})
export type GetByStringKeyParams = Static<typeof GetByStringKeyParams>

export const JwtVerifyPayload = Type.Object({
  id: Type.String(),
  iat: Type.Number(),
})
export type JwtVerifyPayload = Static<typeof JwtVerifyPayload>

export const EggProtected = Type.Object({
  color: Type.Number(),
  index: Type.Number(),
  rarityIndex: Type.String(),
  score: Type.Number(),
  username: Type.Optional(Type.String()),
})
export type EggProtected = Static<typeof EggProtected>

export const IncubateParams = Type.Object({
  target: Type.String(),
})
export type IncubateParams = Static<typeof IncubateParams>

export const Incubation = Type.Object({
  to: Type.String(),
  from: Type.String(),
  timestamp: Type.Number(),
  ends: Type.Number(),
  points: Type.Number(),
})
export type Incubation = Static<typeof Incubation>

export const ExtendedIncubation = Type.Object({
  to: Type.String(),
  from: Type.String(),
  timestamp: Type.Number(),
  ends: Type.Number(),
  points: Type.Number(),
  remainingDuration: Type.Number(),
  remainingCooldown: Type.Number(),
})
export type ExtendedIncubation = Static<typeof ExtendedIncubation>

export const MintParams = Type.Object({
  address: Type.String(),
})
export type MintParams = Static<typeof MintParams>

export const MintOutput = Type.Object({
  envelopedSignature: Type.Object({
    message: Type.String(),
    messageHash: Type.Optional(Type.String()),
    signature: Type.String(),
  }),
  data: Type.Object({
    address: Type.String(),
    index: Type.Number(),
    rank: Type.Number(),
    score: Type.Number(),
    total: Type.Number(),
  }),
})
export type MintOutput = Static<typeof MintOutput>

export const EggMetadata = Type.Object({
  // TODO: verify that it does not break anything with OpenSea
  token_id: Type.Number(),
  name: Type.String(),
  description: Type.String(),
  image_data: Type.String(),
  external_url: Type.String(),
  attributes: Type.Array(
    Type.Object({
      trait_type: Type.String(),
      value: Type.Union([Type.String(), Type.Number()]),
    })
  ),
})

export type EggMetadata = Static<typeof EggMetadata>

export const GetByNumericKeyParams = Type.Object({
  key: Type.Number(),
})
export type GetByNumericKeyParams = Static<typeof GetByNumericKeyParams>
