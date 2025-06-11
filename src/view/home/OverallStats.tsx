import React from 'react';
import ReactECharts from 'echarts-for-react';

const OverallStats = () => {
  const totalEmployees = 91173;
  const fullTime = 56000;
  const dispatched = 23000;
  const outsourced = 16173;

  const gaugeOptions = {
    series: [
      {
        type: 'gauge',
        startAngle: 180, // 从左边开始
        endAngle: 0, // 到右边结束
        min: 0,
        max: 100000, // 假设最大容量，可以根据实际情况调整
        splitNumber: 5,
        axisLine: {
          lineStyle: {
            width: 20,
            color: [
              [fullTime / totalEmployees, '#c23531'], // 正式
              [(fullTime + dispatched) / totalEmployees, '#61a0a8'], // 派遣
              [1, '#ca8622'], // 外包
            ],
          },
        },
        pointer: {
          show: false, // 不显示指针
        },
        axisTick: {
          show: false, // 不显示刻度
        },
        splitLine: {
          show: false, // 不显示分割线
        },
        axisLabel: {
          show: false, // 不显示标签
        },
        title: {
          offsetCenter: [0, '0%'],
          fontSize: 24,
          fontWeight: 'bold',
          color: '#333',
        },
        detail: {
          valueAnimation: true,
          formatter(value: number) {
            return value.toLocaleString(); // 添加千位分隔符
          },
          offsetCenter: [0, '0%'], // 将数字居中
          fontSize: 30,
          fontWeight: 'bold',
          color: '#333',
        },
        data: [
          {
            value: totalEmployees,
            // name: '总人数' // 如果需要在图表中心显示文字，可以在这里配置
          },
        ],
      },
    ],
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '30px',
        padding: '20px',
        border: '1px solid #eee',
        borderRadius: '5px',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          position: 'relative',
          width: '200px',
          height: '100px',
        }}
      >
        <ReactECharts option={gaugeOptions} style={{ height: '100px', width: '200px' }} />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
            {totalEmployees.toLocaleString()}
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>总人数</div>
        </div>
      </div>
      <div style={{ flexGrow: 1 }}>
        <div style={{ marginBottom: '10px' }}>
          <span style={{ color: '#c23531', marginRight: '5px' }}>●</span> 正式{' '}
          {fullTime.toLocaleString()} 人
          <span style={{ color: '#61a0a8', margin: '0 5px 0 15px' }}>●</span> 派遣{' '}
          {dispatched.toLocaleString()} 人
          <span style={{ color: '#ca8622', margin: '0 5px 0 15px' }}>●</span> 外包{' '}
          {outsourced.toLocaleString()} 人
        </div>
        <div style={{ display: 'flex', gap: '30px' }}>
          <div>
            <div style={{ fontSize: '12px', color: '#888' }}>男女比例</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>62:38</div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: '#888' }}>平均年龄</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
              32.5 <span style={{ fontSize: '12px' }}>周岁</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverallStats;
