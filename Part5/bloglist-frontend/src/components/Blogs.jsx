import Blog from './Blog'

const Blogs = ({ blogs, handleLogout }) => {

    return (
        <div>
            <h2>blogs</h2>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Blogs