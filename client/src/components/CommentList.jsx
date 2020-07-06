import React from 'react';

export default ({ comments }) => {
  return comments.map((comment) => {
    let content;
    if (comment.status === 'pending') {
      content = 'Moderation Pending...';
    }
    if (comment.status === 'approved') {
      content = comment.content;
    }
    if (comment.status === 'rejected') {
      content = 'Comment Rejected';
    }
    return <li key={comment.id}>{content}</li>;
  });
};
