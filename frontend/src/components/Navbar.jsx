import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import f1Logo from '../assets/f1.webp'
import './Navbar.css'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand" onClick={closeMenu}>
        <img src={f1Logo} alt="F1" className="brand-logo" />
        <span className="brand-fantasy">Fantasy</span>
      </NavLink>

      <div className={`navbar-links ${menuOpen ? 'show' : ''}`}>
        <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
        <NavLink to="/teams" onClick={closeMenu}>Build Your Team</NavLink>
        <NavLink to="/about" onClick={closeMenu}>About Us</NavLink>
        <NavLink to="/contact" onClick={closeMenu}>Contact Us</NavLink>
      </div>

      <button
        className={`burger ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  )
}

export default Navbar