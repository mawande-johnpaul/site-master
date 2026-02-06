import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import { AppProvider } from './context/AppContext'
import Helpers from './pages/helpers'
import Account from './pages/account'

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<Home />} />
          <Route path='/helpers' element = {<Helpers />} />
          <Route path='/account' element = {<Account />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
