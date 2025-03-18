import {
  faComment,
  faHeart,
  faPenToSquare,
} from '@fortawesome/free-regular-svg-icons';
import {
  faEllipsis,
  faTrashCan,
  faHeart as solidHeart,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../context/UserContext';
import CommentList from './CommentList';

const PostList = ({ posts, onLike, onEdit, onDelete }) => {
  const [showComments, setShowComments] = useState({});
  const { user } = useContext(UserContext);
  const [showMenu, setShowMenu] = useState({});
  const menuRefs = useRef({}); // Store refs dynamically
  const setMenuRef = (postId, node) => {
    if (node) menuRefs.current[postId] = node;
  };
  const textAreaRef = useRef(null);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedContent, setEditedContent] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto'; // Reset height
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; // Set height to fit content
    }
  }, [editingPostId]);

  const handleInput = () => {
    if (textAreaRef.current) {
      if (textAreaRef.current) {
        textAreaRef.current.style.height = 'auto';
        textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
      }
    }
  };

  //close textarea on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (textAreaRef.current && !textAreaRef.current.contains(e.target)) {
        setTimeout(() => {
          setEditingPostId(null);
          setIsDisabled(false);
        }, 1000); // Small delay for edit post button, close the text area when clicking outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  const toggleComments = (postId) => {
    setShowComments((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId], // Toggle the visibility of comments for the clicked post
    }));
  };

  const toggleMenu = (postId) => {
    setShowMenu((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

  const handleEditClick = (postId, postContent) => {
    setEditingPostId(postId);
    setEditedContent(postContent);
    setShowMenu({}); // Close all menus
  };

  return (
    <ul>
      {posts
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // sort descending based on createdAt
        .map((post) => (
          <li key={post._id}>
            <div
              className={`flex flex-col px-2 border border-gray-300 rounded shadow-lg bg-gray-50 w-screen md:w-200 text-black min-h-25 ${!showComments[post._id] && 'mb-4'}`}
            >
              <div className="flex items-center justify-between mr-2 mt-1">
                <p>{post.username}:</p>
                {user.sub === post.sub && (
                  <div
                    className="relative"
                    ref={(node) => setMenuRef(post._id, node)}
                  >
                    <button
                      onClick={() => toggleMenu(post._id)}
                      className="cursor-pointer"
                    >
                      <FontAwesomeIcon
                        icon={faEllipsis}
                        className="text-gray-400"
                      />
                    </button>
                    {showMenu[post._id] && (
                      <div className="absolute right-0 mt-2 shadow-lg bg-gray-200 rounded p-2 z-50">
                        <button
                          onClick={() => handleEditClick(post._id, post.post)}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100 whitespace-nowrap cursor-pointer"
                        >
                          <FontAwesomeIcon icon={faPenToSquare} /> Edit
                        </button>

                        <button
                          onClick={() => {
                            onDelete(post._id);
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
              {editingPostId === post._id ? (
                <div className="relative">
                  <textarea
                    value={editedContent}
                    onChange={(e) => {
                      setEditedContent(e.target.value);
                      handleInput();
                    }}
                    rows={1}
                    ref={textAreaRef}
                    className="border rounded p-2 pb-10 w-full"
                  />
                  <div className="absolute bottom-2 right-2 mb-1">
                    <button
                      onClick={() => setEditingPostId(null)}
                      className="bg-gray-400 text-white px-1 md:px-3 py-1 rounded-full cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      disabled={isDisabled}
                      onClick={() => {
                        if (!editedContent.trim()) {
                          alert('Post content cannot be empty.');
                          return;
                        }
                        onEdit(post._id, editedContent);
                        setIsDisabled(true);
                      }}
                      className={`primary text-white px-1 md:px-3 py-1 rounded-full cursor-pointer ml-1 ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      Edit Post
                    </button>
                  </div>
                </div>
              ) : (
                <p>{post.post}</p>
              )}
              <div className="flex mt-auto border-t border-gray-300 justify-end gap-x-5">
                <button
                  onClick={() => onLike(post._id)}
                  className="flex cursor-pointer gap-x-1 mt-auto p-1"
                >
                  <span className="ml-1 text-xs">{post.likedBy?.length}</span>
                  {post.likedBy?.includes(user.sub) ? (
                    <FontAwesomeIcon
                      icon={solidHeart}
                      className="text-red-500"
                    />
                  ) : (
                    <FontAwesomeIcon icon={faHeart} />
                  )}
                  <span className="text-xs">Like</span>
                </button>
                <button
                  onClick={() => toggleComments(post._id)} // Toggle comments for the clicked post
                  className="flex cursor-pointer gap-x-1 mt-auto p-1"
                >
                  <span className="ml-1 text-xs">{post.comments?.length}</span>
                  <FontAwesomeIcon icon={faComment} />
                  <span className="mr-5 text-xs">Comment</span>
                </button>
              </div>
            </div>
            {showComments[post._id] && (
              <CommentList comments={post.comments} postId={post._id} />
            )}
          </li>
        ))}
    </ul>
  );
};

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
  onLike: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PostList;
