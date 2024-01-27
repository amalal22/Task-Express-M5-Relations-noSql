const { Schema, model } = require("mongoose");

const tagSchema = new Schema({
  name: String,
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
});
module.exports = module("Tag", tagSchema);
