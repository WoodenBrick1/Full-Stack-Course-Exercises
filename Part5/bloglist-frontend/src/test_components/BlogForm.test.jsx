import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from '../components/BlogForm'

describe('<BlogForm />', () => {

    test('can send a blog', async () => {
        const addBlog = vi.fn()
        const user = userEvent.setup()

        render(<BlogForm addBlog={addBlog} />)

        const titleInput = screen.getByPlaceholderText('here is my title')
        const authorInput = screen.getByPlaceholderText('Fake Name')
        const urlInput = screen.getByPlaceholderText('fakeurl.com')
        const sendButton = screen.getByText('Create')

        await user.type(titleInput, 'Title!')
        await user.type(authorInput, 'Mae Ivery')
        await user.type(urlInput, 'idk.com')

        await user.click(sendButton)

        const sentData = addBlog.mock.calls[0][0]
        expect(addBlog.mock.calls).toHaveLength(1)
        expect(sentData.title).toBe('Title!')
        expect(sentData.author).toBe('Mae Ivery')
        expect(sentData.url).toBe('idk.com')
    })
})