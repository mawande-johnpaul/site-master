import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import { AppProvider } from './context/AppContext'
import Profile from './pages/profile'

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<Home />} />
          <Route path='/profile' element = {<Profile />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
