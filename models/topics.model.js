const db = require('../db/connection')
const endpoints = require('../endpoints')


exports.selectTopics = () => {
    let queryString = 'SELECT * FROM topics;'
    return db.query(queryString)
    .then((result) => {return result.rows})
}

exports.selectEndpoints = () => {
    return endpoints
}

