// Override this address with VITE_API_URL when the backend runs elsewhere.
const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/$/, '')

async function request(path, options = {}) {
  let response
  try {
    response = await fetch(`${API_URL}${path}`, options)
  } catch {
    throw new Error('Cannot reach the backend. Start the Express server and try again.')
  }
  const data = await response.json()
  if (!response.ok) throw new Error(data.message || `Request failed (${response.status}).`)
  return data
}

const jsonBody = (method, values) => ({
  method,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(values),
})

export const teamsApi = {
  getAll: () => request('/teams'),
  getOne: (id) => request(`/teams/${encodeURIComponent(id)}`),
  create: (values) => request('/teams', jsonBody('POST', values)),
  update: (id, values) => request(`/teams/${encodeURIComponent(id)}`, jsonBody('PUT', values)),
  remove: (id) => request(`/teams/${encodeURIComponent(id)}`, { method: 'DELETE' }),
  getCatalog: async () => {
    const [drivers, constructors] = await Promise.all([
      request('/drivers'), request('/constructors'),
    ])
    return { drivers, constructors }
  },
}
