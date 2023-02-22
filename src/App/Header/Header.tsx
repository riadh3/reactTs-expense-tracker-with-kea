import React from 'react'
import logo from './logo.svg'
import './Header.scss'
import { useActions, useValues } from 'kea'
import { headerLogic } from './headerLogic'

export function Header() {
  const { speed } = useValues(headerLogic)
  const { goFaster } = useActions(headerLogic)

  return (
    <header className="Header">
      <img src={logo} className={`Header-logo Header-logo--speed-${speed}`} alt="logo" onClick={goFaster} />
      <p>
        Kea Example App
      </p>
      <a className="Kea-link" href="https://keajs.org" target="_blank" rel="noopener noreferrer">
        Learn More
      </a>
    </header>
  )
}
