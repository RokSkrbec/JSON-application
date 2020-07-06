<template>
  <v-app>
    <AppBar />
    <v-main>
      <router-view></router-view>
    </v-main>
    <Footer />
    <BottomNav />
  </v-app>
</template>

<script>
import BottomNav from '@/components/BottomNav'
import AppBar from '@/components/AppBar'
import Footer from '@/components/Footer'

export default {
  name: 'App',

  components: {
    BottomNav,
    AppBar,
    Footer,
  },

  data () {
    return {

    }
  }
}
</script>

<style lang="less">

</style>