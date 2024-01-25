const { model, Schema } = require("mongoose");

const PostSchema = new Schema({
  title: { type: String, required: true },
  body: { type: Schema.Types.ObjectId, ref: "Author" },
});

module.exports = model("Post", PostSchema);
