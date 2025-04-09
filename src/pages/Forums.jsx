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

  const topicDescriptions = {
    general: 'For random discussions, news, or thoughts.',
    questions:
      'For newcomers or anyone with vegan-related questions, from nutrition to lifestyle.',
    'fitness & vegan gains': 'Plant-based fitness, workouts, muscle-building.',
    'vegan wins': 'Share positive experiences, small victories, or progress.',
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <title>Friendly Vegan | Vegan forums</title>
      <meta name="description" content="Chat with fellow vegans." />
      <meta
        name="keywords"
        content="vegan, plant-based, restaurants, food, healthy eating, chat"
      />
      {/* <link rel="canonical" href="https://yourdomain.com/forums" /> */}

      <h1 className="flex mt-20 justify-center font-semibold text-2xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-lime-400 text-transparent bg-clip-text">
        Forums
      </h1>

      <div className="flex flex-col mt-5 items-center border border-gray-200 rounded shadow-lg max-w-150 mx-auto justify-center modal">
        <div className="flex w-full border-b border-gray-200 justify-between">
          <span className="flex-1 py-2 ml-5">Topics</span>
          <span className="border-l border-gray-300 px-2 py-2 flex w-16">
            Posts
          </span>
        </div>
        <ul className="w-full">
          {topics.map((topic, index) => (
            <li
              key={index}
              className="flex w-full border-b border-gray-200 last:border-b-0"
            >
              <div className="flex-1 flex-col p-3">
                <Link
                  to={`/forums/${topic.name.toLowerCase()}`}
                  className="flex-1 py-2 underline text-blue-300 text-lg"
                >
                  {topic.name.charAt(0).toUpperCase() + topic.name.slice(1)}
                </Link>
                <p className="text-xs">
                  {topicDescriptions[topic.name.toLowerCase()]}
                </p>
              </div>
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
