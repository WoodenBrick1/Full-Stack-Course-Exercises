

const loginWith = async (page, username, password) => {
    await page.getByLabel('username').fill(username)
    await page.getByLabel('password').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
    await page.getByRole('button', { name: 'create new blog' }).click()
    await page.getByPlaceholder('here is my title').fill(title)
    await page.getByPlaceholder('Fake Name').fill(author)
    await page.getByPlaceholder('fakeurl.com').fill(url)
    await page.getByRole('button', { name: 'Create' }).click()
    await page.getByText(title).last().waitFor()
}

export { loginWith, createBlog }