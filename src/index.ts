import express from 'express'
const app = express()
const port = process.env.PORT || 5000

const jsonBodyParser = express.json()
app.use(jsonBodyParser)
const HTTP_STATUSES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,

  BAD_REQUEST: 400,
  NOT_FOUND: 404
}
const db = {
  users: [
    {
      id: 1, name: 'John'
    },
    {
      id: 2, name: 'Jane'
    }
  ]
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/users', (req, res) => {
  let usersQuery = db.users
  if (req.query.name) {
    usersQuery = usersQuery.filter(item => item.name.indexOf(req.query.name as string) > -1)
  }
  res.json(usersQuery)
})
app.get('/users/:id', (req, res) => {

  const foundUsers = db.users.find(item => item.id == +req.params.id)
  if (!foundUsers) {
    return res.status(HTTP_STATUSES.NOT_FOUND).json({ message: '404: User not found' })
  }
  res.json(foundUsers)
})
app.post('/users', (req, res) => {
  if (!req.body.name) {
    return res.status(HTTP_STATUSES.BAD_REQUEST).json({ message: '400: Name is required' })
  }
  const user = {
    id: new Date().getTime(),
    name: req.body.name
  }
  db.users.push(user)
  res.status(HTTP_STATUSES.CREATED).json(user)
})
app.delete('/users/:id', (req, res) => {

  db.users = db.users.filter(item => item.id !== +req.params.id)

  res.sendStatus(HTTP_STATUSES.NO_CONTENT)
})
app.put('/users/:id', (req, res) => {
  if (!req.body.name) {
    return res.status(HTTP_STATUSES.BAD_REQUEST).json({ message: '400: Name is required' })
  }
  const foundUsers = db.users.find(item => item.id == +req.params.id)
  if (!foundUsers) {
    return res.status(HTTP_STATUSES.NOT_FOUND).json({ message: '404: User not found' })
  }
  foundUsers.name = req.body.name
  res.json(foundUsers)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})