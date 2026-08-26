import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, userId, increaseLikes, removeBlog }) => {

  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const toggleVisibility = () => {
    setVisible(!visible)
  }


  const showRemove = blog.user.id === userId


  return (
    <div className='blog'>
      <span>
        <p>{blog.title} </p>  <p>{blog.author}</p>
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      </span>

      {visible && (
        <>
          <p>Url: {blog.url}</p>
          <p>Likes: {blog.likes}
            <button onClick={() => increaseLikes(blog)}>Like</button>
          </p>
          <p>Username: {blog.user.username}</p>

        </>)}


      {showRemove && < button className='removeBtn' onClick={() => removeBlog(blog)}>Remove</button>}
    </div >)
}

export default Blog