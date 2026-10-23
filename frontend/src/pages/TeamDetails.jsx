import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { fetchTeamById, fetchCatalog } from '../redux/teamsSlice'
import './Teams.css'

export default function TeamDetails() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { selectedTeam: team, detailStatus, detailError, drivers, constructors, catalogStatus, catalogError } = useSelector(state => state.teams)
  useEffect(() => { dispatch(fetchTeamById(id)); dispatch(fetchCatalog()) }, [dispatch, id])
  return (
    <section className="teams-page"><Link to="/teams">← All teams</Link>
      {(detailStatus === 'loading' || catalogStatus === 'loading') && <p role="status">Loading team…</p>}
      {(detailError || catalogError) && <div className="team-error" role="alert">{detailError || catalogError}
        <button onClick={() => { dispatch(fetchTeamById(id)); dispatch(fetchCatalog()) }}>Retry</button></div>}
      {detailStatus === 'succeeded' && team && String(team.id) === id && <>
        <header className="team-heading"><span className="team-eyebrow">{team.isFinalized ? 'Finalized' : 'Draft'}</span>
          <h1>{team.teamName}</h1><p>Managed by {team.manager.name} · {team.manager.country}</p></header>
        <article className="team-panel">
          <h2>Driver line-up</h2><ul>{team.driverIds.map(driverId => <li key={driverId}>
            {drivers.find(driver => driver.id === driverId)?.name || `Driver #${driverId}`}</li>)}</ul>
          <h2>Constructors</h2><ul>{team.constructorIds.map(constructorId => <li key={constructorId}>
            {constructors.find(constructor => constructor.id === constructorId)?.name || `Constructor #${constructorId}`}</li>)}</ul>
          <p><strong>${team.remainingBudget}M</strong> remaining budget</p>
          <div className="team-actions"><Link className="team-button" to={`/teams/${id}/edit`}>Edit team</Link>
            <Link className="team-button secondary" to={`/teams/${id}/delete`}>Delete team</Link></div>
        </article>
      </>}
    </section>
  )
}
