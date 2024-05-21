import React from 'react'
import Person from './Person'

const Persons = ({ persons, filter, handleDelete }) => {
  return (
    <div>
      {persons
        .filter((person) => person.name.toLowerCase().includes(filter))
        .map((person) => (
          <Person
            key={person.id}
            person={person}
            handleDelete={() => handleDelete(person.id)}
          />
        ))}
    </div>
  )
}

export default Persons
