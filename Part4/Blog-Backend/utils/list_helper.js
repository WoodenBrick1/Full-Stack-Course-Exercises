const lodash = require('lodash')
const logger = require('./logger')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let totalLikes = 0

    for (let blog of blogs) {
        totalLikes += blog.likes
    }

    return totalLikes
}

const favouriteBlog = (blogs) => {

    if (blogs.length === 0) {
        return null
    }

    let highestLikesBlog = blogs[0]

    for (let blog of blogs) {
        if (blog.likes > highestLikesBlog.likes) {
            highestLikesBlog = blog
        }
    }

    return highestLikesBlog
}


const mostBlogs = (blogs) => {

    if (blogs.length === 0) {
        return null
    }

    const mostBlogsObject = {
        author: '',
        blogs: 0
    }

    const authors = lodash.groupBy(blogs, 'author')


    for (let author in authors) {
        const numOfBlogs = authors[author].length

        if (numOfBlogs > mostBlogsObject.blogs) {
            mostBlogsObject.author = author
            mostBlogsObject.blogs = numOfBlogs
        }
    }

    return mostBlogsObject
}

const mostLikes = (blogs) => {

    if (blogs.length === 0) {
        return null
    }

    const mostLikesObject = {
        author: '',
        likes: 0
    }

    const authors = lodash.groupBy(blogs, 'author')


    for (let author in authors) {
        const numOfLikes = authors[author].reduce((total, data) => data.likes + total, 0)

        if (numOfLikes >= mostLikesObject.likes) {
            mostLikesObject.author = author
            mostLikesObject.likes = numOfLikes
        }

    }

    return mostLikesObject
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}