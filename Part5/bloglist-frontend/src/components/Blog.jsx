import { useState } from 'react'

const Blog = ({ blog }) => {

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      {blog.title} {blog.author}

      {visible && (
        <>
          <p>Url: {blog.url}</p>
          <p>Likes: {blog.likes}
            <button>Like</button>
          </p>
          <p>Username: {blog.user.username}</p>

        </>)}


      <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
    </div>)
}

export default Blog