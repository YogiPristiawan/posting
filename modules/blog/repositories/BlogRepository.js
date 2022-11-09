const mongo = require('../../shared/databases/MongoDB')
const BlogModel = require('../../shared/databases/Schemas/Blogs')

const createBlog = async (data) => {
  await mongo.connect()

  const blog = new BlogModel({
    user_id: data.user_id,
    title: data.title,
    body: data.body,
  })

  const savedBlog = await blog.save()
  return savedBlog
}

const findByUserId = async () => {
  await mongo.connect()
  const lookup = {
    $lookup: {
      from: 'users',
      localField: 'user_id',
      foreignField: '_id',
      as: 'user',
    },
  }
  const project = {
    $project: {
      _id: 0,
      id: '$_id',
      title: '$title',
      body: '$body',
      user: {
        $map: {
          input: '$user',
          as: 'u',
          in: {
            id: '$$u._id',
            username: '$$u.username',
          },
        },
      },
    },
  }
  const blogs = await BlogModel.aggregate([lookup, project,
    {
      $unwind: '$user',
    },
  ])
  return blogs
}

module.exports = {
  createBlog, findByUserId,
}
