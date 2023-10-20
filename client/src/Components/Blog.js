import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { blogPost, deletePost, getPosts } from "../features/blogSlice"; // Assuming "blogPost" is an action creator
import { Navigate, useNavigate } from "react-router-dom";

export const Blog = () => {
  const [msg, setMsg] = useState(""); // Changed to "setMsg" for consistency
  const user = useSelector((state) => state.user.user);
  const posts = useSelector((state) => state.blog.blog) || [];

  console.log(posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBlogPost = () => {
    const blogData = {
      msg,
      email: user.email,
    };
    if (blogData.msg && blogData.email) {
      dispatch(blogPost(blogData)); // Assuming this dispatch action submits the blog post
      setMsg(""); // Clear the textarea after submitting
    }
  };

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      navigate("/login");
    } else {
      console.log("not empty");
      dispatch(getPosts());
    }
  }, []); // Empty dependency array means this effect runs once on component mount

  const handledelete = (postid) => {
    console.log(postid);
    dispatch(deletePost(postid));
    navigate("/blog");
  };

  return (
    <>
      <div className="addpost">
        <p>Add Post</p>
        <section className="form">
          <div className="form-group">
            <textarea
              className="form-control"
              id="blogpost"
              placeholder="Share your thoughts..."
              value={msg} // Use "value" to make the textarea a controlled component
              onChange={(e) => {
                setMsg(e.target.value); // Use "setMsg" to update "msg" state
              }}
            />
          </div>

          <button
            type="button" // Added type "button" to prevent form submission
            className="btn btn-button"
            onClick={handleBlogPost}
          >
            Submit
          </button>
        </section>
      </div>
      <div>
        {posts.map((post) => (
          <div key={post._id} className="listPosts">
            {post.msg} posted by<br></br>: {post.email}
            {post.email === user.email ? (
              <div>
                <button onClick={() => handledelete(post._id)}>Delete</button> |
                Update
              </div>
            ) : (
              <div></div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};
