<template>
  <v-app>
        <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-card-title>Git Hub</v-card-title>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main>
      <github-vuewer/>
    </v-main>
  </v-app>
</template>

<script>
import GithubVuewer from './components/GithubVuewer';

export default {
  name: 'App',

  components: {
    GithubVuewer,
  },

  data: () => ({
    //
  }),
};
</script>
