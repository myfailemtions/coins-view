import axios from 'axios'

const request = async (method, url, data = {}) => {
  try {
    const response = await axios.get(url)
    return response
  } catch (err) {
    throw new Error(err)
  }
}

export default request
