import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/navbar'
import Footer from './components/footer'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import ContactUs from "./pages/ContactUs";

import Teams from './pages/Teams'
import TeamDetails from './pages/TeamDetails'
import CreateTeam from './pages/CreateTeam'
import EditTeam from './pages/EditTeam'
import DeleteTeam from './pages/DeleteTeam'

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/build" element={<Navigate to="/teams" replace />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/teams/new" element={<CreateTeam />} />
          <Route path="/teams/:id" element={<TeamDetails />} />
          <Route path="/teams/:id/edit" element={<EditTeam />} />
          <Route path="/teams/:id/delete" element={<DeleteTeam />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App