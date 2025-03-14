import { faComment, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import CommentList from './CommentList';

const PostList = ({ posts, onLike }) => {
  const [showComments, setShowComments] = useState({});
  const { user } = useContext(UserContext);

  const toggleComments = (postId) => {
    setShowComments((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId], // Toggle the visibility of comments for the clicked post
    }));
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
              <p>{post.username}:</p>
              <p className="px-2">{post.post}</p>
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
};

export default PostList;
