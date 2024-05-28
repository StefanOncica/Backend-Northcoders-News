const db = require('../db/connection')
const fs = require('fs')

const endpointsTest = fs.readFile('../endpoints.json', (err, data)=>{
    console.log(data);
})

exports.selectTopics = () => {
    let queryString = 'SELECT * FROM topics;'
    return db.query(queryString)
        .then((result) => {return result.rows})
}

exports.selectEndpoints = () => {
    console.log('this is  the model...');
    return fs.readFile('../endpoints.js', 'utf-8')
        .then((data)=> {
            console.log(data);
        })
}

