// src/services/User.js

import Api from '@/services/Api'

export default {
  fetchSession () {
    return Api().get('user/session')
  }
}