const { model, Schema } = require("mongoose");

const AuthorSchema = new Schema({
  username: { type: String, require: true },
  posts: [{ type: Schema.Types.ObjectId, ref: "post" }],
});

module.exports = model("Author", AuthorSchema);
