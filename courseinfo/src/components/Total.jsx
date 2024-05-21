const Total = ({ parts }) => {
  const sumOfExercises = parts.reduce((acc, part) => acc + part.exercises, 0)
  return <strong>total of {sumOfExercises} exercises</strong>
}

export default Total
