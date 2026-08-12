import axios from 'axios'

// For Testing
const baseUrl = 'http://localhost:3003/api/blogs'
// For Shipment
// const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getAll }