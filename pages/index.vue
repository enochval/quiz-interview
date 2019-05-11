<template>
<v-layout row align-center justify-center>
    <quiz v-if="start" :items="items"></quiz>

    <questions v-if="quiz"></questions>

    <result v-if="result"></result>

</v-layout>
</template>

<script>
import Quiz from '@/components/form'
import Questions from '@/components/quiz'
import Result from '@/components/result'

export default {
    computed: {
        items() {
            return Array.from(Array(this.quizLength).keys(), n => n + 1)
        },
        start() {
            return this.$store.state.start
        },
        quiz() {
            return this.$store.state.quiz
        },
        result() {
            return this.$store.state.result
        }
    },
    async asyncData({ app }) {
        const { data } = await app.$api.getTotalQuizLength()
        return { quizLength: data.data }
    },
    components: {
        Quiz,
        Questions,
        Result
    },
    methods: {
        submitQuiz() {
            this.quiz = !this.quiz
            this.result = !this.result
        },
        takeAnotherQuiz() {
            this.start = !this.start
            this.result = !this.result
        }
    }
}
</script>

<style>
.v-input input {
    max-height: 15px;
}

.v-text-field input {
    line-height: 14px;
}

.v-text-field.v-text-field--solo .v-input__control {
    min-height: 38px;
}

.v-input__slot {
    margin-bottom: 0px;
}

.v-text-field .v-input__prepend-inner {
    padding-right: 14px;
}

.v-icon {
    font-size: 18px;
}

.v-text-field.v-text-field--enclosed .v-text-field__details {
    margin-bottom: 5px;
}

.v-input {
    font-size: 13px;
}
</style>
