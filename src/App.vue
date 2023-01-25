<template>
  <v-app>
        <v-app-bar
      app
      color="black"
      dark
    >
      <div class="d-flex align-center">
        <h1>Git Hub Api</h1>
        <v-icon size=50>mdi-github</v-icon>
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
