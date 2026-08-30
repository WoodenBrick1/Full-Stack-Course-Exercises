const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: {
                name: 'End Testing',
                username: 'EndTesting',
                password: 'test123'
            }
        })

        await request.post('/api/users', {
            data: {
                name: 'End Testing2',
                username: 'EndTesting2',
                password: 'test111'
            }
        })


        await page.goto('/')
    })

    test('Login form is shown', async ({ page }) => {
        const loginLocator = page.getByText('Log In')

        await expect(loginLocator).toBeVisible()
    })

    test('user can log in and then front page is displayed', async ({ page }) => {
        await loginWith(page, 'EndTesting', 'test123')

        await expect(page.getByText('blogs')).toBeVisible()
    })

    test('user can\'t login with the wrong credentials', async ({ page }) => {
        await loginWith(page, 'EndTesting', 'test121')

        const errorDiv = page.locator('.error')
        await expect(errorDiv).toContainText('Invalid Password or username')
        await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
        await expect(page.getByText('blogs')).not.toBeVisible()
    })


    describe('when a user is logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'EndTesting', 'test123')
        })

        test('user can add a blog', async ({ page }) => {
            await createBlog(page, 'Test Blog', 'Playwright', 'testurl.com')

            await expect(page.getByText('Test Blog').last()).toBeVisible()
        })

        describe('When user inserts blogs', () => {
            beforeEach(async ({ page }) => {
                await createBlog(page, 'first blog', 'Playwright!', 'firstblog.com')
                await createBlog(page, 'second blog', 'Playwright.', 'secondblog.com')
                await createBlog(page, 'third blog', 'Playwright?', 'thirdblog.com')
            })

            test('a blog can be viewed', async ({ page }) => {
                await page.getByRole('button', { name: 'view' }).first().click()
                await expect(page.getByText('firstblog.com')).toBeVisible()
            })

            test('a blog can be liked', async ({ page }) => {
                await page.getByRole('button', { name: 'view' }).first().click()
                await page.getByRole('button', { name: 'like' }).click()

                await expect(page.getByText('Likes: 1')).toBeVisible()
            })

            test('a blog can be deleted after it\'s created', async ({ page }) => {
                page.on('dialog', dialog => dialog.accept())
                await page.getByRole('button', { name: 'remove' }).first().click()

                await expect(page.getByText('first blog')).not.toBeVisible()
            })

            test('only a user who made the blogs can see the remove button', async ({ page }) => {
                await page.getByRole('button', { name: 'Logout' }).click()
                await loginWith(page, 'EndTesting2', 'test111')

                await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()

            })

            test('the blog with the most likes gets displayed first', async ({ page }) => {

                await page.getByRole('button', { name: 'view' }).last().click()
                await page.getByRole('button', { name: 'like' }).click()

                const allBlogs = await page.locator('.blog').all()
                await expect(allBlogs[0].getByText('third blog')).toBeVisible()
            })
        })

    })
})