import Vue from 'vue'
import {POSITION, TYPE} from "vue-toastification";

const API_ERROR = 'Es gibt ein technisches Problem. Wenn Neuladen der Seite nicht hilft, bitte den Administrator kontaktieren.'
const INT_ERROR = 'Es ist ein unerwarteter Fehler aufgetreten. Bitte kontaktiere den Administrator!'

export default {
    state: {
        message: null,
        type: null,
    },
    mutations: {
        setMessage(state, message) {
            if (message == null)
                state.message = null;
            else {
                state.message = message.message;
                state.type = message.type;
                let type = TYPE.SUCCESS
                if (message.type === 'danger')
                    type = TYPE.ERROR
                if (message.type === 'warning')
                    type = TYPE.WARNING
                Vue.$toast(state.message, {
                    position: POSITION.BOTTOM_RIGHT,
                    type: type
                })
            }
        }
    },
    actions: {
        showMessage({commit, dispatch}, message) {
            dispatch('clearMessages')
            commit('setMessage', message);
        },
        handleError({dispatch}, err) {
            window.console.log('handleErrorAction(' + err + ')')
            let msg = ''
            let type = 'danger'
            if (err.response) {
                // client received an error response (5xx, 4xx)
                msg = err.response.data
                if (err.response.status < 500)
                    type = 'warning'
            } else if (err.request) {
                // client never received a response, or request never left
                msg = API_ERROR
            } else {
                // anything else
                msg = INT_ERROR
            }
            dispatch('showMessage', {
                message: msg,
                type: type
            })
        },
        clearMessages({commit}) {
            commit('setMessage', null);
        }
    },
    getters: {
        message(state) {
            return state.message;
        },
        messageType(state) {
            return state.type;
        }
    }
}
