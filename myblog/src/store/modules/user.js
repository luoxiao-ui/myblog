import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    }
  },
  
  actions: {
    // 前端 登出
        FedLogOut ({ commit }) {
          return new Promise(resolve => {
            commit('SET_TOKEN', '')
            removeToken()
            resolve()
          })
        }
      }
    }
    
    export default user