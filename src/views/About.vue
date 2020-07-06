<template>
<div class="about">
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col class="text-center">
        <div class="about-text">A simple JSON file uploader.</div>
        <v-btn to="/" outlined color="secondary">
          <v-icon>mdi-heart</v-icon> GitHub
        </v-btn>
        <v-img
          class="about-image"
          contain
          max-height="400px"
          max-width="400px"
          src="../assets/about.svg">
        </v-img>
      </v-col>
    </v-row>
  </v-container>

</div>
</template>

<script>
export default {

}
</script>

<style lang="less">
.about {
  .about-text {
    margin: 100px auto 20px auto;
  }

  .about-image {
    margin: 100px auto;

    .v-responsive__content{
      cursor: default;
    }
    
  }
}
</style>