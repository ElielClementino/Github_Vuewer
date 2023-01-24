export default {
    async getUsers (user, page) {
        if (!page) {
            page = 1
        }
        const result = await fetch(`https://api.github.com/search/users?q=${user}&page${page}&per_page=100`).then((response) => {
            return response.json()
        })
        return result
    },
    async getUser (user) {
        const result = await fetch(`https://api.github.com/users/${user}`).then((response) => {
            return response.json()
        })
        return result
    },
    async getRepoInfo (full_name) {
        const result = await fetch(`https://api.github.com/repos/${full_name}`).then((response) => {
            return response.json()
        })
        return result
    },
    async getFolders (full_name, path) {
        if (!path) {
            path = ''
        }
        const result = await fetch(`https://api.github.com/repos/${full_name}/contents/${path}`).then((response) => {
            return response.json()
        })
        return result
    },
    async getRepos (user, page) {
        if (!page) {
            page = 1
        }
        const result = await fetch(`https://api.github.com/users/${user}/repos?page=${page}&per_page=100`).then((response) => {
            return response.json()
        })
        return result
    }
}