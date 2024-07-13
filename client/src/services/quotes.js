import axios from 'axios'

const baseUrl = 'https://api.api-ninjas.com/v1/quotes?category=alone'

const getQuote = async () => {
  try {
    const response = await axios.get(baseUrl)
    console.log(response)
  } catch (error) {
    console.log('error', error)
  }
}

export default { getQuote }
