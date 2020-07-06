<template>
    <v-app-bar
      app
      color="primary"
      dark
      flat>
      <v-img
        @click="goToHome()"
        clickable
        contain
        max-height="40px"
        max-width="40px"
        src="../assets/logo-json.svg">
      </v-img>      
      <v-toolbar-title class="page-title" v-if="this.$route.fullPath.includes('Add')">JSON SERVER | ADD</v-toolbar-title>
      <v-toolbar-title class="page-title" v-else-if="this.$route.fullPath.includes('About')"> JSON SERVER | ABOUT</v-toolbar-title>
      <v-toolbar-title class="page-title" v-else>JSON SERVER | FIND</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn 
        class="d-none d-md-flex mr-2"
        depressed
        text
        to="/">
        FIND
      </v-btn>
      <v-btn
        class="d-none d-md-flex mr-2"
        depressed
        text
        to="/Add">
        ADD
      </v-btn>
      <v-btn 
        depressed
        text
        to="/About">
        ABOUT
      </v-btn>
    </v-app-bar>
</template>

<script>
export default {
  methods: {
    goToHome() {
      if(this.$route.path!== '/') this.$router.push('/')
    }
  }

}
</script>

<style>

.v-responsive__content {
  cursor:pointer;
}

.v-toolbar__title {
  font-family: 'Fira Code', monospace;
  margin-left: 15px;
}

</style>