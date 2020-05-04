const session = require('express-session')
const uuid = require('uuid/v4')
const SessionStore = require('session-file-store')(session)

module.exports = session({
  genId: req => uuid(),
  store: new SessionStore(),
  secret: "Cats are Awesome!",
  resave: false,
  saveUninitialized: true
})