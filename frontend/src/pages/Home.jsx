import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [canteens, setCanteens] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCanteens();
  }, []);

  const fetchCanteens = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/canteens');
      setCanteens(res.data);
    } catch (error) {
      console.error('Error fetching canteens:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">PES College Canteens</h1>
      <p className="text-gray-600 mb-8">Browse all canteens, check their menu, and order your favorite dishes!</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {canteens.map(canteen => (
          <div
            key={canteen._id}
            className="bg-white rounded-lg shadow-lg cursor-pointer transition hover:shadow-xl"
            onClick={() => navigate(`/canteen/${canteen._id}`)}
          >
            <img
              src={canteen.image}
              alt={canteen.name}
              className="w-full h-48 object-cover rounded-t-lg"
              onError={e => e.target.src='/images/default.jpg'}
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2 text-gray-800">{canteen.name}</h2>
              <p className="text-gray-600">{canteen.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
