import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createTeam, fetchCatalog, resetTeamFeedback } from '../redux/teamsSlice'
import TeamForm from '../components/TeamForm'
import './Teams.css'

// Submit a new team (POST /teams)
export default function CreateTeam() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { drivers, constructors, catalogStatus, catalogError, saveStatus, saveError } = useSelector(state => state.teams)

  useEffect(() => { dispatch(resetTeamFeedback()); dispatch(fetchCatalog()) }, [dispatch])

  async function handleCreate(values) {
    try {
      const team = await dispatch(createTeam(values)).unwrap()
      navigate(`/teams/${team.id}`)
    } catch { /* The slice exposes the error to the form. */ }
  }

  return (
    <section className="teams-page">
      <div className="teams-wrap">
        <header className="team-heading compact">
          <span className="team-label">New team</span>
          <h1>Create your <span>team</span></h1>
          <p>Pick five drivers and two constructors without going over $100M.</p>
        </header>

        {catalogStatus === 'loading' && <p className="team-note" role="status">Loading drivers and constructors…</p>}
        {catalogError && (
          <div className="team-error" role="alert">
            {catalogError} <button onClick={() => dispatch(fetchCatalog())}>Retry</button>
          </div>
        )}
        {catalogStatus === 'succeeded' && (
          <TeamForm drivers={drivers} constructors={constructors} onSubmit={handleCreate}
            saving={saveStatus === 'loading'} error={saveError} submitLabel="Create team"
            cancelTo="/teams" cancelLabel="Back to all teams" />
        )}
      </div>
    </section>
  )
}
