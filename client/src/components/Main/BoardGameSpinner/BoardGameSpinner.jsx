import React from 'react';

const BoardGameSpinner = () => {
  return (
    <div className="spinner-container">
      <div className="spinner">
        <div className="icon">🎲</div> {/* Dado */}
        <div className="icon">♟️</div> {/* Ficha */}
        <div className="icon">🃏</div> {/* Carta */}
        <div className="icon">🎯</div> {/* Dardo */}
      </div>
    </div>
  );
};

export default BoardGameSpinner;
