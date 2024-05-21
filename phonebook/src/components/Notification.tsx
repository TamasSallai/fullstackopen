import React from 'react'

const Notification = ({ notification }) => {
  const { type, message } = notification

  const success = {
    border: '3px solid green',
    color: 'green',
  }

  const error = {
    border: '3px solid red',
    color: 'red',
  }

  return (
    <div
      style={{
        marginBottom: '10px',
        padding: '10px',
        borderRadius: '5px',
        background: 'lightgrey',
        ...(type === 'success' ? success : error),
      }}
    >
      {message}
    </div>
  )
}

export default Notification
