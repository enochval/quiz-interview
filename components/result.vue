<template>
<v-flex xs6>
    <v-sheet class="my-border my-shadow">
        <v-container grid-list-xs pa-4>
            <v-layout row align-center justify-center d-block>
                <div class="text-xs-center headline pb-4">{{ fullName }}</div>
                <div class="text-xs-center headline pb-4">Your Percentage Score: {{ score }}</div>
            </v-layout>
        </v-container>
        <v-layout row justify-center align-center pb-3>
            <v-btn @click="takeAnotherQuiz" color="primary" class="text-capitalize">
                Take Another Quiz
                <v-icon right>question_answer</v-icon>
            </v-btn>
        </v-layout>
    </v-sheet>
</v-flex>
</template>

<script>
export default {
    computed: {
        score() {
            return this.$store.state.score
        },
        fullName() {
            return this.$store.state.requestBody.fullName
        }
    },
    methods: {
        takeAnotherQuiz() {
            this.$store.commit('takeAnotherQuiz')
        }
    }
}
</script>

<style>

</style>
