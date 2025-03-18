import { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { addComment } from '../api/forums';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

const CommentList = ({ comments, postId, onCommentAdded, onCommentDelete }) => {
  const textAreaRef = useRef(null);
  const [newComment, setNewComment] = useState('');
  const { topic } = useParams();
  const { user, isAuthenticated } = useContext(UserContext);
  const [showMenu, setShowMenu] = useState({});
  const menuRefs = useRef({}); // Store refs dynamically
  const setMenuRef = (postId, node) => {
    if (node) menuRefs.current[postId] = node;
  };

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

    onCommentAdded(postId, resComment); // Update parent state
    setNewComment('');
  };

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        Object.values(menuRefs.current).some((ref) => ref?.contains(e.target))
      ) {
        return; // Don't close if clicking inside any menu
      }
      setShowMenu({});
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = (postId) => {
    setShowMenu((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
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
          className={`bg-gray-50 md:w-200 text-black border-l border-r border-gray-300 border-b rounded p-2 pb-10 outline-none block h-auto w-full min-h-25 resize-none overflow-hidden focus:ring-0 ${comments.length === 0 && 'mb-4 shadow-lg'}`}
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
      <ul key={comments.length}>
        {comments.map((comment) => {
          return (
            <li key={comment._id} className="group">
              <div
                className={`flex flex-col px-2 border-l border-r border-b border-gray-300 rounded bg-gray-50 w-screen md:w-200 text-black min-h-25 group-last:mb-4 last:shadow-lg`}
              >
                <div className="flex items-center justify-between mr-2 mt-1">
                  <p>{comment.username}:</p>
                  {user.sub === comment.sub && (
                    <div
                      className="relative"
                      ref={(node) => setMenuRef(comment._id, node)}
                    >
                      <button
                        onClick={() => toggleMenu(comment._id)}
                        className="cursor-pointer"
                      >
                        <FontAwesomeIcon
                          icon={faEllipsis}
                          className="text-gray-400"
                        />
                      </button>
                      {showMenu[comment._id] && (
                        <div className="absolute right-0 mt-2 shadow-lg bg-gray-200 rounded p-2 z-50">
                          <button
                            onClick={() => {
                              onCommentDelete(postId, comment._id);
                              setShowMenu({});
                            }}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100 whitespace-nowrap cursor-pointer"
                          >
                            <FontAwesomeIcon
                              icon={faTrashCan}
                              className="text-red-500"
                            />{' '}
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
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
  onCommentAdded: PropTypes.func.isRequired,
  onCommentDelete: PropTypes.func.isRequired,
};

export default CommentList;
