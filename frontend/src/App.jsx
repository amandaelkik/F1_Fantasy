import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import Teams from './pages/Teams'
import TeamDetails from './pages/TeamDetails'
import CreateTeam from './pages/CreateTeam'
import EditTeam from './pages/EditTeam'
import DeleteTeam from './pages/DeleteTeam'
import NotFound from './pages/NotFound'

// React Router keeps the scroll position when the page changes,
// so this scrolls back to the top every time the URL changes.
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  return (
    <div className="app">
      <ScrollToTop />
      <Navbar />
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />

          {/* Team views (CRUD) */}
          <Route path="/teams" element={<Teams />} />
          <Route path="/teams/new" element={<CreateTeam />} />
          <Route path="/teams/:id" element={<TeamDetails />} />
          <Route path="/teams/:id/edit" element={<EditTeam />} />
          <Route path="/teams/:id/delete" element={<DeleteTeam />} />

          {/* Home's buttons link to /build, so send them to the teams page */}
          <Route path="/build" element={<Navigate to="/teams" replace />} />

          {/* Any other URL */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
