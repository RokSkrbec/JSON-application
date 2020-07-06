<template>
  <v-bottom-navigation
    v-model="bottomNav"
    horizontal
    color="primary"
    fixed
    class="d-md-none"
  >
    <v-btn to="/" value="find">
      <span>Find</span>
      <v-icon>search</v-icon>
    </v-btn>

    <v-btn to="/Add" value="add">
      <span>Add</span>
      <v-icon>create</v-icon>
    </v-btn>

  </v-bottom-navigation>
</template>

<script>
  export default {
    data () {
      return {
        bottomNav: 'find',
      }
    },
  }
</script>

<style>
.v-bottom-navigation--fixed {position: fixed !important;}

.v-item-group.v-bottom-navigation .v-btn {height: inherit !important;}
</style>