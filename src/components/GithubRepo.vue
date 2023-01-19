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
export default {
    name: 'GithubRepo',
    data () {
        return {
            user: null,
            userList: {},
            loading: false,
            search: null
        }
    },
    methods: {
        getUsers () {
            this.loading = true
            return new Promise((resolve, reject) => {
                fetch(`https://api.github.com/search/users?q=${this.search}`).then((response) =>{
                    return response.json()
                }).then((data) => {
                    this.userList = data.items.map((idx) => [idx.login])
                    return resolve(data)
                }).catch((error) => {
                    return reject(error)
                })
                this.loading = false
            })
        },
    },
    watch: {
        search: debounce(function () {
            this.getUsers()
        }, 2000)
    }
}
</script>