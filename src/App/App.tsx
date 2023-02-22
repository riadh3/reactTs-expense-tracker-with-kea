import React from 'react'
import './App.scss'
import { Header } from './Header/Header'
import { DemoForm } from './DemoForm/DemoForm'

export function App() {
  return (
    <div className="App">
      <Header />
      <div className="App-layout">
        <DemoForm />
      </div>
    </div>
  )
}
