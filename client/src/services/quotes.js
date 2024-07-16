import axios from 'axios'

let baseUrl = `https://api.api-ninjas.com/v1/quotes?category=computers`

const setCategory = (newCategory) => {
  baseUrl = `https://api.api-ninjas.com/v1/quotes?category=${newCategory}`
}

const getQuote = async () => {
  try {
    const response = await axios.get(baseUrl, {
      headers: {
        'X-Api-Key': import.meta.env.VITE_API_KEY
      }
    })
    return response.data[0]
  } catch (error) {
    console.error('Error:', error)
  }
}

export default { getQuote, setCategory }
