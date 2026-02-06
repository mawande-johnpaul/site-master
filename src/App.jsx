import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import { AppProvider } from './context/AppContext'
import Helpers from './pages/helpers'
import Account from './pages/account'
import ProductPage from './pages/product'

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<Home />} />
          <Route path='/helpers' element = {<Helpers />} />
          <Route path='/account' element = {<Account />} />
          <Route path='/product/:id' element = {<ProductPage />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
