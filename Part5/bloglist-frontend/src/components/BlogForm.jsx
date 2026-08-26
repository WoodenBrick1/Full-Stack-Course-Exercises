import { useState } from 'react'

const BlogForm = ({ addBlog }) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')


    const handleSubmit = (event) => {
        event.preventDefault()
        const blogObject = {
            title: title,
            author: author,
            url: url
        }

        addBlog(blogObject)
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h2>Create New</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input name="title" placeholder="here is my title" value={title} onChange={(event) => setTitle(event.target.value)}></input>
                </label>
                <br />
                <label>
                    Author:
                    <input name="author" placeholder="Fake Name" value={author} onChange={(event) => setAuthor(event.target.value)}></input>
                </label>
                <br />
                <label>
                    Url:
                    <input name="url" placeholder="fakeurl.com" value={url} onChange={(event) => setUrl(event.target.value)}></input>
                </label>
                <br />

                <button type='submit'>Create</button>
            </form>
        </div>

    )
}

export default BlogForm