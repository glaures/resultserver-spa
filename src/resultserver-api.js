import axios from 'axios'

const instance = axios.create({
    baseURL: String
});

instance.setBaseURL = (url) => {
    window.console.log('Resultserver API base URL: ' + url)
    instance.defaults.baseURL = url
}

instance.setBaseURL(process.env.VUE_APP_RESULTSERVER_API_URL)

export default instance;


