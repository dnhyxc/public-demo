import React, { useState } from 'react';
import { NavBar, Tabs, Card, Space, Grid, Divider } from 'antd-mobile';
import {
  DownOutline,
  MoreOutline,
  CloseOutline,
  UserSetOutline, // Placeholder for gender icon
  ClockCircleOutline, // Placeholder for age icon
  ArrowsAltOutline, // Placeholder for expand icon
} from 'antd-mobile-icons';
import ReactECharts from 'echarts-for-react';
import classnames from 'classnames';
import styles from './index.less';

const Page8: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('teamComposition');

  const overviewChartOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}人 ({d}%)',
    },
    legend: {
      show: false, // Legend is shown below chart in the image
    },
    series: [
      {
        name: '总人数',
        type: 'pie',
        radius: ['60%', '80%'], // Make it a donut chart
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: 'center',
          formatter: ['{a|{c}}', '{b|总人数}'].join('\n'),
          rich: {
            a: {
              fontSize: 24,
              fontWeight: 'bold',
              color: '#333',
              lineHeight: 30,
            },
            b: {
              fontSize: 13,
              color: '#666',
            },
          },
        },
        emphasis: {
          label: {
            show: true,
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 272, name: '正式', itemStyle: { color: '#F76560' } }, // Red
          { value: 139, name: '派遣', itemStyle: { color: '#3B86FF' } }, // Blue
          { value: 42, name: '外包', itemStyle: { color: '#FFC42E' } }, // Yellow
        ],
      },
    ],
  };

  const professionalDistributionOption = {
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
      top: 0,
      right: 10,
      textStyle: { fontSize: 10 },
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
        data: ['初级', '中级', '高级', '资深'],
        axisPointer: {
          type: 'shadow',
        },
        axisLabel: { fontSize: 11 },
        axisTick: { show: false },
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: '',
        min: 0,
        max: 200,
        interval: 50,
        axisLabel: { formatter: '{value}', fontSize: 10 },
        splitLine: { lineStyle: { type: 'dashed' } },
      },
      {
        type: 'value',
        name: '',
        min: 0,
        max: 100,
        interval: 25,
        axisLabel: { formatter: '{value}%', fontSize: 10 },
        splitLine: { show: false },
      },
    ],
    series: [
      {
        name: '人数',
        type: 'bar',
        barWidth: '40%',
        tooltip: {
          valueFormatter(value: number) {
            return `${value} 人`;
          },
        },
        data: [
          { value: 90, itemStyle: { color: '#F76560' } },
          { value: 146, itemStyle: { color: '#F76560' } },
          { value: 160, itemStyle: { color: '#F76560' } },
          { value: 57, itemStyle: { color: '#F76560' } },
        ],
      },
      {
        name: '占比',
        type: 'line',
        yAxisIndex: 1,
        tooltip: {
          valueFormatter(value: number) {
            return `${value} %`;
          },
        },
        data: [45, 73, 80, 28.5], // Example percentages, calculate based on total
        symbol: 'circle',
        symbolSize: 6,
        itemStyle: { color: '#3B86FF' },
        lineStyle: { color: '#3B86FF', width: 2 },
      },
    ],
  };

  const overviewStats = [
    { label: '全日制本科以上占比', value: '22%' },
    { label: '半年内新到岗占比', value: '4%' },
    { label: '干部占比', value: '21%' },
    { label: '离职率', value: '3%' },
  ];

  const personnelChanges = [
    { label: '新入职', value: 29 },
    { label: '离职', value: 29 },
    { label: '调入', value: 3 },
    { label: '调出', value: 103 },
    { label: '退休', value: 15 },
    { label: '内退', value: 6 },
  ];

  return (
    <div className={styles.pageContainer}>
      <NavBar
        backArrow={false}
        left={
          <Space align="center">
            人力资源部 <DownOutline fontSize={14} />
          </Space>
        }
        right={
          <Space>
            <MoreOutline fontSize={20} />
            <CloseOutline fontSize={20} />
          </Space>
        }
        className={styles.navBar}
      >
        9:41
      </NavBar>

      <Tabs activeKey={activeTab} onChange={setActiveTab} className={styles.tabsContainer}>
        <Tabs.Tab title="团队出勤" key="teamAttendance" />
        <Tabs.Tab title="员工关怀" key="employeeCare" />
        <Tabs.Tab title="团队构成" key="teamComposition" />
      </Tabs>

      <Card title="整体概览" className={styles.customCard}>
        <Grid columns={10} gap={8} className={styles.overviewGrid}>
          <Grid.Item span={4}>
            <ReactECharts option={overviewChartOption} style={{ height: '130px' }} />
            <div className={styles.chartLegend}>
              <Space wrap style={{ gap: 12 }} justify="center">
                <span>
                  <span className={classnames(styles.legendDot, styles.dotRed)}></span>
                  正式 272人
                </span>
                <span>
                  <span className={classnames(styles.legendDot, styles.dotBlue)}></span>
                  派遣 139人
                </span>
                <span>
                  <span className={classnames(styles.legendDot, styles.dotYellow)}></span>
                  外包 42人
                </span>
              </Space>
            </div>
          </Grid.Item>
          <Grid.Item span={6} className={styles.overviewDetails}>
            <div className={styles.detailItem}>
              <UserSetOutline className={styles.detailIcon} />
              <div>
                <div className={styles.detailLabel}>男女比例</div>
                <div className={styles.detailValue}>62:38</div>
              </div>
            </div>
            <Divider direction="horizontal" style={{ margin: '8px 0' }} />
            <div className={styles.detailItem}>
              <ClockCircleOutline className={styles.detailIcon} />
              <div>
                <div className={styles.detailLabel}>平均年龄</div>
                <div className={styles.detailValue}>
                  32.5 <span className={styles.valueUnit}>周岁</span>
                </div>
              </div>
            </div>
          </Grid.Item>
        </Grid>
        <Grid columns={2} gap={0} className={styles.overviewStatsGrid}>
          {overviewStats.map((stat) => (
            <Grid.Item key={stat.label} className={styles.statBox}>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </Grid.Item>
          ))}
        </Grid>
      </Card>

      <Card
        title="人员变动数"
        className={styles.customCard}
        extra={
          <Space align="center" className={styles.cardExtra}>
            <span style={{ fontSize: 12 }}>本月</span> <ArrowsAltOutline />
          </Space>
        }
      >
        <Grid columns={2} gap={12} className={styles.personnelChangesGrid}>
          {personnelChanges.map((item) => (
            <Grid.Item key={item.label} className={styles.personnelItem}>
              <span>{item.label}</span>
              <span className={styles.personnelValue}>{item.value}</span>
            </Grid.Item>
          ))}
        </Grid>
      </Card>

      <Card title="专业序列分布" className={styles.customCard}>
        <ReactECharts option={professionalDistributionOption} style={{ height: '220px' }} />
      </Card>
    </div>
  );
};

export default Page8;
