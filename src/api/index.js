import axios from 'axios'

// const baseUri = 'http://ch29.kr'
const baseUri = 'http://58.227.252.242'
const port = 8000
const domain = `${baseUri}:${port}/`

// axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;application/json'


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

export const main = {
  readWithMonth(month, categories) {
    const startDate = `${month}-01`
    const splitedMonth = month.split('-')
    const currentYear = splitedMonth[0]
    const currentMonth = (splitedMonth[1] - 0) < 10 
      ? `0${splitedMonth[1] - 0 + 1}` 
      : (splitedMonth[1] - 0 + 1)
    const endDate = `${currentYear}-${currentMonth}-01`

    return request.post(`main`, {
      start_date: startDate,
      end_date: endDate,
      categories
    })
  },
  readWithDate(start_date, end_date, categories) {
    return request.post(`main`, {
      start_date, end_date, categories
    })
  }
}

export const details = {
  read(id) {
    return request.get(`policy/${id}`)
  }
}