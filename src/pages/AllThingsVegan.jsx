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
    <div className="mt-20 md:ml-5 max-w-125">
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
    </div>
  );
};

export default AllThingsVegan;
