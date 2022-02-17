export const CONTRACT_ADDRESS =
  import.meta.env.VITE_CONTRACT_ADDRESS ||
  '0xE41D6D1cFe55A0fc2035dD663D873D15f21d93c2'

export const OPENSEA_BASE_URL =
  import.meta.env.VITE_OPENSEA_BASE_URL ||
  'https://opensea.io/assets/0x855BCa56D00F3f550D0c610BBF562FEBF6540bc6'

export const EXPLORER_BASE_URL =
  import.meta.env.VITE_EXPLORER_BASE_URL || 'https://polygonscan.com/tx/'

export const NETWORK = import.meta.env.VITE_NETWORK || 137

export const VITE_TEST = import.meta.env.VITE_TEST || false

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://0.0.0.0:4000'

export const BASE_URL =
  import.meta.env.VITE_BASE_URL || 'https://bufficorns.com'

export const POLLER_MILLISECONDS = import.meta.env.VITE_POLLER_MILLISECONDS
  ? parseInt(import.meta.env.VITE_POLLER_MILLISECONDS)
  : 5000

export const TIME_TO_MINT_MILLISECONDS = import.meta.env
  .VITE_TIME_TO_MINT_MILLISECONDS
  ? parseInt(import.meta.env.VITE_TIME_TO_MINT_MILLISECONDS)
  : 1645131600000

export const DEMO_ENDS_TIMESTAMP = import.meta.env.VITE_DEMO_ENDS_TIMESTAMP
  ? parseInt(import.meta.env.VITE_DEMO_ENDS_TIMESTAMP)
  : 1645131600000

export const GAME_ENDS_TIMESTAMP = import.meta.env.VITE_GAME_ENDS_TIMESTAMP
  ? parseInt(import.meta.env.VITE_GAME_ENDS_TIMESTAMP)
  : 1645351200000

export const PLAYER_MAINNET_TIMESTAMP = import.meta.env.PLAYER_MAINNET_TIMESTAMP
  ? parseInt(import.meta.env.VITE_PLAYER_MAINNET_TIMESTAMP)
  : 1645131600 // Thursday, February 17, 2022 09:00:00 PM (UTC)

export const RANCHES = {
  ['Opolis Reservation']: 'opolis',
  [`The Ol' Algoranch`]: 'algorand',
  [`Vega Slopes Range`]: 'vega',
  [`Balancer Peak State`]: 'balancer',
  [`Gold Reef Co.`]: 'reef',
  [`Infinite Harmony Farm`]: 'harmony',
  ['WITNET_RANCH']: 'witnet'
}
export const ATTRIBUTES = {
  coat: {
    key: 'coat',
    label: 'coat',
    color: '#cc1919',
    resource: 'Warm Hay'
  },
  coolness: {
    key: 'coolness',
    label: 'coolness',
    color: '#217821',
    resource: 'Fresh Grass'
  },
  intelligence: {
    key: 'intelligence',
    label: 'intellect',
    color: '#1a1a1a',
    resource: 'Smart Sedge'
  },
  speed: {
    key: 'speed',
    label: 'speed',
    color: '#ffad00',
    resource: 'Mighty Acorn'
  },
  stamina: {
    key: 'stamina',
    label: 'stamina',
    color: '#124ca1',
    resource: 'Tireless Water'
  },
  vigor: {
    key: 'vigor',
    label: 'vigor',
    color: '#512791',
    resource: 'Hearty Berry'
  }
}

export const BUFFICORN_NAMES = {
  // reef
  'Bufficorn-0': 'Reeffalo',
  'Bufficorn-6': 'Denkocheski',
  'Bufficorn-12': 'Netherdake',
  'Bufficorn-18': 'Coralreef',
  // harmony
  'Bufficorn-1': 'Ubi-ONE',
  'Bufficorn-7': 'JiLiang',
  'Bufficorn-13': 'Harmonaut',
  'Bufficorn-19': 'Rongland',
  // balancer
  'Bufficorn-2': 'BALlercorn',
  'Bufficorn-8': 'AMMcorn',
  'Bufficorn-14': 'Ferntalik',
  'Bufficorn-20': 'BALlicorn',
  // algorand
  'Bufficorn-3': 'ZKcorn',
  'Bufficorn-9': 'Micalicorn',
  'Bufficorn-15': 'Mr.Grantsalot',
  'Bufficorn-21': 'Buffirand',
  // vega
  'Bufficorn-4': 'VeganRose',
  'Bufficorn-10': 'DeFiantBill',
  'Bufficorn-16': 'MarnyJoe',
  'Bufficorn-22': 'LiquidArnold',
  // opolis
  'Bufficorn-5': '0xb055',
  'Bufficorn-11': 'JoshuaCorn',
  'Bufficorn-17': 'PallerCorn',
  'Bufficorn-23': 'Sporks'
}

export const STATS_FILTERS = {
  players: {
    key: 'players',
    active: false,
    default: 'overall',
    showSubtabs: false,
    subTabs: {
      overall: {
        key: 'overall',
        active: false
      }
    }
  },
  bufficorns: {
    key: 'bufficorns',
    active: false,
    default: 'overall',
    showSubtabs: true,
    subTabs: {
      overall: {
        key: 'overall',
        active: false
      },
      coat: {
        key: 'coat',
        active: false
      },
      coolness: {
        key: 'coolness',
        active: false
      },
      intelligence: {
        key: 'intelligence',
        active: false
      },
      speed: {
        key: 'speed',
        active: false
      },
      stamina: {
        key: 'stamina',
        active: false
      },
      vigor: {
        key: 'vigor',
        active: false
      }
    }
  },
  ranches: {
    key: 'ranches',
    active: false,
    default: 'overall',
    showSubtabs: false,
    subTabs: {
      overall: {
        key: 'overall',
        active: false
      }
    }
  }
}
