import { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { addComment } from '../api/forums';

const CommentList = ({ comments, postId }) => {
  const textAreaRef = useRef(null);
  const [newComment, setNewComment] = useState('');
  const [allComments, setAllComments] = useState(comments);
  const { topic } = useParams();
  const { user, isAuthenticated } = useContext(UserContext);

  // focus cursor in textarea when user clicks comment
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, []);

  const handleInput = () => {
    if (textAreaRef.current) {
      if (textAreaRef.current) {
        textAreaRef.current.style.height = 'auto';
        textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
      }
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    const resComment = await addComment(
      topic,
      user.username,
      user.sub,
      postId,
      newComment
    );

    setAllComments((prevComments) => [...prevComments, resComment]);
    setNewComment('');
  };

  return (
    <>
      <div className="relative">
        <textarea
          disabled={!isAuthenticated}
          ref={textAreaRef}
          value={newComment}
          rows={1}
          onChange={(e) => {
            setNewComment(e.target.value);
            handleInput();
          }}
          placeholder={
            isAuthenticated
              ? 'Add comment...'
              : 'You must log in to add comments'
          }
          className={`bg-gray-50 md:w-200 text-black border-l border-r border-gray-300 border-b rounded p-2 pb-10 outline-none block h-auto w-full min-h-25 resize-none overflow-hidden focus:ring-0 ${allComments.length === 0 && 'mb-4 shadow-lg'}`}
        />
        {newComment && (
          <button
            onClick={handleAddComment}
            className="absolute bottom-2 right-2 primary text-white px-1 md:px-3 py-1 rounded-full cursor-pointer"
          >
            Comment
          </button>
        )}
      </div>
      <ul key={allComments.length}>
        {allComments.map((comment) => {
          return (
            <li key={comment._id} className="group">
              <div
                className={`flex flex-col px-2 border-l border-r border-b border-gray-300 rounded bg-gray-50 w-screen md:w-200 text-black min-h-25 group-last:mb-4 last:shadow-lg`}
              >
                <p>{comment.username}:</p>
                <p className="px-2">{comment.comment}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

CommentList.propTypes = {
  comments: PropTypes.array.isRequired,
  postId: PropTypes.string.isRequired,
};

export default CommentList;
