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
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderSreen from './screens/PlaceOrderSreen'
import OrderScreen from './screens/OrderScreen'
import UsersListScreen from './screens/UsersListScreen'
import UserEditScreen from './screens/userEditSreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListSreen'


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
          <Route path="/profile" element={<ProfileScreen/>} />
          <Route path="/shipping" element={<ShippingScreen/>} />
          <Route path="/payment" element={<PaymentScreen/>} />
          <Route path="/placeorder" element={<PlaceOrderSreen/>} />
          <Route path="/order/:id" element={<OrderScreen/>} />
          <Route path="/admin/userslist" element={<UsersListScreen/>} />
          <Route path="/admin/user/:id" element={<UserEditScreen/>} />
          <Route path="/admin/productlist" element={<ProductListScreen/>} />
          <Route path="/admin/product/:id/edit" element={<ProductEditScreen/>} />
          <Route path="/admin/orderlist" element={<OrderListScreen/>} />
        </Routes>
        </Container>

      </main>
      
      <Footer/>
      </Router>
    </>
  )
}

export default App
