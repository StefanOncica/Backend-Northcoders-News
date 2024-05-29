const {selectTopics, selectEndpoints, selectArticleById} = require('../models/topics.model')


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


