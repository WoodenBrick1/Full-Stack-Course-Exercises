const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)


describe('When there is blogs in the database', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)
    })

    describe('GET api calls', () => {
        test('all blogs are returned', async () => {
            const response = await api.get('/api/blogs')

            assert.strictEqual(response.body.length, helper.initialBlogs.length)
        })

        test('The Unique identifier is called: id', async () => {
            const blogs = await helper.blogsInDb()
            assert(blogs[0].hasOwnProperty('id'))
        })
    })

    describe('POST api calls', () => {
        test('a blog can be inserted', async () => {
            const blog = {
                title: "Hi",
                author: "Brick",
                url: "fakeurl.com",
                likes: 8
            }

            await api
                .post('/api/blogs')
                .send(blog)
                .expect(201)

            const blogsAtEnd = await helper.blogsInDb()

            assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

            const titles = blogsAtEnd.map(blog => blog.title)
            assert(titles.includes(blog.title))

        })

        test('if a blog is inserted without likes property, the likes will default to 0', async () => {
            const blog = {
                title: "Hi",
                author: "Brick",
                url: "fakeurl.com",
            }

            await api
                .post('/api/blogs')
                .send(blog)
                .expect(201)

            const blogsAtEnd = await helper.blogsInDb()

            assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

            assert.strictEqual(blogsAtEnd.find((blogInArray) => blogInArray.title === blog.title).likes, 0)
        })


        test('if a blog is inserted without title or url property, it should return a status of 400', async () => {
            const blogWithoutTitle = {
                author: "Brick",
                url: "fakeurl.com",
                likes: 12
            }

            const blogWithoutUrl = {
                title: "Hi",
                author: "Brick",
                likes: 12
            }

            await api
                .post('/api/blogs')
                .send(blogWithoutTitle)
                .expect(400)

            await api
                .post('/api/blogs')
                .send(blogWithoutUrl)
                .expect(400)


            const blogsAtEnd = await helper.blogsInDb()

            assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
        })
    })

    describe('DELETE api calls', () => {

        test('Return 204 if the id is valid', async () => {

            const blogsAtStart = await helper.blogsInDb()
            const blogToDelete = blogsAtStart[0]

            await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .expect(204)

            const blogsAtEnd = await helper.blogsInDb()

            assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)

        })
    })
})


after(async () => {
    await mongoose.connection.close()
})