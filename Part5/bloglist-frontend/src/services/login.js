import axios from 'axios'

// For testing
const baseUrl = 'http://localhost:3003/api/login'

// For shipment
// const baseUrl = 'api/notes'

const login = async credentials => {
    const response = await axios.post(baseUrl, credentials)
    return response.data
}

export default { login }