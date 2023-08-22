import React, { useState } from 'react';

function CheckboxComponent() {
  const [checkboxes, setCheckboxes] = useState({
    prime: false,
    rand: false,
    fib: false,
    odd: false,
  });

  const handleCheckboxChange = (checkboxName) => {
    setCheckboxes(prevCheckboxes => ({
      ...prevCheckboxes,
      [checkboxName]: !prevCheckboxes[checkboxName]
    }));
  }; 
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={checkboxes.prime}
          onChange={() => handleCheckboxChange('prime')}
        />
        Prime
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          checked={checkboxes.rand}
          onChange={() => handleCheckboxChange('rand')}
        />
        Random
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          checked={checkboxes.fib}
          onChange={() => handleCheckboxChange('fib')}
        />
        Fibonacci
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          checked={checkboxes.odd}
          onChange={() => handleCheckboxChange('odd')}
        />
        Odd
      </label>
      <br />
      <div>
        {checkboxes.prime && <p>Prime URL: http://20.244.56.144/numbers/primes</p>}
        {checkboxes.rand && <p>Random URL: http://20.244.56.144/numbers/rand</p>}
        {checkboxes.fib && <p>Fibonacci URL: http://20.244.56.144/numbers/fib</p>}
        {checkboxes.odd && <p>Odd URL: http://20.244.56.144/numbers/odd</p>}
      </div>
    </div>
  );
}

export default CheckboxComponent;
