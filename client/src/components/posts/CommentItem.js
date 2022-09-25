import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import formatDate from "../../utils/formatDate";
import { deleteComment } from "../../actions/post";

export const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment,
}) => {
  return (
    <div class="comments">
      <div class="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${user}`}>
            <img class="round-img" src={avatar} alt="" />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p class="my-1">{text}</p>
          <p class="post-date">Posted on {formatDate(date)}</p>
          {!auth.loading && user === auth.user._id && (
            <button
              className="btn btn-danger"
              type="button"
              onClick={(e) => {
                deleteComment(postId, _id);
              }}
            >
                <i className="fas fa-times"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  postId: PropTypes.number.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
