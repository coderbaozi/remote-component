import './App.css'
import React from 'react'
import ReactDOM from 'react-dom'
import RemoteRender from './RemoteRender'

window.React = React
window.ReactDOM = ReactDOM
function App() {
  return (
    <>
      <RemoteRender />
    </>
  )
}

export default App
