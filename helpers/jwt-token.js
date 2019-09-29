const jwt = require('jsonwebtoken')

module.exports = {
  tokenValid: (req, res, next) => {
    // console.log(req.headers.authorization.split(" ")[1])
    jwt.verify(req.headers.authorization.split(" ")[1], "secretcode", function (
      err,
      decoded
    ) {
      if (err) {
        res.send(err)
      } else {
        next()
      }
    })
  }
}