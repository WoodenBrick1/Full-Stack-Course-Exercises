import { useState } from 'react'

const Blog = ({ blog, userId, increaseLikes, removeBlog }) => {

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }


  console.log('Blog userid: ' + blog.user.id + ' userId: ' + userId)
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