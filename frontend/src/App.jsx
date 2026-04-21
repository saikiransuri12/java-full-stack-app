import { Routes, Route, Link, Navigate } from 'react-router-dom'
import { useState } from 'react'

// Placeholder page components — replace with real implementations
const Home = () => <h2>Products will be listed here</h2>
const Login = () => <h2>Login form goes here</h2>
const Register = () => <h2>Register form goes here</h2>
const Cart = () => <h2>Cart goes here</h2>
const Orders = () => <h2>Order history goes here</h2>

function App() {
  const [token] = useState(() => localStorage.getItem('token'))

  return (
    <>
      <nav style={{ padding: '1rem', borderBottom: '1px solid #ddd', display: 'flex', gap: '1rem' }}>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        {token ? (
          <>
            <Link to="/orders">Orders</Link>
            <button onClick={() => { localStorage.removeItem('token'); window.location.reload() }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>

      <main style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={token ? <Cart /> : <Navigate to="/login" />} />
          <Route path="/orders" element={token ? <Orders /> : <Navigate to="/login" />} />
        </Routes>
      </main>
    </>
  )
}

export default App
