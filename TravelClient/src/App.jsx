import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import NavBar from './component/NavBar'
import UserRegster from './pages/UserRegster'
import AgencyRegister from './pages/AgencyRegister'
import LoginPages from './pages/LoginPages'

function App() {


  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/navbar' element={<NavBar />} />
          <Route path='/user-register' element={<UserRegster />} />
          <Route path='/agency-register' element={<AgencyRegister />} />
          <Route path='/login-page' element={<LoginPages />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
