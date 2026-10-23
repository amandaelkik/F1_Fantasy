const BUDGET = 100

// Shows how much of the $100M budget a team has spent
export default function BudgetBar({ spent }) {
  const left = BUDGET - spent
  const percent = Math.min((spent / BUDGET) * 100, 100)

  return (
    <div className={`budget-meter ${left < 0 ? 'over' : ''}`}>
      <div className="budget-meter-text">
        <span><strong>${spent}M</strong> of ${BUDGET}M</span>
        <span><strong>${left}M</strong> left</span>
      </div>
      <div className="budget-meter-bar">
        <div className="budget-meter-fill" style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  )
}
