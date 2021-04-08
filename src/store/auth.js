import Vue from 'vue'
import Vuex from 'vuex'
import resultserverApi from '@/resultserver-api'
import jwtDecoder from "jwt-decode";

Vue.use(Vuex)

const TOKEN_NAME = 'resultserver-token'

export default {
    state: {
        token: null
    },
    mutations: {
        setToken(state, token) {
            state.token = token
        }
    },
    actions: {
        async login({commit}, credentials) {
            let response = await resultserverApi.post('/login', credentials)
            console.log('response: ' + response)
            if (response.status === 200) {
                let token = response.data
                commit('setToken', token)
                console.log(jwtDecoder(token))
                resultserverApi.setAuthtoken('Bearer ' + token)
                localStorage.setItem(TOKEN_NAME, token)
            } else {
                throw new Error("Die Anmeldung ist fehlgeschlagen. Bitte versuche es erneut!")
            }
        },
        async autoLogin({commit}) {
            let token = localStorage.getItem(TOKEN_NAME)
            if (token) {
                resultserverApi.setAuthtoken(token)
                commit('setToken', token)
            }
        }
    },
    getters: {
        loggedIn(state) {
            return state.token
        }
    }
}

