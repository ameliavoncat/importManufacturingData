const handleErrors = require('./handleErrors')
const { insertIntoCollection } = require('../db/mutations')

function handleData (data, headers) {
  let missingColumns = []
  let criteriaFailures = []

  data = data.split(/\n/)
  const providerHeaders = data[0].replace('Headers: ', '').split(', ')
  const dbPromises = headers.filter(header => !header.ignore)
    .map( header => {
      let headerMatch = providerHeaders.find(providerHeader => {
        return providerHeader === header.header
      })
      if(!headerMatch) {
        missingColumns.push(header.header)
      } else {
        var content = data[providerHeaders.indexOf(headerMatch) + 1]
        content = content.match(RegExp(header.criteria, 'gm'))
        if(!content) {
          criteriaFailures.push(header.header)
        } else {
          return insertIntoCollection(header.dbName, {content})
        }
      }
    })

    if(missingColumns.length > 0 || criteriaFailures.length > 0) {
      return handleErrors(missingColumns, criteriaFailures)
    }

    return Promise.all(dbPromises)
      .then(result => console.log(`Completed ${result.length} insert operations.`))
}

module.exports = handleData
