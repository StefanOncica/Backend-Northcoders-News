const app = require('./app.js')

const { PORT = 9090 } = process.env


app.listen(PORT, () => console.log(`Listening on ${PORT}...\n http://localhost:9090/api`))
