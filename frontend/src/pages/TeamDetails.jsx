import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { fetchTeamById, fetchCatalog } from '../redux/teamsSlice'
import TeamLineup from '../components/TeamLineup'
import BudgetBar from '../components/BudgetBar'
import './Teams.css'

// Display one team (GET /teams/:id)
export default function TeamDetails() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { selectedTeam: team, detailStatus, detailError, drivers, constructors, catalogStatus, catalogError } = useSelector(state => state.teams)

  useEffect(() => { dispatch(fetchTeamById(id)); dispatch(fetchCatalog()) }, [dispatch, id])

  const ready = detailStatus === 'succeeded' && team && String(team.id) === id

  return (
    <section className="teams-page">
      <div className="teams-wrap">

        {(detailStatus === 'loading' || catalogStatus === 'loading') && <p className="team-note" role="status">Loading team…</p>}
        {(detailError || catalogError) && (
          <div className="team-error" role="alert">
            {detailError || catalogError}
            <button onClick={() => { dispatch(fetchTeamById(id)); dispatch(fetchCatalog()) }}>Retry</button>
          </div>
        )}

        {ready && (
          <article className="team-panel team-detail">
            <header className="detail-header">
              <div>
                <h1>{team.teamName}</h1>
                <p>Managed by {team.manager.name} · {team.manager.country}</p>
              </div>
              <span className={`team-status ${team.isFinalized ? 'final' : 'draft'}`}>
                {team.isFinalized ? 'Finalized' : 'Draft'}
              </span>
            </header>
            <TeamLineup team={team} drivers={drivers} constructors={constructors} large />
            <BudgetBar spent={100 - team.remainingBudget} />
            <div className="team-actions">
              <Link className="team-button" to={`/teams/${id}/edit`}><span>Edit team</span></Link>
              <Link className="team-link danger" to={`/teams/${id}/delete`}>Delete team</Link>
              <Link className="back-button" to="/teams">
                <span><span className="back-arrow" aria-hidden="true">←</span> All teams</span>
              </Link>
            </div>
          </article>
        )}
      </div>
    </section>
  )
}
