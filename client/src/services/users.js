import axios from 'axios'

const baseUrl = 'https://figma-a.onrender.com/api/users'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const config = () => {
  headers: {
    Authorization: token
  }
}

const register = async (user) => {
  try {
    const response = await axios.post(baseUrl, user)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.log(error)
    throw new Error('Registration failed')
  }
}

const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`, config())
    return response.data
  } catch (error) {
    throw new Error('Delete failed')
  }
}

export default {
  register,
  setToken,
  deleteUser
}
