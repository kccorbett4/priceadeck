import { Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import StatePage from './StatePage.jsx'
import BlogPage from './BlogPage.jsx'
import HubPage from './HubPage.jsx'
import CityPage from './CityPage.jsx'
import DataPage from './DataPage.jsx'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/blog/:slug" element={<BlogPage />} />
      <Route path="/deck-cost-by-state" element={<HubPage />} />
      <Route path="/deck-cost-data" element={<DataPage />} />
      <Route path="/city/:citySlug" element={<CityPage />} />
      <Route path="/:stateSlug" element={<StatePage />} />
    </Routes>
  )
}
