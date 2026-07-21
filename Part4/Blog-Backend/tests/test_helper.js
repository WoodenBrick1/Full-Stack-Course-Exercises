const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "Hello!",
        author: "Brick",
        url: "fakeurl.com",
        likes: 4
    },
    {
        title: "A Hello Story",
        author: "Not Brick",
        url: "helloUrl",
        likes: 123
    },
]


const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb
}