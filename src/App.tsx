import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Passgate } from './components/Passgate'
import { Dashboard } from './pages/Dashboard'
import { DayDetail } from './pages/DayDetail'
import { WorkoutDetail } from './pages/WorkoutDetail'

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Passgate>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/day/:date" element={<DayDetail />} />
          <Route path="/workout/:slug" element={<WorkoutDetail />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
        <Toaster position="top-center" />
      </Passgate>
    </BrowserRouter>
  )
}

export default App
