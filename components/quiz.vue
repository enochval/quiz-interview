<template>
<v-flex xs8>
    <v-sheet class="my-border my-shadow" width="100%">
        <v-form @submit.prevent="proceed">
            <v-layout row justify-center align-center>
                <v-flex xs8>
                    <div class="text-xs-center title pa-2">Note: All questions are compulstory.</div>
                    <div class="text-xs-center title pa-2 mb-4 ">Name: Osarenren Enoch</div>
                </v-flex>
            </v-layout>
            <v-layout row wrap align-center justify-center pa-4>
                <v-flex xs12>
                    <v-container>
                        <div>
                            <div class="title">1. What is the name of this Country?</div>
                            <v-radio-group>
                                <v-radio v-for="n in 4" :key="n" :label="`Radio ${n}`" :value="n"></v-radio>
                            </v-radio-group>
                        </div>
                        <div>
                            <div class="title">1. What is the name of this Country?</div>
                            <v-radio-group>
                                <v-radio v-for="n in 4" :key="n" :label="`Radio ${n}`" :value="n"></v-radio>
                            </v-radio-group>
                        </div>
                    </v-container>

                </v-flex>
                <v-btn type="submit" color="primary" class="text-capitalize">
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

}
</script>

<style>

</style>
