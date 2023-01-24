<template>
<v-container>
        <v-autocomplete
        v-model="user"
        :items="userList"
        :loading="usersLoading"
        item-text="login"
        :search-input.sync="search"
        />
    <div
    v-if="userInfo?.avatar_url"
    > 
        <v-card
        :loading="userLoading"
        class="mx-auto my-12"
        max-width="374"
        >
            <template slot="progress">
            <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
            ></v-progress-linear>
            </template>

            <v-img
            height="250"
            :src="userInfo?.avatar_url"
            ></v-img>
            <v-card-title>{{ userInfo.login }}</v-card-title>
            <v-card-text>
                <v-card-title>Escolha um repositorio para ver mais informações</v-card-title>
            <v-chip-group
                v-model="selection"
                active-class="deep-purple accent-4 white--text"
                column
            >
                <v-chip 
                v-for="chip in reposList"
                :key=chip.id
                >
                    {{ chip?.full_name }}
                </v-chip>
            </v-chip-group>
        </v-card-text>
        </v-card>
    </div>
</v-container>
</template>

<script>
import debounce from 'lodash/debounce'
import api from "../api/api"
export default {
    name: 'GithubRepo',
    data () {
        return {
            user: null,
            repo: null,
            userList: [],
            userInfo: {},
            repoInfo: {},
            repoInfoLoading: false,
            userLoading: false,
            usersLoading: false,
            repoLoading: false,
            search: null,
            reposList: [],
            selection: null
        }
    },
    methods: {
        async getUsers () {
            this.usersLoading = true
            await api.getUsers(this.search).then((data) => {
                this.userList = data.items
            })
            this.usersLoading = false
        },
        async getUser () {
            this.userLoading = true
            await api.getUser(this.user).then((data) => {
                this.userInfo = data
            })
            this.userLoading = false
        },
        async getRepoInfo () {
            this.repoInfoLoading = true
            await api.getRepoInfo(this.reposList[this.selection]?.full_name).then((data) => {
                this.repoInfo = data
            })
            this.repoInfoLoading = false
        },
        async getRepos () {
            this.repoLoading = true
            await api.getRepos(this.user).then((data) => {
                this.reposList = data
            })
            this.repoLoading = false
        }
    },
    watch: {
        search: debounce(function () {
            if (this.search != null) {
                this.getUsers()
            }
        }, 2000),
        user () {
            if (this.user) {
                this.getUser()
                this.getRepos()
            }
        },
        selection () {
            if (this.selection) {
                this.getRepoInfo()
            }
        }
    }
}
</script>
