import { useState } from 'react'
import { Link } from 'react-router-dom'
import DriverAvatar from './DriverAvatar'

const BUDGET = 100

// F1 steering-wheel style rev lights for the $100M budget.
// 10 lights, each worth $10M: green, then red, then blue (like a real F1 car).
// Over budget, every light flashes red, like hitting the rev limiter.
function BudgetLights({ spent }) {
  const lit = Math.min(10, Math.ceil(spent / 10))
  const over = spent > 100

  function colorOf(index) {
    if (index >= lit) return ''
    if (index < 4) return 'green'
    if (index < 7) return 'red'
    return 'blue'
  }

  return (
    <div className={`rev-lights ${over ? 'over' : ''}`} role="img" aria-label={`$${spent}M of $100M spent`}>
      {Array.from({ length: 10 }, (_, index) => (
        <span key={index} className={`rev-light ${colorOf(index)}`}></span>
      ))}
    </div>
  )
}

// Removes extra spaces: "  Grid   Girls " -> "Grid Girls"
const clean = (text) => text.trim().replace(/\s+/g, ' ')

// Checks the 3 text fields. Returns an object like { teamName: 'message' } for each field with a problem.
// \p{L} means "any letter in any language", so names like "Rüya" or "رويا" are allowed.
function validateInfo(teamName, managerName, country) {
  const errors = {}

  if (!teamName) {
    errors.teamName = 'Enter a team name.'
  } else if (teamName.length < 2 || teamName.length > 30) {
    errors.teamName = 'Use 2 to 30 characters.'
  } else if (!/^[\p{L}\p{M}\p{N} '&.-]+$/u.test(teamName)) {
    errors.teamName = "Use letters, numbers, spaces and ' - & . only."
  } else if ((teamName.match(/\p{L}/gu) || []).length < 2) {
    errors.teamName = 'The name must contain at least 2 letters.'
  }

  if (!managerName) {
    errors.managerName = "Enter the manager's name."
  } else if (!/^\p{L}[\p{L}\p{M} '-]*$/u.test(managerName)) {
    errors.managerName = "Letters only (spaces, ' and - are fine)."
  } else if (managerName.length < 2 || managerName.length > 40) {
    errors.managerName = 'Use 2 to 40 letters.'
  }

  if (!country) {
    errors.country = 'Enter a country.'
  } else if (!/^\p{L}[\p{L}\p{M} .'-]*$/u.test(country)) {
    errors.country = 'Letters only, e.g. Lebanon.'
  } else if (country.length < 3 || country.length > 56) {
    errors.country = 'Write the full country name.'
  }

  return errors
}

// The team builder, shared by Create Team and Edit Team.
// Left: team info + your picks (stays on screen). Right: drivers and constructors to choose from.
export default function TeamForm({ initialValues, drivers, constructors, onSubmit, saving, error, submitLabel, cancelTo, cancelLabel }) {
  const [form, setForm] = useState(() => ({
    teamName: initialValues?.teamName || '',
    manager: { name: initialValues?.manager.name || '', country: initialValues?.manager.country || '' },
    driverIds: initialValues?.driverIds || [],
    constructorIds: initialValues?.constructorIds || [],
    isFinalized: initialValues?.isFinalized ?? false,
  }))
  const [validationError, setValidationError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})

  const spent = drivers.filter(d => form.driverIds.includes(d.id)).reduce((sum, d) => sum + d.price, 0)
    + constructors.filter(c => form.constructorIds.includes(c.id)).reduce((sum, c) => sum + c.price, 0)
  const remaining = BUDGET - spent
  const findConstructor = (id) => constructors.find(c => c.id === id)

  // The picked drivers/constructors, plus empty slots up to 5 and 2
  const pickedDrivers = form.driverIds.map(id => drivers.find(d => d.id === id)).filter(Boolean)
  const pickedConstructors = form.constructorIds.map(id => findConstructor(id)).filter(Boolean)
  const emptyDriverSlots = Math.max(0, 5 - pickedDrivers.length)
  const emptyConstructorSlots = Math.max(0, 2 - pickedConstructors.length)

  function togglePick(field, id) {
    setForm(previous => ({ ...previous, [field]: previous[field].includes(id)
      ? previous[field].filter(value => value !== id) : [...previous[field], id] }))
    setValidationError('')
  }

  // Update one text field and hide its error message while the user types
  function changeInfo(field, value) {
    if (field === 'teamName') setForm({ ...form, teamName: value })
    else setForm({ ...form, manager: { ...form.manager, [field === 'managerName' ? 'name' : 'country']: value } })
    setFieldErrors(previous => ({ ...previous, [field]: '' }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const teamName = clean(form.teamName)
    const managerName = clean(form.manager.name)
    const country = clean(form.manager.country)

    // 1. Check the text fields; if one is wrong, show its message and move the cursor there
    const errors = validateInfo(teamName, managerName, country)
    setFieldErrors(errors)
    const firstWrong = Object.keys(errors)[0]
    if (firstWrong) {
      event.currentTarget.elements.namedItem(firstWrong)?.focus()
      setValidationError('')
      return
    }

    // 2. Check the picks and the budget
    if (form.driverIds.length !== 5 || form.constructorIds.length !== 2) {
      setValidationError('Choose exactly five drivers and two constructors.'); return
    }
    if (remaining < 0) { setValidationError('Your team exceeds the $100M budget.'); return }

    onSubmit({ ...form, teamName, manager: { name: managerName, country }, remainingBudget: remaining })
  }

  return (
    <form className="builder" onSubmit={handleSubmit} noValidate>
      {/* ===== Budget bar: sticks under the navbar (bottom of the screen on phones) ===== */}
      <div className={`rev-bar ${remaining < 0 ? 'over' : ''}`} aria-live="polite">
        <BudgetLights spent={spent} />
        <div className="rev-money">
          <strong>{remaining < 0 ? `$${-remaining}M over` : `$${remaining}M left`}</strong>
          <small>${spent}M of ${BUDGET}M</small>
        </div>
        <div className="rev-counts">
          <span className={form.driverIds.length === 5 ? 'done' : ''}>Drivers <b>{form.driverIds.length}/5</b></span>
          <span className={form.constructorIds.length === 2 ? 'done' : ''}>Constructors <b>{form.constructorIds.length}/2</b></span>
        </div>
        <button className="team-button" type="submit" disabled={saving}>
          <span>{saving ? 'Saving…' : submitLabel}</span>
        </button>
        {(validationError || error) && <p className="rev-error" role="alert">{validationError || error}</p>}
      </div>

      {/* ===== Left: info + your team ===== */}
      <aside className="builder-side">
        <fieldset className="builder-info" disabled={saving}>
          <legend className="builder-title">Team info</legend>
          <label>Team name
            <input name="teamName" maxLength={30} placeholder="e.g. Grid Girls" value={form.teamName}
              aria-invalid={Boolean(fieldErrors.teamName)}
              onChange={event => changeInfo('teamName', event.target.value)} />
            {fieldErrors.teamName && <span className="field-error">{fieldErrors.teamName}</span>}
          </label>
          <div className="builder-row">
            <label>Manager
              <input name="managerName" maxLength={40} placeholder="Your name" value={form.manager.name}
                aria-invalid={Boolean(fieldErrors.managerName)}
                onChange={event => changeInfo('managerName', event.target.value)} />
              {fieldErrors.managerName && <span className="field-error">{fieldErrors.managerName}</span>}
            </label>
            <label>Country
              <input name="country" maxLength={56} placeholder="e.g. Lebanon" value={form.manager.country}
                aria-invalid={Boolean(fieldErrors.country)}
                onChange={event => changeInfo('country', event.target.value)} />
              {fieldErrors.country && <span className="field-error">{fieldErrors.country}</span>}
            </label>
          </div>
        </fieldset>

        <div className="builder-summary">
          <div className="builder-title">Your team</div>

          {/* Picked items; click one to remove it */}
          <div className="slots">
            {pickedDrivers.map(driver => (
              <button type="button" key={driver.id} className="slot" disabled={saving}
                onClick={() => togglePick('driverIds', driver.id)} title={`Remove ${driver.name}`}>
                <DriverAvatar driver={driver} color={findConstructor(driver.constructorId)?.color} size={40} />
              </button>
            ))}
            {Array.from({ length: emptyDriverSlots }, (_, i) => <span key={`d${i}`} className="slot empty" />)}
          </div>
          <div className="slots constructors">
            {pickedConstructors.map(constructor => (
              <button type="button" key={constructor.id} className="slot-constructor" disabled={saving}
                style={{ borderTopColor: constructor.color }}
                onClick={() => togglePick('constructorIds', constructor.id)} title={`Remove ${constructor.name}`}>
                {constructor.name}
              </button>
            ))}
            {Array.from({ length: emptyConstructorSlots }, (_, i) => <span key={`c${i}`} className="slot-constructor empty">Constructor</span>)}
          </div>

          <label className="team-check">
            <input type="checkbox" checked={form.isFinalized} disabled={saving}
              onChange={event => setForm({ ...form, isFinalized: event.target.checked })} />
            Mark as finalized
          </label>
          {cancelTo && <Link className="builder-cancel" to={cancelTo}>← {cancelLabel}</Link>}
        </div>
      </aside>

      {/* ===== Right: choices ===== */}
      <div className="builder-main">
        <fieldset disabled={saving}>
          <legend className="builder-title">Pick 5 drivers</legend>
          <div className="tile-grid">
            {drivers.map(driver => {
              const team = findConstructor(driver.constructorId)
              const picked = form.driverIds.includes(driver.id)
              const tooMuch = !picked && driver.price > remaining // can't afford him with what's left
              return (
                <label key={driver.id} className={`tile ${picked ? 'picked' : ''} ${tooMuch ? 'too-much' : ''}`}
                  style={{ '--team': team?.color || '#e10600' }} title={`${driver.name} · ${team?.name}`}>
                  <input type="checkbox" className="visually-hidden" checked={picked}
                    disabled={!picked && form.driverIds.length >= 5}
                    onChange={() => togglePick('driverIds', driver.id)} />
                  <DriverAvatar driver={driver} color={team?.color} size={44} />
                  <strong>{driver.name.split(' ').slice(-1)[0]}</strong>
                  <small>${driver.price}M{tooMuch && ' · too much'}</small>
                </label>
              )
            })}
          </div>
        </fieldset>

        <fieldset disabled={saving}>
          <legend className="builder-title">Pick 2 constructors</legend>
          <div className="tile-grid constructors">
            {constructors.map(constructor => {
              const picked = form.constructorIds.includes(constructor.id)
              const tooMuch = !picked && constructor.price > remaining
              return (
                <label key={constructor.id} className={`tile constructor ${picked ? 'picked' : ''} ${tooMuch ? 'too-much' : ''}`}
                  style={{ '--team': constructor.color }}>
                  <input type="checkbox" className="visually-hidden" checked={picked}
                    disabled={!picked && form.constructorIds.length >= 2}
                    onChange={() => togglePick('constructorIds', constructor.id)} />
                  <strong>{constructor.name}</strong>
                  <small>${constructor.price}M{tooMuch && ' · too much'}</small>
                </label>
              )
            })}
          </div>
        </fieldset>
      </div>
    </form>
  )
}
