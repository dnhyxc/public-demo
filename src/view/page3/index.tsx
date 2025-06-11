import React from 'react';
import ReactECharts from 'echarts-for-react';
import styles from './index.less';

const Page3: React.FC = () => {
  const totalPeople = 85173;

  const levelDistributionOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: ['初级', '中级', '高级', '资深', ''],
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        max: 50000,
      },
    ],
    series: [
      {
        name: '人数',
        type: 'bar',
        barWidth: '30%',
        data: [31028, 45902, 6945, 1298, 0],
      },
    ],
  };

  const distributionOption = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      right: '5%',
      top: 'center',
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 10,
      formatter: (name: string) => {
        const map: Record<string, string> = {
          A1: 'A1 8,675人',
          A2: 'A2 15,234人',
          A3: 'A3 18,112人',
          B1: 'B1 41,341人',
          B2: 'B2及以下 1,811人',
        };
        return map[name] || name;
      },
    },
    series: [
      {
        name: '人员分布',
        type: 'pie',
        radius: ['50%', '70%'],
        center: ['35%', '50%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 8675, name: 'A1', itemStyle: { color: '#FF6B6B' } },
          { value: 15234, name: 'A2', itemStyle: { color: '#4ECDC4' } },
          { value: 18112, name: 'A3', itemStyle: { color: '#FFD93D' } },
          { value: 41341, name: 'B1', itemStyle: { color: '#6C5CE7' } },
          { value: 1811, name: 'B2', itemStyle: { color: '#A8E6CF' } },
        ],
      },
    ],
  };

  return (
    <div className={styles.page3Container}>
      <div className={styles.headerTabs}>
        <span>组织管理</span>
        <span>党团管理</span>
        <span className={styles.tabActive}>组织人事</span>
        <span>绩效管理</span>
      </div>

      <div className={styles.contentSection}>
        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>本年度级别分布人数</h3>
          <div className={styles.distributionChart}>
            <div className={styles.totalNumber}>
              <span className={styles.number}>{totalPeople}</span>
              <span className={styles.label}>总人数</span>
            </div>
            <ReactECharts option={distributionOption} style={{ height: '300px' }} />
          </div>
        </div>

        <div className={styles.chartCard}>
          <h3 className={styles.chartTitle}>本年度专业水平分布</h3>
          <ReactECharts option={levelDistributionOption} style={{ height: '300px' }} />
        </div>
      </div>
    </div>
  );
};

export default Page3;
