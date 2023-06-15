import React from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/footer'
import { Container } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'


function App() {
  

  return (
    <>
    <Router>
      <Header/>
      <main>
        <Container>
        <Routes>
          <Route exact path="/" element={<HomeScreen/>} />
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/cart/:id?" element={<CartScreen/>} />
          <Route path="/login" element={<LoginScreen/>} />
          <Route path="/register" element={<RegisterScreen/>} />
        </Routes>
        </Container>

      </main>
      
      <Footer/>
      </Router>
    </>
  )
}

export default App
