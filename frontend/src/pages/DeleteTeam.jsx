import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { fetchTeamById, deleteTeam, resetTeamFeedback } from '../redux/teamsSlice'
import './Teams.css'

export default function DeleteTeam() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { selectedTeam: team, detailStatus, detailError, deleteStatus, deleteError } = useSelector(state => state.teams)
  useEffect(() => { dispatch(resetTeamFeedback()); dispatch(fetchTeamById(id)) }, [dispatch, id])
  async function handleDelete() {
    try { await dispatch(deleteTeam(id)).unwrap(); navigate('/teams') }
    catch { /* The slice exposes deleteError below. */ }
  }
  return (
    <section className="teams-page"><header className="team-heading"><h1>Delete <span>team?</span></h1></header>
      {detailStatus === 'loading' && <p role="status">Loading team…</p>}
      {detailError && <div className="team-error" role="alert">{detailError} <button onClick={() => dispatch(fetchTeamById(id))}>Retry</button></div>}
      {detailStatus === 'succeeded' && team && String(team.id) === id && <article className="team-panel">
        <h2>{team.teamName}</h2><p>Manager: {team.manager.name} · {team.manager.country}</p>
        <p>This removes the team from your garage. This action cannot be undone.</p>
        {deleteError && <p className="team-error" role="alert">{deleteError}</p>}
        <div className="team-actions"><button className="team-button" disabled={deleteStatus === 'loading'} onClick={handleDelete}>
          {deleteStatus === 'loading' ? 'Deleting…' : 'Confirm delete'}</button>
          {deleteStatus !== 'loading' && <Link className="team-button secondary" to={`/teams/${id}`}>Cancel</Link>}</div>
      </article>}
      <Link to="/teams">Back to all teams</Link>
    </section>
  )
}
