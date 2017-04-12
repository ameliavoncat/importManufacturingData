const connect = require('../connect')

const insertIntoCollection = (table, item) => {
  return connect(function(db){
    return db.collection(table).insertOne(item)
      .then(result => {
        db.close()
        return result
      })
  })
}

module.exports = insertIntoCollection
