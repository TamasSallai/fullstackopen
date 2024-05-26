import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = (payload) => {
  const request = axios.post(baseUrl, payload)
  return request.then((response) => response.data)
}

const update = (id, payload) => {
  const request = axios.put(`${baseUrl}/${id}`, payload)
  return request.then((response) => response.data)
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then((response) => response.data)
}

export default {
  getAll,
  create,
  update,
  remove,
}
