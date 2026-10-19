import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

// Address of the backend server (backend.js)
const API_URL = 'http://localhost:3000'

const LIGHTS = [1, 2, 3, 4, 5]
const BUDGET = 100

// Lamp size for each step: big at the start, smaller with every light, small at lights out
const LAMP_SIZES = [72, 66, 60, 54, 48, 42]
const LAMP_SIZE_OUT = 28

// Example data, shown only if the backend can't be reached
const F1_IMG = 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers'

const DEMO = {
  constructors: [
    { id: 1, name: 'McLaren', price: 30, color: '#F47600', image: '' },
    { id: 5, name: 'Aston Martin', price: 18, color: '#229971', image: '' },
    { id: 6, name: 'Williams', price: 15, color: '#1868DB', image: '' },
    { id: 7, name: 'Racing Bulls', price: 13, color: '#6C98FF', image: '' },
    { id: 11, name: 'Cadillac', price: 8, color: '#909090', image: '' }
  ],
  drivers: [
    { id: 2, name: 'Oscar Piastri', number: 81, constructorId: 1, price: 28, image: `${F1_IMG}/O/OSCPIA01_Oscar_Piastri/oscpia01.png.transform/1col/image.png` },
    { id: 9, name: 'Fernando Alonso', number: 14, constructorId: 5, price: 15, image: `${F1_IMG}/F/FERALO01_Fernando_Alonso/feralo01.png.transform/1col/image.png` },
    { id: 12, name: 'Carlos Sainz', number: 55, constructorId: 6, price: 14, image: `${F1_IMG}/C/CARSAI01_Carlos_Sainz/carsai01.png.transform/1col/image.png` },
    { id: 14, name: 'Arvid Lindblad', number: 41, constructorId: 7, price: 7, image: `${F1_IMG}/A/ARVLIN01_Arvid_Lindblad/arvlin01.png.transform/1col/image.png` },
    { id: 22, name: 'Valtteri Bottas', number: 77, constructorId: 11, price: 6, image: `${F1_IMG}/V/VALBOT01_Valtteri_Bottas/valbot01.png.transform/1col/image.png` }
  ],
  teams: [
    {
      id: 1,
      teamName: 'Amanda Racing',
      manager: { name: 'Amanda', country: 'Lebanon' },
      driverIds: [2, 9, 12, 14, 22],
      constructorIds: [6, 11],
      remainingBudget: 7,
      isFinalized: true
    }
  ]
}

// Picture with a fallback: if the image file is missing, show text instead
function Picture({ src, alt, fallback, className }) {
  const [failed, setFailed] = useState(false)
  if (failed) return <span className={`${className} fallback`}>{fallback}</span>
  return <img src={src} alt={alt} className={className} onError={() => setFailed(true)} />
}

// One driver in the featured team (filled through props)
function DriverPick({ driver, color }) {
  const lastName = driver.name.split(' ').slice(-1)[0]
  return (
    <div className="driver-pick" title={`${driver.name} · $${driver.price}M`}>
      <div className="driver-photo" style={{ borderColor: color }}>
        <Picture
          src={driver.image || `/drivers/${driver.id}.png`}
          alt={driver.name}
          fallback={driver.number}
          className="driver-img"
        />
      </div>
      <span className="driver-pick-name">{lastName}</span>
      <span className="pick-price">${driver.price}M</span>
    </div>
  )
}

// One constructor in the featured team (filled through props)
function ConstructorPick({ constructor }) {
  return (
    <div className="constructor-pick" title={`${constructor.name} · $${constructor.price}M`}>
      <div className="constructor-logo" style={{ borderTop: `3px solid ${constructor.color || '#2a2a36'}` }}>
        <Picture
          src={constructor.image || `/constructors/${constructor.id}.png`}
          alt={constructor.name}
          fallback={constructor.name}
          className="constructor-img"
        />
      </div>
      <span className="pick-price">${constructor.price}M</span>
    </div>
  )
}

