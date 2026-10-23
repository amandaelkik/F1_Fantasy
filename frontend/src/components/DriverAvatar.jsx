import { useState } from 'react'

// A driver's photo in a circle with his team's color.
// If the photo can't load, the driver's number is shown instead.
export default function DriverAvatar({ driver, color, size = 56 }) {
  const [failed, setFailed] = useState(false)

  return (
    <span
      className="driver-avatar"
      style={{ '--size': `${size}px`, borderColor: color || '#2a2a36' }}
    >
      {driver.image && !failed ? (
        <img src={driver.image} alt={driver.name} onError={() => setFailed(true)} />
      ) : (
        <span className="driver-avatar-number">{driver.number}</span>
      )}
    </span>
  )
}
