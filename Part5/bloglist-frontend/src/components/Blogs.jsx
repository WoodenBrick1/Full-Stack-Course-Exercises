import Blog from './Blog'

const Blogs = ({ blogs, handleLogout }) => {

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
            <h2>blogs</h2>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )
}

export default Blogs