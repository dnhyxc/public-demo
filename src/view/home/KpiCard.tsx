import React from 'react';

const KpiCard = ({ title, value, comparisonYoY, comparisonMoM }: any) => {
  const yoyColor = comparisonYoY && comparisonYoY.startsWith('+') ? 'red' : 'green';
  const momColor = comparisonMoM && comparisonMoM.startsWith('+') ? 'red' : 'green';

  return (
    <div
      style={{
        border: '1px solid #eee',
        borderRadius: '5px',
        padding: '15px',
        textAlign: 'left',
        backgroundColor: '#f9f9f9',
      }}
    >
      <div style={{ fontSize: '14px', color: '#555', marginBottom: '5px' }}>{title}</div>
      <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>
        {value}
      </div>
      <div style={{ fontSize: '12px' }}>
        {comparisonYoY && (
          <span style={{ color: yoyColor, marginRight: '10px' }}>同比 {comparisonYoY}</span>
        )}
        {comparisonMoM && <span style={{ color: momColor }}>环比 {comparisonMoM}</span>}
      </div>
    </div>
  );
};

export default KpiCard;
