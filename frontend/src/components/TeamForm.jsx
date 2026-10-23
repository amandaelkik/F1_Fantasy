import { useState } from 'react'

const BUDGET = 100

export default function TeamForm({ initialValues, drivers, constructors, onSubmit, saving, error, submitLabel }) {
  const [form, setForm] = useState(() => ({
    teamName: initialValues?.teamName || '',
    manager: { name: initialValues?.manager.name || '', country: initialValues?.manager.country || '' },
    driverIds: initialValues?.driverIds || [],
    constructorIds: initialValues?.constructorIds || [],
    isFinalized: initialValues?.isFinalized ?? false,
  }))
  const [validationError, setValidationError] = useState('')
  const spent = drivers.filter(d => form.driverIds.includes(d.id)).reduce((sum, d) => sum + d.price, 0)
    + constructors.filter(c => form.constructorIds.includes(c.id)).reduce((sum, c) => sum + c.price, 0)
  const remaining = BUDGET - spent

  function togglePick(field, id) {
    setForm(previous => ({ ...previous, [field]: previous[field].includes(id)
      ? previous[field].filter(value => value !== id) : [...previous[field], id] }))
    setValidationError('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!form.teamName.trim() || !form.manager.name.trim() || !form.manager.country.trim()) {
      setValidationError('Enter a team name, manager name, and country.'); return
    }
    if (form.driverIds.length !== 5 || form.constructorIds.length !== 2) {
      setValidationError('Choose exactly five drivers and two constructors.'); return
    }
    if (remaining < 0) { setValidationError('Your team exceeds the $100M budget.'); return }
    onSubmit({ ...form, teamName: form.teamName.trim(), manager: {
      name: form.manager.name.trim(), country: form.manager.country.trim(),
    }, remainingBudget: remaining })
  }

  return (
    <form className="team-panel team-form" onSubmit={handleSubmit}>
      <fieldset disabled={saving}>
        <legend>Team information</legend>
        <div className="team-fields">
          <label>Team name<input required maxLength={80} value={form.teamName}
            onChange={event => setForm({ ...form, teamName: event.target.value })} /></label>
          <label>Manager name<input required maxLength={80} value={form.manager.name}
            onChange={event => setForm({ ...form, manager: { ...form.manager, name: event.target.value } })} /></label>
          <label>Country<input required maxLength={80} value={form.manager.country}
            onChange={event => setForm({ ...form, manager: { ...form.manager, country: event.target.value } })} /></label>
        </div>
      </fieldset>
      <div className={`team-budget ${remaining < 0 ? 'over-budget' : ''}`} aria-live="polite">
        <strong>${remaining}M remaining</strong><span>${spent}M of $100M spent</span>
      </div>
      <fieldset disabled={saving}>
        <legend>Drivers ({form.driverIds.length}/5)</legend>
        <div className="team-picks">
          {drivers.map(driver => (
            <label className={`team-pick ${form.driverIds.includes(driver.id) ? 'selected' : ''}`} key={driver.id}>
              <input type="checkbox" checked={form.driverIds.includes(driver.id)}
                disabled={!form.driverIds.includes(driver.id) && form.driverIds.length >= 5}
                onChange={() => togglePick('driverIds', driver.id)} />
              <span>#{driver.number} {driver.name}</span><strong>${driver.price}M</strong>
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset disabled={saving}>
        <legend>Constructors ({form.constructorIds.length}/2)</legend>
        <div className="team-picks">
          {constructors.map(constructor => (
            <label className={`team-pick ${form.constructorIds.includes(constructor.id) ? 'selected' : ''}`} key={constructor.id}>
              <input type="checkbox" checked={form.constructorIds.includes(constructor.id)}
                disabled={!form.constructorIds.includes(constructor.id) && form.constructorIds.length >= 2}
                onChange={() => togglePick('constructorIds', constructor.id)} />
              <span style={{ borderLeft: `3px solid ${constructor.color}`, paddingLeft: 8 }}>{constructor.name}</span>
              <strong>${constructor.price}M</strong>
            </label>
          ))}
        </div>
      </fieldset>
      <label className="team-check"><input type="checkbox" checked={form.isFinalized} disabled={saving}
        onChange={event => setForm({ ...form, isFinalized: event.target.checked })} /> Mark as finalized</label>
      {(validationError || error) && <p className="team-error" role="alert">{validationError || error}</p>}
      <button className="team-button" type="submit" disabled={saving}>{saving ? 'Saving…' : submitLabel}</button>
    </form>
  )
}
