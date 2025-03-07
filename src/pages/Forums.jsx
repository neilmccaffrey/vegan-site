import { useEffect, useState } from 'react';
import { getVeganForums } from '../api/forums';

const Forums = () => {
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const data = await getVeganForums(); // Fetch the collection details
        setTopics(data); // Set the response data (name and post count)
      } catch (error) {
        setError('Failed to fetch forums');
        console.log(error);
      }
    };

    fetchTopics();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="mt-20">
      <h1 className="mt-20">Forums</h1>
      <ul>
        {topics.map((topic, index) => (
          <li key={index}>
            {topic.name} - {topic.postCount} posts
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Forums;
