const Author = require("../../models/Author");

exports.authorsGet = async (req, res, next) => {
  try {
    const authors = await Author.find().populate("posts");
    return res.status(200).json(authors);
  } catch (error) {
    next(error);
  }
};
exports.authorCreate = async (req, res) => {
  try {
    const newAuthor = await Author.create(req.body);
    res.status(201).json(newAuthor);
  } catch (error) {
    next(error);
  }
};
