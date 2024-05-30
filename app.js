const express = require('express')
const app = express()
const {getTopics, getEndpoints, getArticleById, getArticles, getAllCommentsByArticleId} = require('./controllers/topics.controllers')

app.use(express.json())

app.get('/api/topics', getTopics)

app.get('/api', getEndpoints)

app.get('/api/articles/:id', getArticleById )

app.get('/api/articles', getArticles)

app.get('/api/articles/:article_id/comments', getAllCommentsByArticleId)

app.use((req, res, next) => {
    res.status(404).send({msg: "Endpoint doesn't exist."})
})

app.use((err, req, res, next) => {
    res.status(400).send({msg: 'Bad request.'})
})

module.exports = app