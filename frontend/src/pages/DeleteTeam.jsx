import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { fetchTeamById, fetchCatalog, deleteTeam, resetTeamFeedback } from '../redux/teamsSlice'
import TeamLineup from '../components/TeamLineup'
import './Teams.css'

// Delete a team (DELETE /teams/:id)
export default function DeleteTeam() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { selectedTeam: team, detailStatus, detailError, deleteStatus, deleteError, drivers, constructors } = useSelector(state => state.teams)

  useEffect(() => { dispatch(resetTeamFeedback()); dispatch(fetchTeamById(id)); dispatch(fetchCatalog()) }, [dispatch, id])

  async function handleDelete() {
    try { await dispatch(deleteTeam(id)).unwrap(); navigate('/teams') }
    catch { /* The slice exposes deleteError below. */ }
  }

  return (
    <section className="teams-page">
      <div className="teams-wrap narrow">
        <header className="team-heading compact">
          <span className="team-label">Retire a team</span>
          <h1>Delete <span>team?</span></h1>
        </header>

        {detailStatus === 'loading' && <p className="team-note" role="status">Loading team…</p>}
        {detailError && (
          <div className="team-error" role="alert">
            {detailError} <button onClick={() => dispatch(fetchTeamById(id))}>Retry</button>
          </div>
        )}

        {detailStatus === 'succeeded' && team && String(team.id) === id && (
          <article className="team-panel danger-panel">
            <h2>{team.teamName}</h2>
            <p className="team-manager">{team.manager.name} · {team.manager.country}</p>
            <TeamLineup team={team} drivers={drivers} constructors={constructors} />
            <p className="delete-warning">This removes the team from your garage. This action cannot be undone.</p>
            {deleteError && <p className="team-error" role="alert">{deleteError}</p>}
            <div className="team-actions">
              <button className="team-button" disabled={deleteStatus === 'loading'} onClick={handleDelete}>
                <span>{deleteStatus === 'loading' ? 'Deleting…' : 'Confirm delete'}</span>
              </button>
              {deleteStatus !== 'loading' && <Link className="team-button outline" to={`/teams/${id}`}><span>Cancel</span></Link>}
            </div>
          </article>
        )}
      </div>
    </section>
  )
}
