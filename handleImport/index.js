const fs = require('fs')
const config = require('../config.json')
const handleData = require('./handleData')

function handleImport (deviceType, file) {
  const deviceConfig = config.devices.find( device => {
    return device.device === deviceType
  })
  if(!deviceConfig) throw new Error('The device specified has not had headers defined and cannot be imported.')

  fs.readFile(file, 'utf8', function(error, data) {
    if(error) throw error
    if(data) handleData(data, deviceConfig.headers)
  })
}

module.exports = handleImport
