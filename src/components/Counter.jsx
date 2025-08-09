import React, { useState, useEffect } from 'react';

const Counter = ({ onAdd, duplicateMessage, setDuplicateMessage }) => {
  const [count, setCount] = useState(0);
  const [counterMessage, setCounterMessage] = useState('');

  // Clear the counter message after 6 seconds
  useEffect(() => {
    if (counterMessage) {
      const timer = setTimeout(() => {
        setCounterMessage('');
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [counterMessage]);

  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1);
    setCounterMessage('');
    setDuplicateMessage('');
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(prevCount => prevCount - 1);
      setCounterMessage('');
      setDuplicateMessage('');
    } else {
      setCounterMessage("Cannot go below 0.");
    }
  };

  const handleAddToList = () => {
    if (count > 0) {
      onAdd(count);
      setCount(0);
      setCounterMessage('');
    } else {
      setCounterMessage("Number must be greater than 0 to be added to the list.");
      setDuplicateMessage('');
    }
  };

  return (
    <div className="counter-card">
      <h3 className="card-title">Counter</h3>
      <div className="counter-controls">
        <button className="control-btn" onClick={handleDecrement}>-</button>
        <span className="count-value">{count}</span>
        <button className="control-btn" onClick={handleIncrement}>+</button>
      </div>
      <button className="add-btn" onClick={handleAddToList}>Add to List</button>
      {counterMessage && <p className="counter-message">{counterMessage}</p>}
      {duplicateMessage && <p className="counter-message">{duplicateMessage}</p>}
    </div>
  );
};

export default Counter;