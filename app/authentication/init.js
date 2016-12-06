const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const authenticationMiddleware = require('./middleware')

const user = {
  username: 'admin',
  password: 'admin',
  id: 1
}

function findUser (username, callback) {
  if (username === user.username) {
    console.log('findUser : Nombre usuario correcto')
    return callback(null, user)
      }
  console.log('findUser : Error en el nombre de usuario')
  return callback(null)
}

passport.serializeUser(function (user, cb) {
  cb(null, user.username)
})

passport.deserializeUser(function (username, cb) {
  findUser(username, cb)
})

function initPassport () {
  passport.use(new LocalStrategy(
    function(username, password, done) {
      findUser(username, function (err, user) {
        if (err) {
          console.log('Error 1 initPassport : No identificado aun')
          return done(err)
        }
        if (!user) {
          console.log('Error 2 initPassport : Nombre de usuario')
          return done(null, false)
        }
        if (password !== user.password  ) {
          console.log('Error 3 initPassport : Contraseña')
          return done(null, false)
        }
        console.log('initPassport : Usuario y Contraseña correctos')
        return done(null, user)
      })
    }
  ))

  passport.authenticationMiddleware = authenticationMiddleware
}

module.exports = initPassport
