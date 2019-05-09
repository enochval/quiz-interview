<template>
<v-flex xs6>
    <v-sheet class="my-border my-shadow">
        <v-form @submit.prevent="proceed">
            <v-container grid-list-xs pa-4>
                <v-layout row wrap align-center justify-center>
                    <div class="text-xs-center title pb-4">Complete Form to take Quiz</div>
                    <v-flex xs9>
                        <v-text-field placeholder="Full Name" solo prepend-inner-icon="person" v-model="formData.full_name"></v-text-field>
                    </v-flex>
                    <v-flex xs9>
                        <v-text-field placeholder="Email" solo prepend-inner-icon="email" v-model="formData.email"></v-text-field>
                    </v-flex>
                    <v-flex xs9>
                        <v-text-field placeholder="Phone" solo prepend-inner-icon="phone" v-model="formData.phone"></v-text-field>
                    </v-flex>
                    <v-flex xs9>
                        <v-select solo prepend-inner-icon="format_list_numbered" :items="items" placeholder="Choose No of Questions"></v-select>
                    </v-flex>
                    <slot></slot>
                </v-layout>
            </v-container>
        </v-form>
    </v-sheet>
</v-flex>
</template>

<script>
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
        }
    }),
    computed: {
        items() {
            return Array.from(Array(10).keys(), n => n + 1)
        }
    },
}
</script>

<style>

</style>
