import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserPage from './pages/UserPage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ProtectedRoutes from './components/ProtectedRoutes'
import Layout from './components/Layout'
import { BeatLoader } from 'react-spinners'
import FarmDetailsPage from './pages/FarmDetailsPage'
import BuyerPage from './pages/BuyerPage'
import ItemDetail from './components/ItemDetail'

const App = () => {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route index element={<ProtectedRoutes><HomePage /></ProtectedRoutes>} />
          <Route path="/" element={<Layout />}>
            <Route path="/user" element={<ProtectedRoutes><UserPage /></ProtectedRoutes>} />
            <Route path="/item/:id" element={<ItemDetail />} />
            <Route path="/buyer-page" element={<ProtectedRoutes><BuyerPage /></ProtectedRoutes>} />
            <Route path="/farm-details" element={<ProtectedRoutes><FarmDetailsPage /></ProtectedRoutes>} />
          </Route>
        </Routes>
      </BrowserRouter>

      <BeatLoader
        color="#deaa00"
        cssOverride={{}}
        loading={false}
        margin={2}
        size={15}
        speedMultiplier={1}
      />

    </>
  )
}

export default App