import axios from 'axios'

import { API_BASE_URL } from './constants'

export class WittyCreaturesApi {
  constructor () {
    this.baseUrl = API_BASE_URL
  }

  _handleResponse (response) {
    if (response && response.data) {
      return response.data
    }
  }

  _handleError (error) {
    return { error }
  }

  _get ({ url, params }) {
    return axios
      .get(url, params)
      .then(this._handleResponse)
      .catch(this._handleError)
  }

  _post ({ url, data, params }) {
    return axios
      .post(url, data, params)
      .then(this._handleResponse)
      .catch(this._handleError)
  }

  claim (params) {
    return {
      error: {
        response: {
          data: { message: `Error claiming your id with key ${params.key}` }
        }
      }
    }
  }

  getFarmerInfo (params) {
    return {
      error: {
        response: { data: `Error getting user info` }
      }
    }
  }

  getContractArgs ({ address, token }) {
    return this._post({
      url: `${this.baseUrl}/mint`,
      data: { address },
      params: { headers: { authorization: token } }
    })
  }
}
