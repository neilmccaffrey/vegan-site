import { useEffect, useState } from 'react';
import { fetchPosts } from '../api/forums';
import PropTypes from 'prop-types';

const PostList = ({ topic }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const data = await fetchPosts(topic);
      setPosts(data);
    };
    getPosts();
  }, [topic]);

  return (
    <ul>
      {posts
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // sort descending based on createdAt
        .map((post) => (
          <li key={post._id}>
            <div className="flex flex-col border rounded shadow-lg bg-gray-50 w-screen md:w-200 text-black min-h-25 mb-2">
              <p className="px-2">{post.username}:</p>
              <p className="px-2">{post.post}</p>
              <div className="mt-auto border-t border-gray-300">
                <span>test</span>
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
};

PostList.propTypes = {
  topic: PropTypes.string.isRequired,
};

export default PostList;
