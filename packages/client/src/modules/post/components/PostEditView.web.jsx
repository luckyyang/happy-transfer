import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

import { PageLayout } from '../../common/components/web';
import PostDetail from './PostDetail';
import PostForm from './PostForm';
import PostComments from '../containers/PostComments';
import settings from '../../../../../../settings';

const onSubmit = (post, addPost, editPost) => values => {
  if (post) {
    editPost(post.id, values.title, values.content);
  } else {
    addPost(values.title, values.content);
  }
};

const PostEditView = ({ loading, post, match, location, subscribeToMore, addPost, editPost }) => {
  let postObj = post;
  // if new post was just added read it from router
  if (!postObj && location.state) {
    postObj = location.state.post;
  }

  const renderMetaData = () => (
    <Helmet
      title={`${settings.app.name} - 显示汇款信息`}
      meta={[
        {
          name: '接收人',
          content: '显示汇款信息'
        }
      ]}
    />
  );

  if (loading && !postObj) {
    return (
      <PageLayout>
        {renderMetaData()}
        <div className="text-center">Loading...</div>
      </PageLayout>
    );
  } else {
    return (
      <PageLayout>
        {renderMetaData()}
        <Link id="back-button" to="/">
          Back
        </Link>
        <h2>{post ? '显示' : '发送'}汇款</h2>
        {post ? (
          <PostDetail onSubmit={onSubmit(postObj, addPost, editPost)} post={post} />
        ) : (
          <PostForm onSubmit={onSubmit(postObj, addPost, editPost)} post={post} />
        )}
        <br />
        {null && (
          <PostComments
            postId={Number(match.params.id)}
            comments={postObj.comments}
            subscribeToMore={subscribeToMore}
          />
        )}
      </PageLayout>
    );
  }
};

PostEditView.propTypes = {
  loading: PropTypes.bool.isRequired,
  post: PropTypes.object,
  addPost: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  subscribeToMore: PropTypes.func.isRequired
};

export default PostEditView;
