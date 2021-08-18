const User = require('../models/user')
const Blog = require('../models/blog')

let initialValue = 0

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const totalLikes = (blogs) => {
  let sum = blogs.reduce(function (accumulator, currentValue) {
    return accumulator + currentValue.likes
  }, initialValue)
  return sum
}

const favoriteBlog = (blogs) => {
  likesArr = blogs.map(blog => blog.likes)
  mostLikes = Math.max(...likesArr)
  mostLikedBlog = blogs.find(blog => blog.likes === mostLikes)

  return(
    {
      title: mostLikedBlog.title,
      author: mostLikedBlog.author,
      likes: mostLikedBlog.likes
    }
  )
} 

const initialBlogs = 
[
  {
    title: 'blog1',
    author: 'author1',
    url: 'urlhere',
    likes: 8
  },
  {
    title: 'blog2',
    author: 'author2',
    url: 'urlhere',
    likes: 5
  }
]

module.exports = {
  totalLikes,
  favoriteBlog,
  blogsInDb,
  usersInDb,
  initialBlogs
}