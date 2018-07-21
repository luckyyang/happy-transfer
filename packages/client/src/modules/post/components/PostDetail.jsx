import React from 'react';
import PropTypes from 'prop-types';

const PostDetail = ({ post }) => {
  return (
    <div>
      <p>汇款接收人</p>
      <p>{post.title}</p>
      <p>汇款数量</p>
      <p>{post.content}</p>
    </div>
  );
};

PostDetail.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  values: PropTypes.object,
  post: PropTypes.object
};

export default PostDetail;
