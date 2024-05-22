import React from 'react'

const Countries = ({ countries }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  return (
    <div>
      {countries.map((c) => (
        <div key={c.fifa}>
          {c.name.common} <button>show</button>
        </div>
      ))}
    </div>
  )
}

export default Countries
