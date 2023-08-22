import React, { useState, useEffect } from 'react';
// import './CheckboxList.css'; // Import the CSS file for styling

function CheckboxList() {
  const checkboxData = [
    { name: 'prime', url: 'http://20.244.56.144/numbers/primes' },
    { name: 'rand', url: 'http://20.244.56.144/numbers/rand' },
    { name: 'fib', url: 'http://20.244.56.144/numbers/fibo' },
    { name: 'odd', url: 'http://20.244.56.144/numbers/odd' },
  ];
  
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [fetchedNumbers, setFetchedNumbers] = useState([]);

  const handleCheckboxChange = (checkboxName, checkboxUrl) => {
    if (selectedCheckboxes.includes(checkboxUrl)) {
      setSelectedCheckboxes(prevSelected => prevSelected.filter(url => url !== checkboxUrl));
    } else {
      setSelectedCheckboxes(prevSelected => [...prevSelected, checkboxUrl]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tempURL = selectedCheckboxes.map(url => encodeURIComponent(url)).join('&url=');
        const outUrl = `http://localhost:8008/numbers?url=${tempURL}`;
        const response = await fetch(outUrl);
        const responseData = await response.json();
        setFetchedNumbers(responseData.numbers);
      } catch (error) {
        console.error('Error fetching data from outUrl:', error);
      }
    };

    if (selectedCheckboxes.length > 0) {
      fetchData();
    } else {
      setFetchedNumbers([]); // Clear the fetched numbers when no checkboxes are selected
    }
  }, [selectedCheckboxes]);

  return (
    <div>
      {/* Checkbox labels */}
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
      </div>

      {/* Display fetched numbers in a styled way */}
      <div className="fetched-data-container">
        <h2>Fetched Numbers:</h2>
        <ul className="fetched-data-list">
          {fetchedNumbers.map((number, index) => (
            <li key={index}>{number}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CheckboxList;
