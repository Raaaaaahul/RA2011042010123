import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CheckboxList() {
  const checkboxData = [
    { name: 'prime', url: 'http://20.244.56.144/numbers/primes' },
    { name: 'rand', url: 'http://20.244.56.144/numbers/rand' },
    { name: 'fib', url: 'http://20.244.56.144/numbers/fibo' },
    { name: 'odd', url: 'http://20.244.56.144/numbers/odd' },
  ];

  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
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
      setJsonData(fetchedData.filter(item => item !== null));
    };

    if (selectedCheckboxes.length > 0) {
      fetchData();
    } else {
      setJsonData([]);
    }
  }, [selectedCheckboxes]);

  const handleCheckboxChange = (checkboxName, checkboxUrl) => {
    if (selectedCheckboxes.includes(checkboxUrl)) {
      setSelectedCheckboxes(prevSelected => prevSelected.filter(url => url !== checkboxUrl));
    } else {
      setSelectedCheckboxes(prevSelected => [...prevSelected, checkboxUrl]);
    }
  };

  console.log('Selected URLs:', selectedCheckboxes);

  return (
    <div>
      {checkboxData.map(checkbox => (
        <label key={checkbox.name}>
          <input
            type="checkbox"
            checked={selectedCheckboxes.includes(checkbox.url)}
            onChange={() => handleCheckboxChange(checkbox.name, checkbox.url)}
          />
          {checkbox.name}
        </label>
      ))}
      <div>
        <h2>JSON Data:</h2>
        <pre>{JSON.stringify(jsonData, null, 2)}</pre>
      </div>
    </div>
  );
}

export default CheckboxList;
