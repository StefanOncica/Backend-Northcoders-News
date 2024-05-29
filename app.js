const express = require('express')
const app = express()
const {getTopics, getEndpoints} = require('./controllers/topics.controllers')

app.use(express.json())

app.get('/api/topics', getTopics)

app.get('/api', getEndpoints)

app.use((req, res, next) => {
    res.status(404).send({msg: "Endpoint doesn't exist."})
})

module.exports = app