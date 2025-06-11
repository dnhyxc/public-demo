import React, { useState } from 'react';
import { NavBar, Tabs, Card, Space, Grid, Divider } from 'antd-mobile';
import {
  DownOutline,
  MoreOutline,
  CloseOutline,
  UserSetOutline, // Placeholder for gender icon
  ClockCircleOutline, // Placeholder for age icon
} from 'antd-mobile-icons';
import classnames from 'classnames';
import ReactECharts from 'echarts-for-react';
import styles from './index.less';

const Page9: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('partyManagement'); // Default to Party Management as it has badges

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
        radius: ['60%', '80%'], // Donut chart
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
          { value: 56000, name: '正式', itemStyle: { color: '#D94A54' } }, // Reddish pink
          { value: 23000, name: '派遣', itemStyle: { color: '#3B86FF' } }, // Blue
          { value: 16173, name: '外包', itemStyle: { color: '#FFC42E' } }, // Yellow
        ],
        // Use the sum of data for the center label
        animation: false, // Disable animation for static sum display if needed
      },
    ],
  };
  // Manually calculate total for the chart center, ECharts label formatter can access series.data.reduce for sum
  const totalPeople = overviewChartOption.series[0].data.reduce(
    (sum, item) => sum + item.value,
    0
  );
  overviewChartOption.series[0].label.formatter = [
    `{a|${totalPeople.toLocaleString()}}`,
    '{b|总人数}',
  ].join('\n');

  const keyMetrics = [
    { label: '正式员工STEM占比', value: '22%', yoy: '+3.21%', mom: '-3.21%' },
    { label: '正式员工离职率', value: '22%', yoy: '+3.21%', mom: '-3.21%' },
    { label: '正式员工新员工人数', value: '22%', yoy: '+3.21%', mom: '-3.21%' },
    { label: '正式员工干部占比', value: '22%', yoy: '+3.21%', mom: '-3.21%' },
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
        <Tabs.Tab title="组织人事" key="organizationalPersonnel" />
        <Tabs.Tab
          title={
            <div className={styles.tabWithBadge}>
              党团管理
              <span className={`${styles.badge} ${styles.badgeTop}`}>17.07%</span>
              <span className={`${styles.badge} ${styles.badgeBottom}`}>2.96%</span>
            </div>
          }
          key="partyManagement"
        />
      </Tabs>

      <Card title="整体概览" className={styles.customCard}>
        <Grid columns={10} gap={8} className={styles.overviewGrid}>
          <Grid.Item span={4}>
            <ReactECharts option={overviewChartOption} style={{ height: '130px' }} />
            <div className={styles.chartLegend}>
              <Space
                wrap
                style={{ gap: 12 }}
                justify="center"
                style={{ '--gap-vertical': '4px' }}
              >
                <span>
                  <span className={classnames(styles.legendDot, styles.dotRed)}></span>正式{' '}
                  {overviewChartOption.series[0].data[0].value.toLocaleString()}人
                </span>
                <span>
                  <span className={classnames(styles.legendDot, styles.dotBlue)}></span>
                  派遣 {overviewChartOption.series[0].data[1].value.toLocaleString()}人
                </span>
                <span>
                  <span className={classnames(styles.legendDot, styles.dotYellow)}></span>
                  外包 {overviewChartOption.series[0].data[2].value.toLocaleString()}人
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

        <Grid columns={2} gap={12} className={styles.keyMetricsGrid}>
          {keyMetrics.map((metric) => (
            <Grid.Item key={metric.label} className={styles.metricCard}>
              <div className={styles.metricLabel}>{metric.label}</div>
              <div className={styles.metricValue}>{metric.value}</div>
              <div className={styles.comparisonContainer}>
                <span className={styles.comparisonText}>同比</span>
                <span className={`${styles.comparisonValue} ${styles.positive}`}>
                  {metric.yoy}
                </span>
              </div>
              <div className={styles.comparisonContainer}>
                <span className={styles.comparisonText}>环比</span>
                <span className={`${styles.comparisonValue} ${styles.negative}`}>
                  {metric.mom}
                </span>
              </div>
            </Grid.Item>
          ))}
        </Grid>
      </Card>
    </div>
  );
};

export default Page9;
