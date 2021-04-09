/* 
Imports
*/
const { session } = require('passport');
const Models = require('../models/index');
//

/*  
CRUD methods
*/
const createOne = req => {
    return new Promise((resolve, reject) => {
        Models.quizz.create(req.body)
            .then(data => { resolve(data) })
            .catch(err => reject(err))
    })
}

const readAll = () => {
    return new Promise((resolve, reject) => {
        // Mongoose population to get associated data
        Models.quizz.find()
            .populate('author', ['-password'])
            .exec((err, data) => {
                if (err) { return reject(err) }
                else { return resolve(data) }
            })
    })
}

const readOne = id => {
    return new Promise((resolve, reject) => {
        // Mongoose population to get associated data
        Models.quizz.findById(id)
            .populate('author', ['-password'])
            .exec((err, data) => {
                if (err) { return reject(err) }
                else { return resolve(data) }
            })
    })
}

//

/* 
Export controller methods
*/
module.exports = {
    readAll,
    readOne,
    createOne
}
//
