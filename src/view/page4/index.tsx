import React from 'react';
import ReactECharts from 'echarts-for-react';
import styles from './index.less';

const Page4: React.FC = () => {
  const getChartOption = (title: string) => ({
    tooltip: {
      trigger: 'item',
    },
    title: {
      text: title,
      left: '20px',
      top: '20px',
      textStyle: {
        fontSize: 14,
        fontWeight: 'normal',
        color: '#333',
      },
    },
    legend: {
      show: false,
    },
    series: [
      {
        type: 'pie',
        radius: ['65%', '80%'],
        center: ['50%', '55%'],
        data: [
          { value: 325, name: '校招', itemStyle: { color: '#4B7BE5' } },
          { value: 272, name: '社招', itemStyle: { color: '#E86452' } },
        ],
        label: {
          show: false,
        },
        emphasis: {
          disabled: true,
        },
      },
    ],
  });

  const renderStats = () => (
    <div className={styles.statsContainer}>
      <div className={styles.statItem}>
        <span className={styles.label}>重点院校人数</span>
        <span className={styles.value}>29人</span>
      </div>
      <div className={styles.statItem}>
        <span className={styles.label}>985/211</span>
        <span className={styles.value}>3人</span>
      </div>
      <div className={styles.statItem}>
        <span className={styles.label}>男女比例</span>
        <span className={styles.value}>58:42</span>
      </div>
    </div>
  );

  return (
    <div className={styles.page3Container}>
      <div className={styles.header}>
        <div className={styles.tab}>1</div>
        <span className={styles.title}>招聘管理</span>
      </div>

      <div className={styles.chartsContainer}>
        <div className={styles.chartWrapper}>
          <ReactECharts
            option={getChartOption('本年度新招聘员工人数')}
            style={{ height: '300px' }}
          />
          <div className={styles.centerText}>
            <span className={styles.number}>453</span>
            <span className={styles.label}>总人数</span>
          </div>
          <div className={styles.chartLabels}>
            <div className={styles.labelItem}>
              <span className={styles.dot} style={{ backgroundColor: '#4B7BE5' }} />
              <span className={styles.text}>校招 325人</span>
            </div>
            <div className={styles.labelItem}>
              <span className={styles.dot} style={{ backgroundColor: '#E86452' }} />
              <span className={styles.text}>社招 272人</span>
            </div>
          </div>
          {renderStats()}
        </div>

        <div className={styles.chartWrapper}>
          <ReactECharts
            option={getChartOption('本年度离职员工人数')}
            style={{ height: '300px' }}
          />
          <div className={styles.centerText}>
            <span className={styles.number}>453</span>
            <span className={styles.label}>总人数</span>
          </div>
          <div className={styles.chartLabels}>
            <div className={styles.labelItem}>
              <span className={styles.dot} style={{ backgroundColor: '#4B7BE5' }} />
              <span className={styles.text}>校招 325人</span>
            </div>
            <div className={styles.labelItem}>
              <span className={styles.dot} style={{ backgroundColor: '#E86452' }} />
              <span className={styles.text}>社招 272人</span>
            </div>
          </div>
          {renderStats()}
        </div>
      </div>
    </div>
  );
};

export default Page4;
