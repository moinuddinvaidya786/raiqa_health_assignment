import React, { useState, useEffect } from 'react';

const ListView = ({ list, onClearList, onSort, sortOrder, onDelete }) => {
  const [highest, setHighest] = useState(null);
  const [lowest, setLowest] = useState(null);

  useEffect(() => {
    if (list.length > 0) {
      const sortedList = [...list].sort((a, b) => a - b);
      setLowest(sortedList[0]);
      setHighest(sortedList[sortedList.length - 1]);
    } else {
      setLowest(null);
      setHighest(null);
    }
  }, [list]);

  const handleToggleSort = () => {
    onSort(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="list-card">
      <h3 className="card-title">Numbers List</h3>
      <div className="list-actions">
        <button className="action-btn" onClick={handleToggleSort}>
          
          Sort <span className="sort-icon">{sortOrder === 'asc' ? '▲' : '▼'}</span>
        </button>
        <button className="action-btn secondary" onClick={onClearList}>Clear All</button>
      </div>
      <ul className="number-list-items">
        {list.map((num, index) => (
          <li
            key={index}
            className={`list-item ${num === highest ? 'highlight-highest' : ''} ${num === lowest ? 'highlight-lowest' : ''}`}
          >
            <span className="item-number">{num}</span>
            <button className="delete-btn" onClick={() => onDelete(num)}>
                <i className="material-icons">&#xe872;</i>
            </button>
          </li>
        ))}
      </ul>
      <p className="total-count">Total numbers: {list.length}</p>
    </div>
  );
};

export default ListView;