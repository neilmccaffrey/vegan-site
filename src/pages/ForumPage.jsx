import { useParams } from 'react-router-dom';
import PostList from '../components/PostList';

const ForumPage = () => {
  const { topic } = useParams();

  return (
    <div className="flex  flex-col mt-20 items-center">
      <h1>{topic.charAt(0).toUpperCase() + topic.slice(1)} Forum</h1>
      <PostList topic={topic} />
    </div>
  );
};

export default ForumPage;
