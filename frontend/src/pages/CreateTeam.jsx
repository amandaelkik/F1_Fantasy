import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { createTeam, fetchCatalog, resetTeamFeedback } from '../redux/teamsSlice'
import TeamForm from '../components/TeamForm'
import './Teams.css'

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
    <section className="teams-page"><Link to="/teams">← All teams</Link>
      <header className="team-heading"><h1>Create your <span>team.</span></h1></header>
      {catalogStatus === 'loading' && <p role="status">Loading drivers and constructors…</p>}
      {catalogError && <div className="team-error" role="alert">{catalogError} <button onClick={() => dispatch(fetchCatalog())}>Retry</button></div>}
      {catalogStatus === 'succeeded' && <TeamForm drivers={drivers} constructors={constructors}
        onSubmit={handleCreate} saving={saveStatus === 'loading'} error={saveError} submitLabel="Create team" />}
    </section>
  )
}
