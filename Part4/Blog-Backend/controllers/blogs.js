const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    if (!body.likes) {
        body.likes = 0
    }

    if (!body.title || !body.url) {
        return response.status(400).end()
    }

    const blog = new Blog(body)

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)

})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

module.exports = blogsRouter