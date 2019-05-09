<template>
<v-layout row align-center justify-center>
    <quiz v-if="start">
        <v-btn @click="startQuiz" color="primary" class="text-capitalize">
            Take Quiz
            <v-icon right>question_answer</v-icon>
        </v-btn>
    </quiz>

    <questions v-if="quiz">
    </questions>

</v-layout>
</template>

<script>
import Quiz from '@/components/form'
import Questions from '@/components/quiz'

export default {
    data: () => ({
        formData: {
            full_name: '',
            email: '',
            phone: '',
            country: '',
            username: '',
            password: '',
            password_confirmation: ''
        },
        start: true,
        quiz: false
    }),
    computed: {
        items() {
            return Array.from(Array(10).keys(), n => n + 1)
        }
    },
    created() {},
    components: {
        Quiz,
        Questions
    },
    methods: {
        startQuiz() {
            this.start = !this.start
            this.quiz = !this.quiz
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
