<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
          <github-repo/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import GithubRepo from "./GithubRepo"
  export default {
    name: 'GithubVuewer',
    components: {
        GithubRepo,
    },
    data: () => ({
    })
  }
</script>
