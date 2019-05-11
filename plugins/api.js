const apiFactory = axios => ({
    getTotalQuizLength() {
        return axios.get('quiz-length')
    },
    getQuizQuestions(payload) {
        return axios.post('start-quiz', payload)
    },
    submitQuiz(payload) {
        return axios.post('submit-quiz', payload)
    }
})
  
/*
** Executed by ~/.nuxt/index.js with context given
** This method can be asynchronous
*/
export default ({ $axios }, inject) => {
    // Inject `api` key
    // -> app.$api
    // -> this.$api in vue components
    // -> this.$api in store actions/mutations
    const api = apiFactory($axios)
    inject("api", api)
}