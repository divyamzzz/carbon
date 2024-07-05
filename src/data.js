import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Data = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/data');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Data from PostgreSQL</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default Data;