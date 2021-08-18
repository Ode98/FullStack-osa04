const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', async (request, response) => {

  const body = request.body
  const user = await User.findById(body.userId)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  try {
    const savedBlog = await blog.save()
    await user.save()
    response.json(savedBlog.toJSON())
  } catch {
    console.log(error)
    response.status(400).json({error: error.message})
  }
})

blogsRouter.delete('/:id', async (request, response) => {

  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()

  } catch {
    console.log(error)
    response.status(204).json({error: error.message})
  }

})

blogsRouter.put('/:id', async (request, response) => {

  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes
  }

  try {
    await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    response.status(200).end()

  } catch {
    console.log(error)
    response.status(404).json({error: error.message})
  }
})

module.exports = blogsRouter
