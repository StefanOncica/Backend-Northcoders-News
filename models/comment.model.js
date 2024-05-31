const db = require('../db/connection.js')

exports.checkIfCommentIdExists = (commentId) => {
    return db.query(`SELECT * FROM comments WHERE comment_id = $1;`, [commentId])
    .then((result) => {
        if(result.rows.length === 0){
            return Promise.reject({status: 404, msg: 'Not found.'})
        }
    })
}