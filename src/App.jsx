import React, { useState, useEffect } from 'react';
import Counter from './components/Counter';
import ListView from './components/ListView';
import './app.css';

const App = () => {
  const [list, setList] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [duplicateMessage, setDuplicateMessage] = useState('');

  useEffect(() => {
    const storedList = localStorage.getItem('numberList');
    if (storedList) {
      setList(JSON.parse(storedList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('numberList', JSON.stringify(list));
  }, [list]);

  useEffect(() => {
    if (duplicateMessage) {
      const timer = setTimeout(() => {
        setDuplicateMessage('');
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [duplicateMessage]);

  const handleAddNumber = (num) => {
    if (list.includes(num)) {
      setDuplicateMessage(`The number ${num} already exists in the list.`);
    } else {
      setList(prevList => [...prevList, num]);
      setDuplicateMessage('');
    }
  };

  const handleDeleteNumber = (numToDelete) => {
    setList(prevList => prevList.filter(num => num !== numToDelete));
  };

  const handleClearList = () => {
    setList([]);
    setDuplicateMessage('');
  };

  const handleSortList = (direction) => {
    setSortOrder(direction);
    const sortedList = [...list].sort((a, b) => {
      return direction === 'asc' ? a - b : b - a;
    });
    setList(sortedList);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Raiqa Health Assignment</h1>
      <Counter 
        onAdd={handleAddNumber} 
        duplicateMessage={duplicateMessage} 
        setDuplicateMessage={setDuplicateMessage} 
      />
      <ListView
        list={list}
        onClearList={handleClearList}
        onSort={handleSortList}
        sortOrder={sortOrder}
        onDelete={handleDeleteNumber}
      />
    </div>
  );
};

export default App;