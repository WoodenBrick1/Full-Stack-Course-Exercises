const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const User = require('../models/user')

const api = supertest(app)


describe('When there is a user in the database', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const user = new User(
            {
                username: "I am a test",
                name: "Testing",
                password: "AAAAAAAAA"
            }
        )

        await user.save()
    })

    describe('GET api calls', () => {
        test('all blogs are returned', async () => {
            const response = await api.get('/api/users')

            assert.strictEqual(response.body.length, 1)
        })
    })

    describe('POST api calls', () => {
        test('a user can be inserted', async () => {
            const user = {
                username: "TEST2",
                name: "Brick",
                password: "Thisisapassword"
            }

            await api
                .post('/api/users')
                .send(user)
                .expect(201)

            const usersAtEnd = await helper.usersInDb()

            assert.strictEqual(usersAtEnd.length, 1 + 1)

            const usernames = usersAtEnd.map(user => user.username)
            assert(usernames.includes(user.username))

        })

        test('a user can\'t be inserted if username is not unique', async () => {
            const user = {
                username: "I am a test",
                name: "",
                password: "Thisisapassword"
            }

            await api
                .post('/api/users')
                .send(user)
                .expect(400, { error: 'expected `username` to be unique' })

            const usersAtEnd = await helper.usersInDb()

            assert.strictEqual(usersAtEnd.length, 1)

        })

        test.only('a user can\'t be inserted if username or password is not given or is too short', async () => {


            const userWithoutUsername = {
                name: "Brick",
                password: "Thisisapassword"
            }

            const userWithoutPassword = {
                username: "TEST2",
                name: "Brick",
            }

            const userWithShortUsername = {
                username: "TE",
                name: "Brick",
                password: "Thisisapassword"
            }

            const userWithShortPassword = {
                username: "TEST2",
                name: "Brick",
                password: "pa"
            }


            await api
                .post('/api/users')
                .send(userWithoutUsername)
                .expect(400)

            await api
                .post('/api/users')
                .send(userWithoutPassword)
                .expect(400, { error: 'Please enter a password' })


            await api
                .post('/api/users')
                .send(userWithShortUsername)
                .expect(400)

            await api
                .post('/api/users')
                .send(userWithShortPassword)
                .expect(400, { error: 'Password must be at least 3 characters' })

            const usersAtEnd = await helper.usersInDb()

            assert.strictEqual(usersAtEnd.length, 1)

        })

    })

})


after(async () => {
    await mongoose.connection.close()
})
