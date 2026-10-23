import { Link } from 'react-router-dom'
import './Teams.css'

// Shown for any URL that doesn't match a route
export default function NotFound() {
  return (
    <section className="teams-page">
      <div className="teams-wrap not-found">
        <span className="team-label">Error 404</span>
        <h1 className="not-found-title">Off <span>track</span></h1>
        <p className="team-note">This page doesn't exist. Let's get you back on the racing line.</p>
        <Link className="team-button" to="/"><span>Back to home</span></Link>
      </div>
    </section>
  )
}
