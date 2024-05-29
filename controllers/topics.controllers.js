const {selectTopics, selectEndpoints} = require('../models/topics.model')


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



