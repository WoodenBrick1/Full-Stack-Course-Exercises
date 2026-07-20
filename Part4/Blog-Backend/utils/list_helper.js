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

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}