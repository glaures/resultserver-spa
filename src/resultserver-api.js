import axios from 'axios'

const instance = axios.create({
    baseURL: String
});

instance.setBaseURL = (url) => {
    window.console.log('Resultserver API base URL: ' + url)
    instance.defaults.baseURL = url
}

instance.setAuthtoken = (authtoken) => {
    instance.defaults.headers.common['Authorization'] = authtoken
};

instance.interceptors.response.use((response) => response, (error) => {
    if (error.response && error.response.status === 401)
        return Promise.resolve(error)
});

instance.setBaseURL(process.env.VUE_APP_RESULTSERVER_API_URL)

export default instance;
