// src/services/Api.js

import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: `/api`,
    headers: {'Cache-Control': 'no-cache, no-store, no-transform'}
  })
}