import axios from 'axios'

export function get (url) {
    axios.get(url).then((response) => {
        return response.json()
    }).then((data) => {
        return data
    }).catch((error) => {
        return error
    })
}