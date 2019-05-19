import axios from 'axios'

// const baseUri = 'http://ch29.kr'
const baseUri = 'http://58.227.252.242'
const port = 8000
const domain = `${baseUri}:${port}/`


const request = {
  get(path) {
    return axios.get(`${domain + path}`)
  },
  post(path, data) {
    return axios.post(`${domain + path}`, data)
  },
  delete(path) {
    return axios.delete(`${domain + path}`)
  },
  put(path, data) {
    return axios.put(`${domain + path}`, data)
  }
}

export const search = {
  read(keyword) {
    return request.get(`search?keyword=${keyword}`)
  }
}