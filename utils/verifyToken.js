const jwt = require('jsonwebtoken');

// creating a middleware function to verify the user on protected routes
module.exports = function (req, res, next) {
  const token = req.header('access_token')
  if (!token) {
    return res.status(401).send('Access Denied!')
  }

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET_KEY)
    req.user = verified
    next()
  } catch (err) {
    res.status(400).send('Invalid Token!')
  }
}
