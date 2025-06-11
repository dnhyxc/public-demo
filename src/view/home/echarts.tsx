import React from 'react';
import Header from './header';
import OverallStats from './OverallStats';
import KpiCard from './KpiCard';
// 可以在这里引入一些基本的CSS样式
// import './Dashboard.css';

const Dashboard = () => {
  const kpiData = [
    {
      title: '正式员工STEM占比',
      value: '22%',
      comparisonYoY: '+3.21%', // 同比
      comparisonMoM: '-3.21%', // 环比
    },
    {
      title: '正式员工离职率',
      value: '22%',
      comparisonYoY: '+3.21%',
      comparisonMoM: '-3.21%',
    },
    {
      title: '正式员工新员工人数',
      value: '22',
      comparisonYoY: '+3.21%',
      comparisonMoM: '-3.21%',
    },
    {
      title: '正式员工干部占比',
      value: '22%',
      comparisonYoY: '+3.21%',
      comparisonMoM: '-3.21%',
    },
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <Header />
      {/* Tabs would go here */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: '20px 0',
          padding: '10px',
          border: '1px solid #eee',
          borderRadius: '5px',
        }}
      >
        <div style={{ fontSize: '1.2em', fontWeight: 'bold' }}>组织人事</div>
        <div style={{ color: '#aaa' }}>党团管理</div>
      </div>

      <h2 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px' }}>整体概览</h2>
      <OverallStats />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginTop: '20px',
        }}
      >
        {kpiData.map((kpi, index) => (
          <KpiCard
            key={index}
            title={kpi.title}
            value={kpi.value}
            comparisonYoY={kpi.comparisonYoY}
            comparisonMoM={kpi.comparisonMoM}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
