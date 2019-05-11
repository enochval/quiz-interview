import { submitQuiz } from "../../backend/controllers/AppController";

export const state = () => ({
    requestBody: {},
    start: true,
    quiz: false,
    result: false,
    quizQuestions: [],
    score: ''
})
  
export const mutations = {
    setUser (state, payload) {
        state.requestBody = payload
    },
    setQuizQuestions (state, payload) {
        state.quizQuestions = payload
    },
    setAnswersProvided (state, payload) {
        state.requestBody.answersProvided = payload
    },
    showQuiz(state) {
        state.start = !state.start
        state.quiz = !state.quiz
    },
    showPercentage(state) {
        state.quiz = !state.quiz
        state.result = !state.result
    },
    setScore(state, payload) {
        state.score = payload
        state.requestBody = {}
        state.quizQuestions = []
    }
}

export const actions = {
    async getQuiz({ commit }, noOfQuestions) {
        const { data } = await this.$api.getQuizQuestions({noOfQuestions})
        commit('setQuizQuestions', data.data)
    },

    async submitQuiz({ commit }, payload) {
        const { data } = await this.$api.submitQuiz(payload)
        commit('setScore', data.percentageScore)
        commit('showPercentage')
    }
}