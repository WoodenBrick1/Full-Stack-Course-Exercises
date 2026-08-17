

const BlogForm = ({ addBlog }) => {


    return (
        <div>
            <h2>Create New</h2>
            <form onSubmit={addBlog}>
                <label>
                    Title:
                    <input name="title"></input>
                </label>
                <br />
                <label>
                    Author:
                    <input name="author"></input>
                </label>
                <br />
                <label>
                    Url:
                    <input name="url"></input>
                </label>
                <br />

                <button>Create</button>
            </form>
        </div>

    )
}

export default BlogForm