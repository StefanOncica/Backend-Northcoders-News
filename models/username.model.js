const db = require('../db/connection')


exports.checkIfUsernameExists = (user) => {
    return db.query(`SELECT * FROM users WHERE username = $1;`, [user])
    .then((result) => {
        if(result.rows.length === 0) {
            return Promise.reject({status: 404, msg: 'Not found.'})
        }
        
    })
}