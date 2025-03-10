import { useParams } from 'react-router-dom';

const ForumPage = () => {
  const { topic } = useParams();

  return (
    <div className="mt-20">
      <h1>{topic.charAt(0).toUpperCase() + topic.slice(1)} Forum</h1>
    </div>
  );
};

export default ForumPage;
