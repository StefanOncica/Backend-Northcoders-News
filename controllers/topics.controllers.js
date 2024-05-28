const {selectTopics, selectEndpoints} = require('../models/topics.model')


exports.getTopics = (req, res, next) => {
    selectTopics()
    .then((topics) => {
            res.status(200).send({topics})
    })
   
}

// exports.getEndpoints = (req, res, next) => {
//     console.log('this is the controller');
//     selectEndpoints()
//     .then((endpoints) => {
//         console.log(endpoints);
//         res.status(200).send({endpoints})
//     })
// }


