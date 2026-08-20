import axios from 'axios'

// For Testing
const baseUrl = 'http://localhost:3003/api/blogs'
// For Shipment
// const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const put = async (newObject) => {
  const config = {
    headers: { Authorization: token }
  }

  const url = `${baseUrl}/${newObject.id.toString()}`

  const response = await axios.put(url, newObject, config)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token }
  }

  const url = `${baseUrl}/${id}`

  const response = await axios.delete(url, config)
  return response.data

}


export default { getAll, create, put, deleteBlog, setToken }