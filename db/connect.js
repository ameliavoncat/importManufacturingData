const MongoClient = require('mongodb').MongoClient
const dbBaseURL = process.env.DATABASE_BASE_URL || 'mongodb://localhost:27017/'
const dbName = process.env.DATABASE_NAME || 'importManufacturingData'

const databaseURL = dbBaseURL + dbName

const connect = function(callback){
  MongoClient.connect(databaseURL, function(error, database) {
    if(error) throw error
    callback(database)
  })
}

module.exports = connect
