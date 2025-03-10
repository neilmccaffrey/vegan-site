import { useParams } from 'react-router-dom';
import PostList from '../components/PostList';

const ForumPage = () => {
  const { topic } = useParams();

  return (
    <div className="mt-20">
      <h1>{topic.charAt(0).toUpperCase() + topic.slice(1)} Forum</h1>
      <PostList topic={topic} />
    </div>
  );
};

export default ForumPage;
