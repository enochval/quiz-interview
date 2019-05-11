<template>
<v-flex xs6>
    <v-sheet class="my-border my-shadow">
        <v-form ref="form" v-model="valid">
            <v-container grid-list-xs pa-4>
                <v-layout row wrap align-center justify-center>
                    <div class="text-xs-center title pb-4">Complete Form to take Quiz</div>
                    <v-flex xs9>
                        <v-text-field :rules="[rules.counter, rules.required]" minlength="7" placeholder="Full Name" solo prepend-inner-icon="person" v-model="formData.fullName"></v-text-field>
                    </v-flex>
                    <v-flex xs9>
                        <v-text-field :rules="[rules.email]" placeholder="Email" solo prepend-inner-icon="email" v-model="formData.email"></v-text-field>
                    </v-flex>
                    <v-flex xs9>
                        <v-text-field :rules="[rules.required]" mask="###########" placeholder="Phone" solo prepend-inner-icon="phone" v-model="formData.phone"></v-text-field>
                    </v-flex>
                    <v-flex xs9>
                        <v-select v-model="formData.noOfQuestions" solo prepend-inner-icon="format_list_numbered" :items="items" placeholder="Choose No of Questions"></v-select>
                    </v-flex>
                    <v-btn @click="startQuiz" color="primary" class="text-capitalize">
                        Take Quiz
                        <v-icon right>question_answer</v-icon>
                    </v-btn>
                </v-layout>
            </v-container>
        </v-form>
    </v-sheet>
</v-flex>
</template>

<script>
export default {
    props: [
        'items'
    ],
    data: () => ({
        valid: true,
        formData: {
            fullName: '',
            email: '',
            phone: '',
            noOfQuestions: 5
        },
        rules: {
          required: value => !!value || 'This field is required',
          counter: value => value.length >= 7 || 'Min 7 characters',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          },

        }
    }),
    created() {
        const { fullName, email, phone } = this.$store.state.requestBody
        this.formData.fullName = fullName ? fullName : '',
        this.formData.email = email ? email : ''
        this.formData.phone = phone ? phone : ''
    },
    methods: {
        async startQuiz() {
            if (this.$refs.form.validate()) {
                const {noOfQuestions} = this.formData
                await this.$store.dispatch('getQuiz', noOfQuestions)
                this.$store.commit('showQuiz')
                this.$store.commit('setRequestBody', this.formData)
            }
        }
    }
}
</script>

<style>

</style>
