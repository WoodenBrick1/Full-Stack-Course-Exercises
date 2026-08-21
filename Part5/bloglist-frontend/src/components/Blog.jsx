import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, userId, blogs, setBlogs }) => {

  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const increaseLikes = async () => {

    console.log('Increased likes for: ', blog)

    const newBlog = {
      ...blog,
      likes: likes + 1,
    }

    await blogService.put(newBlog)

    setLikes(likes + 1)
    const index = blogs.indexOf(blog)
    blogs[index] = newBlog
    setBlogs(blogs)

  }

  const showRemove = blog.user.id === userId


  const deleteBlog = async () => {

    if (window.confirm(`Remove Blog: ${blog.title} by ${blog.author}`)) {
      await blogService.deleteBlog(blog.id)

      setBlogs(blogs.filter(arrblog => arrblog.id !== blog.id))
    }
  }


  return (
    <div className='blog'>
      <span>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      </span>

      {visible && (
        <>
          <p>Url: {blog.url}</p>
          <p>Likes: {likes}
            <button onClick={increaseLikes}>Like</button>
          </p>
          <p>Username: {blog.user.username}</p>

        </>)}


      {showRemove && < button className='removeBtn' onClick={deleteBlog}>Remove</button>}
    </div >)
}

export default Blog