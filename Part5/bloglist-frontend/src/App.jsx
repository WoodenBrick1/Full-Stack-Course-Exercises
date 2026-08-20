import { useState, useEffect, useRef } from 'react'

import './index.css'

import blogService from './services/blogs'
import loginService from './services/login'

import Notification from './components/Notification'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {

  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)
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

      const user = JSON.parse(userJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const sendNotification = (message, isError) => {

    setIsError(isError)

    setMessage(message)
    setTimeout(() => {
      setMessage('')
    }, 3000)
  }


  const addBlog = (event) => {
    event.preventDefault()

    blogFormRef.current.toggleVisibility()

    const blogObject = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
    }

    console.log(blogObject)

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))

        sendNotification(`New Blog: ${returnedBlog.title} By ${returnedBlog.author} added`)
      })

  }


  const handleLogin = async (event) => {
    event.preventDefault()


    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loginBlogUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {

      console.log('Error: ' + error)

      sendNotification('Invalid Password or username', true)
    }

  }

  const blogFormRef = useRef()

  const blogForm = () => {
    return (
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm addBlog={addBlog} />
      </Togglable>
    )
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loginBlogUser')
    setUser(null)
  }

  return (
    <div>
      {message && <Notification message={message} isError={isError} />}

      {!user && <LoginForm handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />}
      {user &&
        <div>
          <button onClick={handleLogout}>Logout</button>
          {blogForm()}
          <Blogs blogs={blogs} />
        </div>}

    </div>
  )
}

export default App