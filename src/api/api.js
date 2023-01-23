import axios from "axios"

export default {
    async getUser (user) {
        try {
            const result = await axios.get(`https://api.github.com/search/users?q=${user}`).then((response) => {
                return response.json()
            })
            return result
        } catch (error){
            console.error(error)
        }
    }
}