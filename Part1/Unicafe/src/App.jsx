import { useState } from 'react'

const Button = ({ onClick, name }) => <button onClick={onClick}>{name}</button>
const Statistic = ({ name, number }) => <tr>
  <td>{name} </td>
  <td>{number}</td>
</tr>

const Average = ({ good, bad, total }) => {

  let average = (good + -bad) / total

  return (
    <Statistic name={"average"} number={average} />
  )
}

const Positive = ({ good, total }) => {
  let positive = (good / total) * 100

  return (<tr>
    <td>positive</td>
    <td>{positive} %</td>
  </tr>)
}

const Statistics = ({ good, neutral, bad, total }) => {

  if (total == 0)
    return (<p>No feedback given</p>)

  return (
    <table>
      <tbody>
        <Statistic name="good" number={good} />
        <Statistic name="neutral" number={neutral} />
        <Statistic name="bad" number={bad} />
        <Statistic name="all" number={total} />

        <Average good={good} bad={bad} total={total} />
        <Positive good={good} total={total} />
      </tbody>
    </table>)
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad;
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => { setGood(good + 1) }} name="good" />
      <Button onClick={() => { setNeutral(neutral + 1) }} name="neutral" />
      <Button onClick={() => { setBad(bad + 1) }} name="bad" />

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} />
    </div>
  )
}

export default App
