require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Entry = require('./entry')

const app = express()

app.use(express.static('dist'))
app.use(express.json())
app.use(cors())

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

app.get('/info', (req, res, next) => {
  Entry.find({})
    .then((result) =>
      res.send(
        `<p>Phonebook has info for ${result.length} people</p>
        <p>${new Date()}</p>`
      )
    )
    .catch((error) => next(error))
})

app.get('/api/persons', (req, res, next) => {
  Entry.find({})
    .then((result) => res.json(result))
    .catch((error) => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
  Entry.findById(req.params.id)
    .then((result) => {
      if (!result) {
        return res.status(404).end()
      }
      return res.json(result)
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'name or number missing',
    })
  }

  Entry.findOne({ name: body.name }).then((result) => {
    if (result) {
      return res.status(400).json({
        error: 'name must be unique',
      })
    }

    const newEntry = new Entry({
      name: body.name,
      number: body.number,
    })

    newEntry
      .save()
      .then((result) => res.json(result))
      .catch((error) => next(error))
  })
})

app.delete('/api/persons/:id', (req, res, next) => {
  Entry.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'name or number missing',
    })
  }

  const entry = {
    name: body.name,
    number: body.number,
  }

  Entry.findByIdAndUpdate(req.params.id, entry, { new: true })
    .then((result) => {
      if (!result) {
        return res.status(404).end()
      }
      return res.json(result)
    })
    .catch((error) => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
