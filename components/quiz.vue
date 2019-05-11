<template>
<v-flex xs8>
    <v-sheet class="my-border my-shadow" width="100%">
        <v-form ref="form" v-model="valid">
            <v-layout row justify-center align-center>
                <v-flex xs8>
                    <div class="text-xs-center title pa-2">Note: All questions are compulstory.</div>
                    <div class="text-xs-center title pa-2 mb-4 ">Name: {{requestBody.fullName}}</div>
                </v-flex>
            </v-layout>
            <v-layout row wrap align-center justify-center pa-4>
                <v-flex xs12>
                    <v-container>
                        <div v-for="(quiz, i) in quizQuestions" :key="quiz._id">
                            <div class="title">{{`${i+1}. ${quiz.question}`}}</div>
                            <v-radio-group :rules="[rules.required]">
                                <v-radio @change="setAnswer(quiz._id, p)" v-for="(option, p) in quiz.options" :key="option" :label="`${option}`" :value="p"></v-radio>
                            </v-radio-group>
                        </div>
                    </v-container>
                </v-flex>
                <v-btn @click="submitQuiz" color="primary" class="text-capitalize">
                    Submit Quiz
                    <v-icon right>check</v-icon>
                </v-btn>
            </v-layout>
        </v-form>
    </v-sheet>
</v-flex>
</template>

<script>

export default {
    data: () => ({
        valid: true,
        rules: {
            required: value => !!value || 'This question is required',
        },
        answers: []
    }),
    computed: {
        quizQuestions() {
            return this.$store.state.quizQuestions
        },
        requestBody() {
            return this.$store.state.requestBody
        }
    },
    methods: {
        async submitQuiz() {
            if (this.$refs.form.validate()) {
                this.$store.commit('setAnswersProvided', this.answers)
                await this.$store.dispatch('submitQuiz', this.requestBody)
            }
        },
        setAnswer(questionID, optionSelected) {
            const tempAnswer = {
                questionID,
                optionSelected
            }
            let temp = false
            if (this.answers.length) {
                this.answers.forEach((item, key) => {
                    if (item.questionID == questionID) {
                        Object.assign(item, tempAnswer)
                        temp = true
                    }
                })
                if (!temp) {
                    this.answers.push(tempAnswer)
                }
            } else {
                this.answers.push(tempAnswer)
            }
        }
    }
}
</script>

<style>

</style>
