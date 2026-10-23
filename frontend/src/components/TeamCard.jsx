import { Link } from 'react-router-dom'
import TeamLineup from './TeamLineup'
import BudgetBar from './BudgetBar'

// One team in the All Teams list
export default function TeamCard({ team, drivers, constructors }) {
  return (
    <article className="team-card">
      <div className="team-card-top">
        <h2>{team.teamName}</h2>
        <span className={`team-status ${team.isFinalized ? 'final' : 'draft'}`}>
          {team.isFinalized ? 'Finalized' : 'Draft'}
        </span>
      </div>
      <p className="team-manager">{team.manager.name} · {team.manager.country}</p>

      <TeamLineup team={team} drivers={drivers} constructors={constructors} />
      <BudgetBar spent={100 - team.remainingBudget} />

      <div className="team-actions">
        <Link className="team-button" to={`/teams/${team.id}`}><span>View team</span></Link>
        <Link className="team-link" to={`/teams/${team.id}/edit`}>Edit</Link>
        <Link className="team-link danger" to={`/teams/${team.id}/delete`}>Delete</Link>
      </div>
    </article>
  )
}
