import DriverAvatar from './DriverAvatar'

// A team's 5 drivers and 2 constructors.
// "large" shows names and prices (details page); the small version fits on a card.
export default function TeamLineup({ team, drivers, constructors, large = false }) {
  const teamDrivers = team.driverIds.map((id) => drivers.find((d) => d.id === id)).filter(Boolean)
  const teamConstructors = team.constructorIds.map((id) => constructors.find((c) => c.id === id)).filter(Boolean)
  const colorOf = (driver) => constructors.find((c) => c.id === driver.constructorId)?.color

  return (
    <div className={`lineup ${large ? 'large' : ''}`}>
      <div className="lineup-drivers">
        {teamDrivers.map((driver) => (
          <div className="lineup-driver" key={driver.id} title={`${driver.name} · $${driver.price}M`}>
            <DriverAvatar driver={driver} color={colorOf(driver)} size={large ? 60 : 42} />
            {large && (
              <>
                <span className="lineup-name">{driver.name.split(' ').slice(-1)[0]}</span>
                <span className="lineup-price">${driver.price}M</span>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="lineup-constructors">
        {teamConstructors.map((constructor) => (
          <span className="lineup-constructor" key={constructor.id} style={{ borderTopColor: constructor.color }}>
            {constructor.name}
            {large && <small>${constructor.price}M</small>}
          </span>
        ))}
      </div>
    </div>
  )
}
