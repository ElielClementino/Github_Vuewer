<template>
<v-container>
    <v-row class="text-center">
        <v-col cols="12">
            <v-autocomplete
            v-model="user"
            :items="userList"
            :loading="usersLoading"
            item-text="login"
            :search-input.sync="search"
            />
        </v-col>
    </v-row>
    <div
    v-if="userInfo?.avatar_url"
    > 
    <v-row dense align="stretch">
        <v-col cols="6">
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
                <v-card-title>{{ userInfo?.login }}</v-card-title>
                <v-card-text>
                    <v-card-title>Escolha um repositorio para ver mais informações</v-card-title>
                    <v-chip-group
                        v-model="selection"
                        active-class="deep-purple accent-4 white--text"
                        column
                    >
                        <v-chip 
                        v-for="repo in reposList"
                        :key=repo.id
                        >
                            <v-icon>mdi-folder</v-icon> {{ repo?.full_name }}
                        </v-chip>
                    </v-chip-group>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col cols="6"
        v-if="selection"
        >
            <v-card
            :loading="foldersLoading"
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
                <v-card-text>
                    <v-card-title>Escolha um</v-card-title>
                    <v-chip-group
                        v-model="folderSelection"
                        active-class="deep-purple accent-4 white--text"
                        column
                    >
                        <v-chip 
                        v-for="folder in folders"
                        :key=folder.id
                        >
                            <v-icon v-if="folder?.type === 'dir' ">mdi-folder</v-icon>
                            <v-icon v-if="folder?.type === 'file' ">mdi-file</v-icon> 
                            {{ folder?.name }}
                        </v-chip>
                    </v-chip-group>
                </v-card-text>
            </v-card>
            <v-card
            v-if="folderSelection"
            :loading="foldersLoading"
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
                <v-card-text>
                    <v-chip-group
                        v-model="chosenFolderPath"
                        active-class="deep-purple accent-4 white--text"
                        column
                    >
                        <v-chip 
                        v-for="folder in  selectedFolder "
                        :key=folder.id
                        >
                            <v-icon v-if="folder?.type === 'dir' ">mdi-folder</v-icon>
                            <v-icon v-if="folder?.type === 'file' ">mdi-file</v-icon> 
                            {{ folder?.name }}
                        </v-chip>
                    </v-chip-group>
                    <v-card-title>Caminho atual:{{ selectedFolder[chosenFolderPath]?.path }}</v-card-title>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
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
            chosenFolderPath: null,
            userList: [],
            userInfo: {},
            repoInfo: {},
            folders: [],
            selectedFolder: {},
            repoInfoLoading: false,
            foldersLoading: false,
            userLoading: false,
            usersLoading: false,
            repoLoading: false,
            search: null,
            reposList: [],
            selection: null,
            folderSelection: null
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
        },
        async getFolders () {
            this.foldersLoading = true
            await api.getFolders(this.reposList[this.selection]?.full_name).then((data) => {
                this.folders = data
            })
            this.foldersLoading = false
        },
        async getSelectedFolder (path) {
            this.foldersLoading = true
            await api.getFolders(this.reposList[this.selection]?.full_name, path).then((data) => {
                this.selectedFolder = data
            })
            this.foldersLoading = false
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
        },
        repoInfo () {
            if (this.repoInfo) {
                this.getFolders()
            }
        },
        folderSelection () {
            if (this.folderSelection) {
                this.getSelectedFolder(this.folders[this.folderSelection]?.path)
            }
        },
        chosenFolderPath () {
            if (this.chosenFolderPath && this.selectedFolder[this.chosenFolderPath]?.type === "dir") {
                this.getSelectedFolder(this.selectedFolder[this.chosenFolderPath]?.path)
            }
        }
    }
}
</script>
