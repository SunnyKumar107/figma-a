const app = require('./app')
const { info } = require('./utils/logger')

const PORT = 3000
app.listen(PORT, () => {
  info(`Server is running on port ${PORT}`)
})
