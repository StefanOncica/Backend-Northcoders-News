const {selectTopics, selectEndpoints, selectArticleById, selectArticles, selectCommentsByArticleId, insertCommentByArticleId, updateArticleById, removeCommentById} = require('../models/topics.model')

const {checkIfArticleIdExists} = require('../models/article.model')
const {checkIfUsernameExists} = require('../models/username.model')
const {checkIfCommentIdExists} = require('../models/comment.model')

exports.getTopics = (req, res, next) => {
    selectTopics()
    .then((topics) => {
            res.status(200).send({topics})
    })
    .catch(next)
}

exports.getEndpoints = (req, res, next) => {
    const allEndpoints = selectEndpoints()
    res.status(200).send(allEndpoints)
}

exports.getArticleById = (req, res, next) => {
    const articleId = req.params.id
    selectArticleById(articleId)
    .then((article) => {
        res.status(200).send(article)
    })   
}

exports.getArticles = (req, res, next) => {
    selectArticles()
    .then((articles) => {
            res.status(200).send({articles})
    })
    .catch(next)
}

exports.getAllCommentsByArticleId = (req, res, next) => {
    const articleId = req.params.article_id
    selectCommentsByArticleId(articleId)
    .then((comments) => {
        res.status(200).send({comments})
    })
    .catch(next)
}

exports.postCommentByArticleId = (req, res, next) => {
    const {username, body} = req.body
    const articleId = req.params.article_id

    if (!username || !body) {
        return res.status(400).send({msg: 'Bad request.'})
    }

    const promises = [insertCommentByArticleId(articleId, username, body), checkIfArticleIdExists(articleId), checkIfUsernameExists(username)]

    Promise.all(promises)
    .then((resolvedPromises) => {
            const comment = resolvedPromises[0]
            res.status(201).send({comment})
    })
    .catch(next)
}

exports.patchArticleById = (req, res, next) => {
    const articleId = req.params.article_id
    const newVote = req.body.inc_votes

    if (!newVote){
        return res.status(400).send({msg: 'Bad request.'})
    }

    const promises = [updateArticleById(articleId, newVote), checkIfArticleIdExists(articleId)]

    Promise.all(promises)
    .then((resolvedPromises) => {
        const article = resolvedPromises[0]
        res.status(200).send({article})
    })
    .catch(next)
}

exports.deleteCommentById = (req, res, next) => {
    const commentId = req.params.comment_id

    const promises = [removeCommentById(commentId), checkIfCommentIdExists(commentId)]

    Promise.all(promises)
    .then(() => {
        res.status(204).send()
    })
    .catch(next)
}