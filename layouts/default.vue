<template>
<v-app>
  <div id="bg"></div>
  <v-content>
    <v-container fill-height>
      <nuxt />
    </v-container>
  </v-content>
</v-app>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  computed: {
    isAuth() {
      return this.$store.state.user ? true : false
    }
  },
  methods: {
    signOut() {
      this.$store.commit('RESET_STATE')
      this.$router.push('/')
    }
  }
}
</script>