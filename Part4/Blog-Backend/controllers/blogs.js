const blogsRouter = require('express').Router()
const { request } = require('express')
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

blogsRouter.put('/:id', async (request, response) => {
    const id = request.params.id
    const { title, author, url, likes } = request.body
    const blog = await Blog.findById(id)

    if (!blog) {
        return response.status(404).end()
    }

    blog.title = title
    blog.author = author
    blog.url = url
    blog.likes = likes

    const updatedBlog = await blog.save()
    response.status(200).json(updatedBlog)


})

module.exports = blogsRouter