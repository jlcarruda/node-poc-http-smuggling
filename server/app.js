const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const authType = process.argv[2]

const SERVER_AUTH_MAP = {
  session: "express-session + session-file-store",
  passport: "Passport"
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

switch (authType) {
  case "session":
    app.use(require("../auth_strategies/session"))
    break;
  case "passport":
    break
  default:
    break;
}

app.get('/', (req, res) => {
  res.send("Hello World from Index")
})

app.post('/admin/signin', (req,res) => {

})

app.get('/smuggled', (req, res) => {
  console.log("\nsmuggled")
  console.log(`HEADERS \n${JSON.stringify(req.headers)}\n`)
  console.log(`BODY \n${JSON.stringify(req.body)}\n`)
  console.log(`PARAMS \n${JSON.stringify(req.params)}\n`)
  res.send(`Smuggled response: \n${req.body ? req.body.name : "No Name"}`)
})

app.use((err, req, res, next) => {
  console.log("Error")
  console.error(err.stack)
  console.log("REQ")
  console.log(req)
  next(err)
})

app.listen(port, '127.0.0.1', () => console.log(`Server is up on port ${port}. \n\nAUTH TYPE: ${SERVER_AUTH_MAP[authType] || "No Auth "}`))