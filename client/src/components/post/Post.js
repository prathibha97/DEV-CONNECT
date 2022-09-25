import PropTypes from "prop-types";
import React, { Fragment, useEffect } from "react";
import Spinner from "../layouts/Spinner";
import CommentForm from "../posts/CommentForm";
import CommentItem from "../posts/CommentItem";
import { connect } from "react-redux";
import { getPost } from "../../actions/post";
import { Link, useParams } from "react-router-dom";
import PostItem from "../posts/PostItem";

export const Post = ({ getPost, post: { post, loading } }) => {
  const { id } = useParams();

  useEffect(() => {
    getPost(id);
  }, [getPost, id]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container">
        <Link to="/posts"> Back To Posts</Link>
        <PostItem post={post} showActions={false} />
        <CommentForm postId={post._id} />
        <div className="comments">
          {post.comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} postId={post._id} />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
