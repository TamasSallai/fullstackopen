import axios from 'axios'
import { useEffect, useState } from 'react'
import Country from './components/Country'
import Countries from './components/Countries'

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  )

  const exactMatch = countries.find(
    (country) => country.name.common.toLowerCase() === filter.toLowerCase()
  )

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((res) => {
        setCountries(res.data)
      })
  }, [])

  return (
    <div>
      <div>
        find countries:
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {exactMatch || filteredCountries.length === 1 ? (
        <Country country={exactMatch || filteredCountries[0]} />
      ) : (
        <Countries countries={filteredCountries} />
      )}
    </div>
  )
}

export default App
