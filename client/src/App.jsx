import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserPage from './pages/UserPage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="/" element={<Layout />}>
            <Route path="/user" element={<UserPage />} />
            <Route index element={<HomePage />} />
          </Route>
          <Navbar />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App