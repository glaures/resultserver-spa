import Vue from 'vue'
import {library} from '@fortawesome/fontawesome-svg-core'
import {
    faSave,
    faTimesCircle,
    faPlusCircle,
    faExclamationCircle
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

library.add(faSave)
library.add(faTimesCircle)
library.add(faPlusCircle)
library.add(faExclamationCircle)

Vue.component('fas', FontAwesomeIcon)

