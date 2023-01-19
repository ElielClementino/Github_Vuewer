<template>
    <div>
       <v-autocomplete
        v-model="user"
        :items="userList"
        :loading="loading"
        :search-input.sync="search"
        />
    </div>
</template>

<script>

export default {
    name: 'GithubRepo',
    data: () => ({
        user: null,
        userList: [],
        loading: false,
        search: null,
        debounce: null
    }),
    methods: {
        debounceSearch () {
            if (this.debounce) {
                clearTimeout(this.debounce)
            }
            this.debounce = setTimeout(() =>{
                this.getUsers()
                this.debounce = null
            }, 1000)
        },
        getUsers () {
            this.loading = true
            setTimeout(() => {
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
            }, 2000)
            
        }
    },
    watch: {
        search () {
            this.debounceSearch()
        }
    }
}
</script>