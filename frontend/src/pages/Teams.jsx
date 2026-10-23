import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchTeams } from '../redux/teamsSlice'
import TeamCard from '../components/TeamCard'
import './Teams.css'

export default function Teams() {
  const dispatch = useDispatch()
  const { items, listStatus, listError } = useSelector(state => state.teams)
  useEffect(() => { dispatch(fetchTeams()) }, [dispatch])
  return (
    <section className="teams-page">
      <header className="team-heading"><span className="team-eyebrow">Your fantasy garage</span>
        <h1>Build your <span>team.</span></h1><p>Five drivers. Two constructors. A $100M budget.</p>
        <Link className="team-button" to="/teams/new">Create team →</Link>
      </header>
      {listStatus === 'loading' && <p role="status">Loading teams…</p>}
      {listError && <div className="team-error" role="alert">{listError} <button onClick={() => dispatch(fetchTeams())}>Retry</button></div>}
      {listStatus === 'succeeded' && items.length === 0 && <p>Your garage is empty. Create your first team.</p>}
      <div className="teams-grid">{items.map(team => <TeamCard key={team.id} team={team} />)}</div>
    </section>
  )
}
