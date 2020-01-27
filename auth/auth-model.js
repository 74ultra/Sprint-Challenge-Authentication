const db = require('../database/dbConfig.js');

function find() {
    return db('users').select('id', 'username', 'password')
}


function insert(user){
    return db('users').insert(user, 'id').then(([id]) => id)
}

function findByUserName(username) {
    return db('users').where({ username }).select('id', 'username', 'password').first()
}



module.exports = {
    find,
    insert,
    findByUserName
}