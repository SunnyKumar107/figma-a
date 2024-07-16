import axios from 'axios'

const baseUrl = `${import.meta.env.VITE_BASE_URL}/api/users`

const register = async (user) => {
  try {
    const response = await axios.post(baseUrl, user)
    return {
      success: true,
      user: response.data
    }
  } catch (error) {
    return {
      success: false,
      error: error.response.data.error || 'Something went wrong'
    }
  }
}

export default {
  register
}
