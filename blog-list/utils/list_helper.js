const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((a, b) => (a.likes > b.likes ? a : b), {})
}

const mostBlogs = (blogs) => {
  const authorsBlogs = {}
  blogs.forEach((blog) => {
    if (authorsBlogs[blog.author]) {
      authorsBlogs[blog.author] += 1
    } else {
      authorsBlogs[blog.author] = 1
    }
  })

  const authorWithMostBlogs = Object.keys(authorsBlogs).reduce((a, b) =>
    authorsBlogs[a] > authorsBlogs[b] ? a : b
  )

  return {
    author: authorWithMostBlogs,
    blogs: authorsBlogs[authorWithMostBlogs],
  }
}

const mostLikes = (blogs) => {
  const authorsLikes = {}
  blogs.forEach((blog) => {
    if (authorsLikes[blog.author]) {
      authorsLikes[blog.author] += blog.likes
    } else {
      authorsLikes[blog.author] = blog.likes
    }
  })

  const authorWithMostLikes = Object.keys(authorsLikes).reduce((a, b) =>
    authorsLikes[a] > authorsLikes[b] ? a : b
  )

  return {
    author: authorWithMostLikes,
    likes: authorsLikes[authorWithMostLikes],
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
