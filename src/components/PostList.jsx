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
      {posts.map((post) => (
        <li key={post._id}>
          <p>{post.posts}</p>
        </li>
      ))}
    </ul>
  );
};

PostList.propTypes = {
  topic: PropTypes.string.isRequired,
};

export default PostList;
