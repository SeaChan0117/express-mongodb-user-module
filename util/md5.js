const crypto = require('crypto')

module.exports = str => {
  return crypto.createHash('md5')
    .update('F86FFF58-55A4-44AE-BBC6-5318ED3AFAE4' + str)
    .digest('hex')
}
