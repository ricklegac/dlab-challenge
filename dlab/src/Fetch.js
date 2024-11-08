import React, { useEffect, useState } from 'react';

const FetchData = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('https://api.schneck.dlab.software/api/other_endpoint/', {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setData(data); // Guarda los datos en el estado
        } else {
          setError('Failed to fetch data');
        }
      } catch (error) {
        setError('An error occurred while fetching data.');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data ? <div>{JSON.stringify(data)}</div> : <p>Loading...</p>}
    </div>
  );
};

export default FetchData;
