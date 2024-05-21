import React from 'react'

const Person = ({ person, handleDelete }) => {
  const { name, number } = person
  return (
    <div>
      {name} {number} <button onClick={handleDelete}>delete</button>
    </div>
  )
}

export default Person
