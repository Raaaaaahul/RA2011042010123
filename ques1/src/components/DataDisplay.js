import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DataDisplay({ selectedCheckboxes }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (selectedCheckboxes && selectedCheckboxes.length > 0) {
      const fetchData = async () => {
        const promises = selectedCheckboxes.map(async (url) => {
          try {
            const response = await axios.get(url);
            return response.data;
          } catch (error) {
            console.error('Error fetching data from', url, error);
            return null;
          }
        });

        const fetchedData = await Promise.all(promises);
        setData(fetchedData.filter(item => item !== null));
      };

      fetchData();
    } else {
      setData([]);
    }
  }, [selectedCheckboxes]);

  return (
    <div>
      <h2>Selected Data:</h2>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default DataDisplay;
