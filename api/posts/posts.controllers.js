const Post = require("../../models/Post");
const Author = require("../../models/Author");
exports.fetchPost = async (postId, next) => {
  try {
    const post = await Post.findById(postId);
    return post;
  } catch (error) {
    next(error);
  }
};

exports.postsCreate = async (req, res, next) => {
  try {
    const { postId } = req.pramas;
    const author = await Author.findById(postId);
    if (!author) {
      return res.status(404).json({ message: "user not found" });
    }
    req.body.user = postId;
    const newPost = await Post.create(req.body);
    await author.updateOne({ $push: { posts: newPost.postId } });
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};

exports.postsDelete = async (req, res) => {
  try {
    await Post.findByIdAndRemove({ _id: req.post.id });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.postsUpdate = async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.post.id, req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.postsGet = async (req, res, next) => {
  try {
    const posts = await Post.find();
    return res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

exports.createTag = async (req, res, next) => {
  try {
    const tag = await Tag.create(req.body);
    return res.status(201).json(tag);
  } catch (error) {
    next(error);
  }
};

exports.addTagToPoast = async (req, res, next) => {
  try {
    const { tagId, postId } = req.pramas;
    const post = await Post.findById(postId);
    const tag = await Tag.findById(tagId);
    if (!post || !tag)
      return res.status(404).json({ message: "post or tag not found" });
    await Post.updateOne({ $push: { posts: post._id } });
    await Tag.updateOne({ $push: { tags: tag._id } });
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};
