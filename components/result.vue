<template>
<v-flex xs6>
    <v-sheet class="my-border my-shadow">
        <v-container grid-list-xs pa-4>
            <v-layout row align-center justify-center d-block>
                <div class="text-xs-center headline pb-4">Osarenren Enoch</div>
                <div class="text-xs-center headline pb-4">Your Percentage Score: 66.65%</div>
            </v-layout>
        </v-container>
        <v-layout row justify-center align-center pb-3>
            <slot></slot>
        </v-layout>
    </v-sheet>
</v-flex>
</template>

<script>
export default {}
</script>

<style>

</style>
