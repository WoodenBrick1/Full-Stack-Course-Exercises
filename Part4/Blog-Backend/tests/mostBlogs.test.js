const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')


describe('mostBlogs with 0 blogs', () => {
    const listWithZeroBlogs = [
    ]

    test('when list has 0 blogs, it should return null', () => {
        const result = listHelper.mostBlogs(listWithZeroBlogs)
        assert.strictEqual(result, null)
    })

})

describe('mostBlogs with 1 blog', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0

        }
    ]

    test('when list has 1 blogs, it should the author and blogs: 1', () => {
        const result = listHelper.mostBlogs(listWithOneBlog)
        assert.deepStrictEqual(result, {
            author: 'Edsger W. Dijkstra',
            blogs: 1
        })
    })

})

describe('mostBlogs with 2 blogs with the same author', () => {
    const listWithTwoBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0

        },
        {
            _id: '5a422aa71b54a676234d17f7',
            title: 'Go To Testing Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 9,
            __v: 0

        }
    ]

    test('when list has 2 blogs with the same author, it should the author and blogs: 2', () => {
        const result = listHelper.mostBlogs(listWithTwoBlogs)
        assert.deepStrictEqual(result, {
            author: 'Edsger W. Dijkstra',
            blogs: 2
        })
    })

})

describe('mostBlogs with 2 blogs with the different author', () => {
    const listWithTwoBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0

        },
        {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0
        },
    ]

    test('when list has 2 blogs with different authors, it should the first author and blogs: 1', () => {
        const result = listHelper.mostBlogs(listWithTwoBlogs)
        assert.deepStrictEqual(result, {
            author: 'Edsger W. Dijkstra',
            blogs: 1
        })
    })

})

describe('mostBlogs with multiple blogs', () => {
    const listWithTwoBlog = [
        {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0
        },
        {
            _id: "5a422ba71b54a676234d17fb",
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
            likes: 0,
            __v: 0
        },
        {
            _id: "5a422bc61b54a676234d17fc",
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2,
            __v: 0
        },
        {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
            __v: 0
        },
        {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
        },
        {
            _id: "5a422b891b54a676234d17fa",
            title: "First class tests",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
            likes: 10,
            __v: 0
        }
    ]

    test('when list has multiple blogs with different authors, it should the author with the most blogs', () => {
        const result = listHelper.mostBlogs(listWithTwoBlog)
        assert.deepStrictEqual(result, {
            author: 'Robert C. Martin',
            blogs: 3
        })
    })

})