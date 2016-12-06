function authenticationMiddleware () {
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      console.log('Cliente autenticado')
      return next()
    }
    console.log('Cliente no ha sido autenticado')
    res.redirect('/')
  }
}

module.exports = authenticationMiddleware
