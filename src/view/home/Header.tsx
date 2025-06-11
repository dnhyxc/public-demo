import React from 'react';

const Header = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
      }}
    >
      <h1 style={{ margin: 0 }}>人力资源部 ▾</h1>
      <div style={{ textAlign: 'right' }}>
        <div>9:41</div> {/* Placeholder for time/icons */}
      </div>
    </div>
  );
};

export default Header;
