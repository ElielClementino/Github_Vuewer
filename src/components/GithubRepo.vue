<template>
    <v-app>
        <v-autocomplete
        v-model="user"
        :items="userList"
        :loading="loading"
        :search-input.sync="search"
        />
    </v-app>
</template>

<script>
import debounce from 'lodash/debounce'
import api from "../api/api"
export default {
    name: 'GithubRepo',
    data () {
        return {
            user: null,
            userList: [],
            loading: false,
            search: null
        }
    },
    methods: {
        getUsers () {
            this.loading = true
            api.getUser(this.search).then((data) => {
                this.userList = data.items.map((idx) => [idx.login])
            })
            this.loading = false
        },
    },
    watch: {
        search: debounce(function () {
            this.getUsers()
        }, 2000)
    }
}
</script>
