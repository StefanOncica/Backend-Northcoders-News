const express = require('express')
const app = express()
const {getTopics, getEndpoints, getArticleById, getArticles, getAllCommentsByArticleId, postCommentByArticleId, patchArticleById, deleteCommentById} = require('./controllers/topics.controllers')

app.use(express.json())

app.get('/api/topics', getTopics)

app.get('/api', getEndpoints)

app.get('/api/articles/:id', getArticleById )

app.get('/api/articles', getArticles)

app.get('/api/articles/:article_id/comments', getAllCommentsByArticleId)

app.post('/api/articles/:article_id/comments', postCommentByArticleId)

app.patch('/api/articles/:article_id', patchArticleById)

app.delete('/api/comments/:comment_id', deleteCommentById)

app.use((req, res, next) => {
    res.status(404).send({msg: "Endpoint doesn't exist."})
})

app.use((err, req, res, next) => {
    if(err.code === '22P02'){
        res.status(400).send({msg: 'Bad request.'})
    } else if(err.code === '23503'){
        res.status(404).send({msg: 'Not found.'})
    }else if(err.status === 404){
        res.status(404).send({msg: 'Not found.'})
    }else {
        next(err)
    }
    
})

module.exports = app