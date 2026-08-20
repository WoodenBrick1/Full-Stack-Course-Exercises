import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {

  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const increaseLikes = async () => {

    console.log("Increased likes for: ", blog)

    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: likes + 1,
    }

    const returnedBLog = await blogService.put(newBlog, blog.id)

    setLikes(returnedBLog.likes)
  }



  return (
    <div className="blog">
      {blog.title} {blog.author}

      {visible && (
        <>
          <p>Url: {blog.url}</p>
          <p>Likes: {likes}
            <button onClick={increaseLikes}>Like</button>
          </p>
          <p>Username: {blog.user.username}</p>

        </>)}


      <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
    </div>)
}

export default Blog