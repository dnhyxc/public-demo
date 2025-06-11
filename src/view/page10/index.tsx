import React, { useEffect, useRef } from 'react';
import { NavBar, Tabs, Grid } from 'antd-mobile';
import * as echarts from 'echarts';
import styles from './index.less';

const Page10 = () => {
  const performanceChartRef = useRef<HTMLDivElement | null>(null);
  const sequenceChartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let performanceChartInstance: echarts.ECharts | null = null;
    let sequenceChartInstance: echarts.ECharts | null = null;

    if (performanceChartRef.current) {
      performanceChartInstance = echarts.init(performanceChartRef.current);
      const performanceOption = {
        tooltip: {
          trigger: 'item',
        },
        legend: {
          orient: 'vertical',
          left: 'right',
          top: 'center',
          formatter: (name: string) => {
            // Mock data for legend - replace with actual data
            const dataMap: { [key: string]: number } = {
              A1: 8675,
              A2: 15234,
              A3: 18112,
              B1: 41341,
              B2及以下: 1811,
            };
            return `${name} ${dataMap[name] || 0}人`;
          },
        },
        series: [
          {
            name: '绩效分布',
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['35%', '50%'], // Adjust center to make space for legend
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: 'center',
              formatter: '{c}\n总人数',
              fontSize: 16,
              fontWeight: 'bold',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '20',
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 8675, name: 'A1' },
              { value: 15234, name: 'A2' },
              { value: 18112, name: 'A3' },
              { value: 41341, name: 'B1' },
              { value: 1811, name: 'B2及以下' },
            ],
          },
        ],
      };
      performanceChartInstance.setOption(performanceOption);
    }

    if (sequenceChartRef.current) {
      sequenceChartInstance = echarts.init(sequenceChartRef.current);
      const sequenceOption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999',
            },
          },
        },
        legend: {
          data: ['人数', '占比'],
          top: 10,
        },
        xAxis: [
          {
            type: 'category',
            data: ['初级', '中级', '高级', '资深'],
            axisPointer: {
              type: 'shadow',
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            name: '人数',
            min: 0,
            max: 60000,
            interval: 15000,
            axisLabel: {
              formatter: '{value}',
            },
          },
          {
            type: 'value',
            name: '占比',
            min: 0,
            max: 100,
            interval: 25,
            axisLabel: {
              formatter: '{value}%',
            },
          },
        ],
        series: [
          {
            name: '人数',
            type: 'bar',
            tooltip: {
              valueFormatter(value: number) {
                return `${value  } 人`;
              },
            },
            data: [31028, 45902, 6945, 1298],
            itemStyle: {
              color: '#FF7070', // Bar color similar to image
            },
          },
          {
            name: '占比',
            type: 'line',
            yAxisIndex: 1,
            tooltip: {
              valueFormatter(value: number) {
                return `${value  } %`;
              },
            },
            data: [30, 60, 15, 5], // Mock percentage data
            itemStyle: {
              color: '#5B8FF9', // Line color similar to image
            },
            smooth: true,
          },
        ],
      };
      sequenceChartInstance.setOption(sequenceOption);
    }

    const resizeCharts = () => {
      performanceChartInstance?.resize();
      sequenceChartInstance?.resize();
    };

    window.addEventListener('resize', resizeCharts);

    return () => {
      performanceChartInstance?.dispose();
      sequenceChartInstance?.dispose();
      window.removeEventListener('resize', resizeCharts);
    };
  }, []);

  const onBack = () => {
    // Handle back navigation
    console.log('Back clicked');
  };

  return (
    <div className={styles.container}>
      <NavBar
        onBack={onBack}
        backArrow
        right={<div style={{ fontSize: 18 }}>...</div>}
      >
        人力资源部
      </NavBar>
      <Tabs defaultActiveKey="performance" className={styles.tabs}>
        <Tabs.Tab title="组织管理" key="org" />
        <Tabs.Tab title="党团管理" key="party" />
        <Tabs.Tab title="组织人事" key="hr" />
        <Tabs.Tab title="绩效管理" key="performance" className={styles.activeTab}>
          <div className={styles.content}>
            <div className={styles.chartSection}>
              <div className={styles.sectionTitle}>本年度绩效分布人数</div>
              <div ref={performanceChartRef} className={styles.chartContainerPie}></div>
            </div>
            <div className={styles.chartSection}>
              <div className={styles.sectionTitle}>本年度专业序列分布</div>
              <div ref={sequenceChartRef} className={styles.chartContainerBar}></div>
            </div>
          </div>
        </Tabs.Tab>
      </Tabs>
    </div>
  );
};

export default Page10;
