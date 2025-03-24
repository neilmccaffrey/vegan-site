import { useEffect, useState } from 'react';
import { getAllThingsVegan } from '../api/allthingsvegan';

const AllThingsVegan = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const fetchedItems = await getAllThingsVegan();
        setItems(fetchedItems);
      } catch (error) {
        console.error('Failed to fetch items:', error);
      }
    };
    fetchItems();
  }, []);

  return (
    <div className="flex mx-auto items-center justify-center">
      <div className="flex flex-col mt-20 md:ml-5 w-screen md:max-w-125">
        <div className="self-center">
          <span>Vegan Resources</span>
        </div>
        <ul>
          {items.map((item) => (
            <li
              key={item.id}
              className="mt-10 bg-gray-100 modal p-2 border rounded"
            >
              <span className="text-xl font-bold">{item.category}</span>
              <ul>
                {item.items.map((subItem, index) => (
                  <li key={index} className="mb-2 border-b last:border-none">
                    <div className="flex justify-between items-center p-2">
                      <div className="flex-1 ">
                        <span className="block">{subItem.name}</span>
                        <p className="text-xs">{subItem.description}</p>
                      </div>
                      <button className="primary rounded-4xl p-1 text-xs flex-shrink-0">
                        <a
                          href={subItem.website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Visit Site
                        </a>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <ul className="mt-10 mb-5 bg-gray-100 modal p-6 border rounded list-disc">
          <div className="flex flex-col">
            <span className="text-xl font-bold">Accidentally Vegan</span>
            <span className="text-xs mb-5">
              A list of items that were not intentionally made to be vegan, but
              are a nice surprise.
            </span>
          </div>
          <li>Oreos</li>
          <li>Doritos - spicy sweet chili</li>
          <li>Wheat Thins</li>
          <li>Pringles - original</li>
          <li>{`Hershey's Syrup`}</li>
          <li>Skinny Pop Popcorn - white cheddar</li>
          <li>Fritos</li>
          <li>Cracker Jack</li>
          <li>Ritz Crackers</li>
          <li>{`Snyder's of Hanover Pretzel Pieces - jalapeño, hot buffalo wing`}</li>
          <li>Sour Patch Kids</li>
          <li>Skittles</li>
        </ul>
      </div>
    </div>
  );
};

export default AllThingsVegan;
