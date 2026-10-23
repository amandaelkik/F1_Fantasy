import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchTeams, fetchCatalog } from '../redux/teamsSlice'
import TeamCard from '../components/TeamCard'
import './Teams.css'

// Display all teams (GET /teams)
export default function Teams() {
  const dispatch = useDispatch()
  const { items, listStatus, listError, drivers, constructors } = useSelector(state => state.teams)

  useEffect(() => { dispatch(fetchTeams()); dispatch(fetchCatalog()) }, [dispatch])

  return (
    <section className="teams-page">
      <div className="teams-wrap">
        <header className="team-heading">
          <span className="team-label">Your fantasy garage</span>
          <h1>Build your <span>team</span></h1>
          <p>Five drivers. Two constructors. A $100M budget.</p>
          <Link className="team-button" to="/teams/new"><span>Create team</span></Link>
        </header>

        {listStatus === 'loading' && <p className="team-note" role="status">Loading teams…</p>}
        {listError && (
          <div className="team-error" role="alert">
            {listError} <button onClick={() => dispatch(fetchTeams())}>Retry</button>
          </div>
        )}
        {listStatus === 'succeeded' && items.length === 0 && (
          <p className="team-note">Your garage is empty. Create your first team.</p>
        )}

        {items.length > 0 && (
          <>
            <p className="team-count">{items.length} {items.length === 1 ? 'team' : 'teams'} on the grid</p>
            <div className="teams-grid">
              {items.map(team => (
                <TeamCard key={team.id} team={team} drivers={drivers} constructors={constructors} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
