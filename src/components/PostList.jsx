import { faComment, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const PostList = ({ posts, onLike }) => {
  const { user } = useContext(UserContext);
  return (
    <ul>
      {posts
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // sort descending based on createdAt
        .map((post) => (
          <li key={post._id}>
            <div className="flex flex-col border rounded shadow-lg bg-gray-50 w-screen md:w-200 text-black min-h-25 mb-2">
              <p className="px-2">{post.username}:</p>
              <p className="px-2">{post.post}</p>
              <div className="flex mt-auto border-t border-gray-300 justify-end gap-x-5">
                <button
                  onClick={() => onLike(post._id)}
                  className="cursor-pointer"
                >
                  {post.likedBy.includes(user.sub) ? (
                    <FontAwesomeIcon
                      icon={solidHeart}
                      className="text-red-500"
                    />
                  ) : (
                    <FontAwesomeIcon icon={faHeart} />
                  )}
                  <span className="ml-1 text-xs">Like</span>
                </button>
                <button className="cursor-pointer">
                  <FontAwesomeIcon icon={faComment} />
                  <span className="ml-1 mr-5 text-xs">Comment</span>
                </button>
              </div>
            </div>
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
