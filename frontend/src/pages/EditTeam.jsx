import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { fetchTeamById, fetchCatalog, updateTeam, resetTeamFeedback } from '../redux/teamsSlice'
import TeamForm from '../components/TeamForm'
import './Teams.css'

export default function EditTeam() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { selectedTeam, detailStatus, detailError, drivers, constructors, catalogStatus, catalogError, saveStatus, saveError } = useSelector(state => state.teams)
  useEffect(() => {
    dispatch(resetTeamFeedback()); dispatch(fetchTeamById(id)); dispatch(fetchCatalog())
  }, [dispatch, id])
  async function handleUpdate(values) {
    try {
      const team = await dispatch(updateTeam({ id, values })).unwrap()
      navigate(`/teams/${team.id}`)
    } catch { /* Keep the entered values and display saveError. */ }
  }
  const ready = detailStatus === 'succeeded' && catalogStatus === 'succeeded' && String(selectedTeam?.id) === id
  return (
    <section className="teams-page"><Link to="/teams">← All teams</Link>
      <header className="team-heading"><h1>Edit your <span>team.</span></h1></header>
      {(detailStatus === 'loading' || catalogStatus === 'loading') && <p role="status">Loading team builder…</p>}
      {(detailError || catalogError) && <div className="team-error" role="alert">{detailError || catalogError}
        <button onClick={() => { dispatch(fetchTeamById(id)); dispatch(fetchCatalog()) }}>Retry</button></div>}
      {ready && <TeamForm key={selectedTeam.id} initialValues={selectedTeam} drivers={drivers} constructors={constructors}
        onSubmit={handleUpdate} saving={saveStatus === 'loading'} error={saveError} submitLabel="Save changes" />}
    </section>
  )
}
