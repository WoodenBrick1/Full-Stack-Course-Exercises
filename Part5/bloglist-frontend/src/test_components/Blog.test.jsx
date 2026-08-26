import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'


describe('<Blog />', () => {
    test('renders necessary content', () => {

        const blog = {
            title: "Test Username",
            author: "Test Author",
            likes: 12,
            url: "testUrl",
            user: { username: "username" }
        }

        render(<Blog blog={blog} />)

        const title = screen.getByText('Test Username')
        const author = screen.getByText('Test Author')
        const url = screen.queryByText('Url: testUrl')
        const likes = screen.queryByText('Likes: 12')


        expect(title).toBeDefined()
        expect(author).toBeDefined()
        expect(url).toBeNull()
        expect(likes).toBeNull()
    })

    test('url and likes are shown when the show button is clicked', async () => {

        const blog = {
            title: "Test Username",
            author: "Test Author",
            likes: 12,
            url: "testUrl",
            user: { username: "username" }
        }

        render(<Blog blog={blog} />)


        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)

        const url = screen.getByText('Url: testUrl')
        const likes = screen.getByText('Likes: 12')

        expect(url).toBeDefined()
        expect(likes).toBeDefined()

    })

    test('the like button can be clicked twice', async () => {

        const likeBlog = vi.fn()
        const user = userEvent.setup()

        const blog = {
            title: "Test Username",
            author: "Test Author",
            likes: 12,
            url: "testUrl",
            user: { username: "username" }
        }

        render(<Blog blog={blog} increaseLikes={likeBlog} />)

        const viewButton = screen.getByText('view')
        await user.click(viewButton)

        const likeButton = screen.getByText('Like')
        await user.click(likeButton)
        await user.click(likeButton)

        expect(likeBlog.mock.calls).toHaveLength(2)
    })


})