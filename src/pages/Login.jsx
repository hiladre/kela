import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!username.trim() || !password.trim()) {
      setError('Please enter username and password')
      return
    }

    if (password.length >= 4) {
      localStorage.setItem('authUser', username)
      navigate('/dashboard')
      window.location.reload()
    } else {
      setError('Password must be at least 4 characters')
    }
  }

  return (
    <div className="login-page" data-testid="login-page">
      <div className="login-container">
        <h1 data-testid="login-title">Login</h1>
        <form onSubmit={handleSubmit} data-testid="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              data-testid="login-username"
              autoComplete="username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              data-testid="login-password"
              autoComplete="current-password"
            />
          </div>
          {error && <p className="error-message" data-testid="login-error">{error}</p>}
          <button type="submit" data-testid="login-submit">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
