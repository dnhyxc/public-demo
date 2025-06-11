import React from 'react';
import { NavBar, Tabs, Grid, Badge } from 'antd-mobile';
import ReactECharts from 'echarts-for-react';
import styles from './index.less';

interface ChartDataItem {
  value: number;
  name: string;
  itemStyle?: { color?: string };
  label?: { show?: boolean };
}

const Page11 = () => {
  const getDonutChartOption = (title: string, data: ChartDataItem[], total: number) => {
    return {
      title: {
        text: `{total|${total}}\n{title|总人数}`,
        left: 'center',
        top: '40%',
        textStyle: {
          rich: {
            total: {
              fontSize: 22,
              fontWeight: 'bold',
              color: '#333',
              lineHeight: 28,
            },
            title: {
              fontSize: 12,
              color: '#666',
            },
          },
        },
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}人 ({d}%)',
      },
      legend: {
        show: false, // Legend will be custom rendered
      },
      series: [
        {
          name: title,
          type: 'pie',
          radius: ['65%', '85%'],
          avoidLabelOverlap: false,
          label: { show: false },
          labelLine: { show: false },
          data,
        },
      ],
    };
  };

  const newHiresData: ChartDataItem[] = [
    { value: 18, name: '编外转正', itemStyle: { color: '#FFD700' } },
    { value: 325, name: '校招', itemStyle: { color: '#4A90E2' } },
    { value: 272, name: '社招', itemStyle: { color: '#F56C6C' } },
  ];
  const newHiresTotal = newHiresData.reduce((sum, item) => sum + item.value, 0);
  const newHiresOption = getDonutChartOption('新招聘员工', newHiresData, newHiresTotal);

  const departuresData: ChartDataItem[] = [
    { value: 18, name: '编外转正', itemStyle: { color: '#FFD700' } },
    { value: 325, name: '校招', itemStyle: { color: '#4A90E2' } },
    { value: 272, name: '社招', itemStyle: { color: '#F56C6C' } },
  ];
  const departuresTotal = departuresData.reduce((sum, item) => sum + item.value, 0);
  const departuresOption = getDonutChartOption('离职员工', departuresData, departuresTotal);

  const renderLegend = (data: ChartDataItem[]) => (
    <div className={styles.legendContainer}>
      {data.map((item) => (
        <div key={item.name} className={styles.legendItem}>
          <span
            className={styles.legendMarker}
            style={{ backgroundColor: item.itemStyle?.color }}
          />
          <span className={styles.legendText}>{item.name}</span>
          <span className={styles.legendValue}>{item.value}人</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className={styles.container}>
      <NavBar
        onBack={() => console.log('Back')}
        backArrow={true}
        right={<div style={{ fontSize: 18 }}>...</div>}
      >
        人力资源部
      </NavBar>
      <Tabs defaultActiveKey="recruitment" className={styles.tabs}>
        <Tabs.Tab title="招聘管理" key="recruitment" className={styles.activeTab}>
          <div className={styles.content}>
            <div className={styles.chartSection}>
              <div className={styles.sectionTitle}>本年度新招聘员工人数</div>
              <Grid columns={5} className={styles.chartArea}>
                <Grid.Item span={2}>{renderLegend(newHiresData)}</Grid.Item>
                <Grid.Item span={3}>
                  <ReactECharts
                    option={newHiresOption}
                    style={{ height: '150px', width: '100%' }}
                  />
                </Grid.Item>
              </Grid>
              <Grid columns={3} gap={8} className={styles.statsContainer}>
                <Grid.Item>
                  <div className={styles.statItem}>
                    <div className={styles.statValue}>
                      29<span className={styles.statUnit}>人</span>
                    </div>
                    <div className={styles.statLabel}>重点院校人数</div>
                  </div>
                </Grid.Item>
                <Grid.Item>
                  <div className={styles.statItem}>
                    <div className={styles.statValue}>
                      3<span className={styles.statUnit}>%</span>
                    </div>
                    <div className={styles.statLabel}>Stem占比</div>
                  </div>
                </Grid.Item>
                <Grid.Item>
                  <div className={styles.statItem}>
                    <div className={styles.statValue}>58:42</div>
                    <div className={styles.statLabel}>男女比例</div>
                  </div>
                </Grid.Item>
              </Grid>
            </div>

            <div className={styles.chartSection}>
              <div className={styles.sectionTitle}>本年度离职员工人数</div>
              <Grid columns={5} className={styles.chartArea}>
                <Grid.Item span={2}>{renderLegend(departuresData)}</Grid.Item>
                <Grid.Item span={3}>
                  <ReactECharts
                    option={departuresOption}
                    style={{ height: '150px', width: '100%' }}
                  />
                </Grid.Item>
              </Grid>
              <Grid columns={3} gap={8} className={styles.statsContainer}>
                <Grid.Item>
                  <div className={styles.statItem}>
                    <div className={styles.statValue}>
                      15<span className={styles.statUnit}>人</span>
                    </div>
                    <div className={styles.statLabel}>重点院校背景</div>
                  </div>
                </Grid.Item>
                <Grid.Item>
                  <div className={styles.statItem}>
                    <div className={styles.statValue}>
                      2<span className={styles.statUnit}>%</span>
                    </div>
                    <div className={styles.statLabel}>Stem背景</div>
                  </div>
                </Grid.Item>
                <Grid.Item>
                  <div className={styles.statItem}>
                    <div className={styles.statValue}>60:40</div>
                    <div className={styles.statLabel}>男女比例</div>
                  </div>
                </Grid.Item>
              </Grid>
            </div>
          </div>
        </Tabs.Tab>
        <Tabs.Tab
          title={
            <Badge content="1" style={{ '--right': '-10px', '--top': '8px' }}>
              党团管理
            </Badge>
          }
          key="party"
        />
        <Tabs.Tab title="组织人事" key="hr" />
        <Tabs.Tab title="绩效管理" key="performance" />
      </Tabs>
    </div>
  );
};

export default Page11;
