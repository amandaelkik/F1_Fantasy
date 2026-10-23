import { Link } from 'react-router-dom'

export default function TeamCard({ team }) {
  return (
    <article className="team-panel">
      <span className="team-eyebrow">{team.isFinalized ? 'Finalized' : 'Draft'}</span>
      <h2>{team.teamName}</h2>
      <p>{team.manager.name} · {team.manager.country}</p>
      <p>{team.driverIds.length} drivers · {team.constructorIds.length} constructors</p>
      <p><strong>${team.remainingBudget}M</strong> remaining</p>
      <div className="team-actions">
        <Link className="team-button" to={`/teams/${team.id}`}>View team</Link>
        <Link className="team-button secondary" to={`/teams/${team.id}/edit`}>Edit</Link>
        <Link className="team-button secondary" to={`/teams/${team.id}/delete`}>Delete</Link>
      </div>
    </article>
  )
}
