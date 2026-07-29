const jwt = require('jsonwebtoken')

const blogsRouter = require('express').Router()
const { request } = require('express')
const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1 })
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

    const user = request.user

    if (!user) {
        return response.status(400).json({ error: 'userId missing or not valid' })
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user.id
    })


    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()

    response.status(201).json(savedBlog)

})

blogsRouter.delete('/:id', async (request, response) => {

    const user = request.user

    if (!user || !(user.blogs.includes(request.params.id))) {
        return response.status(400).json({ error: 'Could Not Find User' })
    }

    user.blogs = user.blogs.filter(blog => blog.id.toString() !== request.params.id.toString())
    await user.save()

    await Blog.findByIdAndDelete(request.params.id)

    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const id = request.params.id
    const { title, author, url, likes, userId } = request.body
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