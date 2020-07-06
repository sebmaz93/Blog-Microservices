import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCreate from 'components/CommentCreate';
import CommentList from 'components/CommentList';

export default () => {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    return await axios.get('http://localhost:4002/posts');
  };

  useEffect(() => {
    fetchPosts().then((res) => setPosts(res.data));
  }, []);

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {Object.values(posts).map((post) => (
        <div
          key={post.id}
          className="card"
          style={{ width: '30%', marginBottom: '20px' }}
        >
          <div className="card-body">
            <h3>{post.title}</h3>
            <CommentList comments={post.comments} />
            <CommentCreate postId={post.id} />
          </div>
        </div>
      ))}
    </div>
  );
};
