import axios from 'axios'

const baseUrl = 'https://figma-a.onrender.com/api/login'

const login = async (credentials) => {
  try {
    const response = await axios.post(baseUrl, credentials)
    return response.data
  } catch (error) {
    throw new Error('Login failed')
  }
}

export default { login }
