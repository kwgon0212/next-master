'use client';

import { useEffect, useState } from 'react';

const Comment = (props) => {
  let [comment, setComment] = useState('');
  let [content, setContent] = useState(null);
  let [sendComment, setSendComment] = useState(false);

  useEffect(() => {
    fetch(`/api/comment/${props.postId}`)
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        setContent(result);
      });
  }, [sendComment]);

  //   console.log(content);

  const commentSubmit = (e) => {
    let data = {
      comment: comment,
      postId: props.postId,
    };
    fetch('/api/comment/new', {
      method: 'POST',
      body: JSON.stringify(data),
    }).then((result) => {
      if (result.status == 200) {
        setSendComment(!sendComment);
        document.querySelector('.comment-input').value = '';
      }
    });
  };

  return (
    <div>
      <span>댓글 목록</span>
      {content?.length != 0 ? (
        content?.map((element, idx) => {
          return (
            <div
              style={{
                margin: '10px',
                padding: '10px',
                border: '1px solid black',
              }}
              key={idx}
            >
              <span>{element.author}님</span>
              <br />
              <span>{element.comment}</span>
            </div>
          );
        })
      ) : (
        <div>아직 댓글이 없습니다.</div>
      )}
      <input
        onChange={(e) => {
          setComment(e.target.value);
        }}
        className='comment-input'
      />
      <button onClick={commentSubmit}>댓글 전송</button>
    </div>
  );
};

export default Comment;
