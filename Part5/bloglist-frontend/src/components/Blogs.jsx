import Blog from './Blog'

const Blogs = ({ blogs, userId, increaseLikes, removeBlog }) => {
    console.log(blogs)

    // Sort based on likes
    blogs.sort((prev, blog) => blog.likes - prev.likes)

    return (
        <div>
            <h2>blogs</h2>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} userId={userId} increaseLikes={increaseLikes} removeBlog={removeBlog} />
            )}

        </div>
    )
}

export default Blogs