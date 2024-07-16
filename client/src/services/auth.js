import axios from 'axios'

const baseUrl = `${import.meta.env.VITE_BASE_URL}/api/login`

const login = async (credentials) => {
  try {
    const response = await axios.post(baseUrl, credentials)
    return { success: true, user: response.data }
  } catch (error) {
    return {
      success: false,
      error: error.response.data.error || 'Something went wrong'
    }
  }
}

export default { login }
