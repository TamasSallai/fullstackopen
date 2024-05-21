import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personsService from './services/persons'

const App = () => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [persons, setPersons] = useState([])
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personsService.getAll().then((initialPersons) => setPersons(initialPersons))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    const personExists = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    )

    if (
      personExists &&
      window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      const personPayload = {
        ...personExists,
        number: newNumber,
      }

      personsService
        .update(personExists.id, personPayload)
        .then((updatedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id === updatedPerson.id ? updatedPerson : person
            )
          )
          setNotificationWithTimeout({
            type: 'success',
            message: `Updated ${updatedPerson.name}`,
          })
        })
        .catch((_) => {
          setNotificationWithTimeout({
            type: 'error',
            message: `Information of ${personExists.name} has already been removed from server`,
          })

          setPersons(persons.filter((person) => person.id !== personExists.id))
        })

      return
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    personsService
      .create(newPerson)
      .then((createdPerson) => {
        setPersons(persons.concat(createdPerson))

        setNotificationWithTimeout({
          type: 'success',
          message: `Added ${createdPerson.name}`,
        })
      })
      .catch((_) =>
        setNotificationWithTimeout({
          type: 'error',
          message: 'Cannot add person',
        })
      )
  }

  const handleDelete = (id) => {
    const personExists = persons.find((person) => person.id === id)
    if (window.confirm(`Delete ${personExists.name}?`)) {
      personsService
        .remove(id)
        .then(() => setPersons(persons.filter((person) => person.id !== id)))
        .catch((_) => {
          setNotificationWithTimeout({
            type: 'error',
            message: `Information of ${personExists.name} has already been removed from server`,
          })

          setPersons(persons.filter((person) => person.id !== personExists.id))
        })
    }
  }

  const setNotificationWithTimeout = ({ type, message }) => {
    setNotification({ type, message })

    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      {notification && <Notification notification={notification} />}

      <Filter filter={filter} setFilter={setFilter} />

      <h3>Add a new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />

      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} handleDelete={handleDelete} />
    </div>
  )
}

export default App