function Home() {
  // ---------- 1. Start lights ----------
  const [litCount, setLitCount] = useState(0)       // how many light pods are on
  const [lightsOut, setLightsOut] = useState(false) // true once all lights go out
  const [run, setRun] = useState(0)                 // changes to replay the start

  useEffect(() => {
    setLitCount(0)
    setLightsOut(false)

    const timers = []

    // Turn the 5 lights on, one every 0.9 seconds
    LIGHTS.forEach((light) => {
      timers.push(setTimeout(() => setLitCount(light), 600 + (light - 1) * 900))
    })

    // Then all lights go out after a random short delay, like a real race start
    const outTime = 600 + 4 * 900 + 700 + Math.random() * 900
    timers.push(setTimeout(() => setLightsOut(true), outTime))

    // Clean up the timers if the user leaves the page
    return () => timers.forEach(clearTimeout)
  }, [run])

  const lampSize = lightsOut ? LAMP_SIZE_OUT : LAMP_SIZES[litCount]

  // ---------- 2. Data from the backend (drivers, constructors, teams) ----------
  const [drivers, setDrivers] = useState([])
  const [constructors, setConstructors] = useState([])
  const [teams, setTeams] = useState([])
  const [teamIndex, setTeamIndex] = useState(0) // which team is featured

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/drivers`).then((res) => res.json()),
      fetch(`${API_URL}/constructors`).then((res) => res.json()),
      fetch(`${API_URL}/teams`).then((res) => res.json())
    ])
      .then(([driversData, constructorsData, teamsData]) => {
        setDrivers(driversData)
        setConstructors(constructorsData)
        setTeams(teamsData)
      })
      .catch(() => {
        // Backend not running: use the example data instead
        setDrivers(DEMO.drivers)
        setConstructors(DEMO.constructors)
        setTeams(DEMO.teams)
      })
  }, [])

  const findDriver = (id) => drivers.find((d) => d.id === id)
  const findConstructor = (id) => constructors.find((c) => c.id === id)

  // The featured team and its picks
  const team = teams[teamIndex]
  const teamDrivers = team ? team.driverIds.map(findDriver).filter(Boolean) : []
  const teamConstructors = team ? team.constructorIds.map(findConstructor).filter(Boolean) : []
  const spent =
    teamDrivers.reduce((sum, d) => sum + d.price, 0) +
    teamConstructors.reduce((sum, c) => sum + c.price, 0)

  const showTeam = (step) => {
    setTeamIndex((teamIndex + step + teams.length) % teams.length)
  }

  return (
    <div className="home">
      {/* ===== HERO: start lights ===== */}
      <section className="hero">
        <button
          className="lights"
          style={{ '--lamp': `${lampSize}px` }}
          onClick={() => setRun(run + 1)}
          title="Replay the start"
          aria-label="Replay the start lights"
        >
          {LIGHTS.map((light) => (
            <div
              key={light}
              className={`light-pod ${!lightsOut && litCount >= light ? 'on' : ''}`}
            >
              <span className="lamp"></span>
              <span className="lamp"></span>
            </div>
          ))}
        </button>

        <div className={`hero-text ${lightsOut ? 'show' : ''}`}>
          <h1>
            Lights out.<br />
            <span>Build your team.</span>
          </h1>
          <p>Pick your drivers. Back your constructors. Beat the budget.</p>
          <div className="hero-buttons">
            <Link to="/build" className="btn-race">
              <span>Build Your Team</span>
            </Link>
            <Link to="/about" className="btn-race outline">
              <span>How It Works</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== DRIVER TICKER: the 2026 grid, live from the backend ===== */}
      {drivers.length > 0 && (
        <div className="ticker">
          <div className="ticker-label">
            <span>2026 Grid</span>
          </div>
          <div className="ticker-window">
            <div className="ticker-track">
              {/* The list is shown twice so the loop has no gap */}
              {[...drivers, ...drivers].map((driver, index) => {
                const driverTeam = findConstructor(driver.constructorId)
                const color = driverTeam?.color || '#e10600'
                return (
                  <div className="ticker-chip" key={index} style={{ borderLeftColor: color }}>
                    <span className="ticker-photo" style={{ borderColor: color }}>
                      <Picture
                        src={driver.image || `/drivers/${driver.id}.png`}
                        alt={driver.name}
                        fallback={driver.number}
                        className="ticker-img"
                      />
                    </span>
                    <span className="ticker-number" style={{ color }}>#{driver.number}</span>
                    <span className="ticker-name">{driver.name}</span>
                    <span className="ticker-team">{driverTeam?.name}</span>
                    <span className="ticker-price">${driver.price}M</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* ===== FEATURED TEAM (compact, from the backend) ===== */}
      {team && (
        <section className="featured">
          <div className="featured-card">
            <div className="featured-info">
              <span className="section-label">Featured Team</span>
              <h2>{team.teamName}</h2>
              <p className="featured-manager">
                {team.manager.name} · {team.manager.country}
                <span className={`status ${team.isFinalized ? 'final' : 'draft'}`}>
                  {team.isFinalized ? 'Finalized' : 'Draft'}
                </span>
              </p>

              <div className="budget">
                <div className="budget-text">
                  <span><strong>${spent}M</strong> of ${BUDGET}M</span>
                  <span><strong>${BUDGET - spent}M</strong> left</span>
                </div>
                <div className="budget-bar">
                  <div
                    className="budget-fill"
                    style={{ width: `${Math.min((spent / BUDGET) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>

              {teams.length > 1 && (
                <div className="featured-arrows">
                  <button onClick={() => showTeam(-1)} aria-label="Previous team">‹</button>
                  <span>{teamIndex + 1} / {teams.length}</span>
                  <button onClick={() => showTeam(1)} aria-label="Next team">›</button>
                </div>
              )}
            </div>

            <div className="featured-lineup">
              <div className="lineup-drivers">
                {teamDrivers.map((driver) => (
                  <DriverPick
                    key={driver.id}
                    driver={driver}
                    color={findConstructor(driver.constructorId)?.color}
                  />
                ))}
              </div>
              <div className="lineup-divider"></div>
              <div className="lineup-constructors">
                {teamConstructors.map((constructor) => (
                  <ConstructorPick key={constructor.id} constructor={constructor} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== FINISH LINE ===== */}
      <div className="checkered"></div>
      <section className="finish">
        <h2>Ready to race?</h2>
        <p>Your dream line-up is five drivers and two constructors away.</p>
        <Link to="/build" className="btn-race">
          <span>Start Building</span>
        </Link>
      </section>
    </div>
  )
}

export default Home