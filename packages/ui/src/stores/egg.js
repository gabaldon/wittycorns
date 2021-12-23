import { defineStore } from 'pinia'
import { WittyCreaturesApi } from '@/api'
import router from '../router'

export const useEggStore = defineStore('egg', {
  state: () => {
    return {
      api: new WittyCreaturesApi(),
      id: null,
      timeToBirth: 1645380000000,
      creaturePreview: null,
      mintInfo: null,
      color: null,
      creatureData: null,
      errors: {
        claim: null
      }
    }
  },
  getters: {
    hasBorn () {
      //FIXME: make it reactive
      return this.timeToBirth < Date.now()
    }
  },
  actions: {
    notify (payload) {
      this.app.config.globalProperties.$notify(payload)
    },
    saveClaimInfo (info) {
      localStorage.setItem(
        'tokenInfo',
        JSON.stringify({ ...this.getToken(), ...info })
      )
    },
    setCreatureData (data) {
      this.creatureData = data
    },
    savePreview (creature) {
      localStorage.setItem('creature', creature)
      this.creaturePreview = creature
    },
    saveMintInfo (info) {
      localStorage.setItem('mintInfo', JSON.stringify({ ...info }))
      this.mintInfo = info
    },
    getPreview () {
      const preview = localStorage.getItem('creature')
      if (preview) {
        this.creaturePreview = preview
      }
    },
    getMintInfo () {
      const mintInfo = JSON.parse(localStorage.getItem('mintInfo'))
      if (mintInfo) {
        this.mintInfo = mintInfo
      }
    },
    getToken () {
      return JSON.parse(localStorage.getItem('tokenInfo'))
    },
    clearError (error) {
      this.errors[error] = null
    },
    setError (name, error) {
      this.errors[name] = error.response.data.message
      this.notify({ message: this.errors[name] })
    },
    async claim ({ key }) {
      const request = await this.api.claim({ key })
      console.log('claim in claim', request)
      if (request.error) {
        router.push({ name: 'init-game' })
        this.setError('claim', request.error)
      } else if (request.token) {
        await this.saveClaimInfo(request)
        this.clearError('claim')
        this.getEggInfo()
      }
    },
    async getEggInfo () {
      const tokenInfo = this.getToken()
      if (tokenInfo) {
        const request = await this.api.getEggInfo({
          token: tokenInfo && tokenInfo.token,
          id: tokenInfo && tokenInfo.key
        })
        if (request.error) {
          router.push({ name: 'init-game' })
          this.setError('info', request.error)
        } else {
          this.clearError('info')
          const { key } = request.egg
          this.id = key

          if (this.id !== router.currentRoute.value.params.id) {
            this.incubateEgg({ key: router.currentRoute.value.params.id })
            router.push('/')
          }
        }
      } else {
        console.log('claim in get EggInfo')
        this.claim({ key: router.currentRoute.value.params.id })
      }
    },
    async getContractArgs (address) {
      const tokenInfo = this.getToken()
      const request = await this.api.getContractArgs({
        address,
        token: tokenInfo.token
      })

      this.mintInformation = request

      return this.mintCreatureParams
    }
  }
})
