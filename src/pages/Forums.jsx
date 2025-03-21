import { useEffect, useState } from 'react';
import { getVeganForums } from '../api/forums';
import { Link } from 'react-router-dom';

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
    <>
      <h1 className="flex mt-20 items-center justify-center">Forums</h1>
      <div className="flex flex-col mt-5 items-center border rounded shadow-lg max-w-150 mx-auto justify-center modal">
        <div className="flex w-full border-b justify-between">
          <span className="flex-1 py-2 ml-5">Topics</span>
          <span className="border-l border-gray-300 px-2 py-2 flex w-16">
            Posts
          </span>
        </div>
        <ul className="w-full">
          {topics.map((topic, index) => (
            <li key={index} className="flex w-full border-b last:border-b-0">
              <Link
                to={`/forums/${topic.name.toLowerCase()}`}
                className="flex-1 py-2 ml-5 underline text-blue-500"
              >
                {topic.name.charAt(0).toUpperCase() + topic.name.slice(1)}
              </Link>
              <span className="border-l border-gray-300 px-4 py-2 flex items-center w-16 text-center">
                {topic.postCount}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Forums;
