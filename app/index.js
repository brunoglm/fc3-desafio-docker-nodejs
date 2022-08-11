const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const port = 3000
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb',
}

const connection = mysql.createConnection(config)
const sqlCreateTable = `CREATE TABLE if not exists people(id INT AUTO_INCREMENT PRIMARY KEY, name varchar(255))`
connection.query(sqlCreateTable)
connection.end()

// app.post('/', (req, res) => {
app.get('/', (req, res) => {
  const connection = mysql.createConnection(config)

  // const sqlInsert = `INSERT INTO people(name) values('${req.body.name}')`
  const sqlInsert = "INSERT INTO people(name) values('Bruno')"
  connection.query(sqlInsert)

  const sqlQuery = 'SELECT name FROM people'
  connection.query(sqlQuery, function (error, queryResults, fields) {
    if (error)
      return res
        .status(500)
        .send(`'<h1>Ocorreu um erro: ${error.message}</h1>'`)

    let result = '<h1>Full Cycle Rocks!</h1>'
    result += '<h3>- Lista de nomes cadastrada no banco de dados.</h3>'

    for (const queryResult of queryResults) {
      result += `<p> * ${queryResult.name}</p>`
    }

    res.send(result)

    connection.end()
  })
})

app.get('/status', (req, res) => {
  res.send('Api Online')
})

app.listen(port, () => {
  console.log('Rodando na porta ' + port)
})
