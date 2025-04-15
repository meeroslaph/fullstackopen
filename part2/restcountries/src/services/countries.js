import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
  return axios.get(`${baseUrl}/all`)
}

const getOne = (countryName) => {
  return axios.get(`${baseUrl}/name/${countryName}`)
}

export default { 
  getAll, 
  getOne
}