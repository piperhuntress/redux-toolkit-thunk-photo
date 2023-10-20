import mongoose from "mongoose";

const BlogSchema = mongoose.Schema({
  msg: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const BlogModel = mongoose.model("blogposts", BlogSchema);

export default BlogModel;
