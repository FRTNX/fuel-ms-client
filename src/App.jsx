import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Home from './views/Home';
import VehiclesPage from './views/VehiclesPage';
import Vehicle from './views/Vehicle';
import ActiveVehicles from './views/ActiveVehicles';
import Violations from './views/Violations';
import EventsPage from './views/Events';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/vehicles'} element={<VehiclesPage />} />
        <Route path={'/active'} element={<Violations />} />
        <Route path={'/violations'} element={<Violations />} />
        <Route path={'/events'} element={<Violations />} />
        <Route path={'/vehicle/:license'} element={<Vehicle />} />
      </Routes>

    </Router>
  )
}

export default App
