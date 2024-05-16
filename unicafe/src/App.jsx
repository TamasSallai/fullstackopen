import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <div>
        <h2>Give Feedback</h2>
        <Button onClick={() => setGood(good + 1)} text="good" />
        <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
        <Button onClick={() => setBad(bad + 1)} text="bad" />
      </div>

      <div>
        <h2>Statistics</h2>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  )
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Statistics = ({ good, neutral, bad }) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return <div>No feedback given</div>
  }

  const all = () => good + neutral + bad
  const average = () => (good - bad) / all() || 0
  const positive = () => (good / all()) * 100 || 0

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all()} />
        <StatisticLine text="average" value={average()} />
        <StatisticLine text="positive" value={`${positive()} %`} />
      </tbody>
    </table>
  )
}

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}:</td>
    <td>{value}</td>
  </tr>
)

export default App
