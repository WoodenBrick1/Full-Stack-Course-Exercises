import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'

import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const userJson = window.localStorage.getItem('loginBlogUser')

    if (userJson) {
      setUser(JSON.parse(userJson))
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    const user = await loginService.login({ username, password })

    window.localStorage.setItem('loginBlogUser', JSON.stringify(user))
    setUser(user)
    setUsername('')
    setPassword('')
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loginBlogUser')
    setUser(null)
  }

  return (
    <div>

      {!user && <LoginForm handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />}
      {user && <Blogs blogs={blogs} handleLogout={handleLogout} />}

    </div>
  )
}

export default App