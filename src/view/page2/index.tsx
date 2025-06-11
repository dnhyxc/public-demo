import React from 'react';
import ReactECharts from 'echarts-for-react';
import classnames from 'classnames';
import styles from './index.less';

const Page2: React.FC = () => {
  const totalPeople = 4536;
  const malePartyMembers = 1702;
  const femalePartyMembers = 2934;

  const option = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      show: false,
    },
    series: [
      {
        name: '党员概览',
        type: 'pie',
        radius: ['60%', '80%'],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: 'center',
          formatter: () => `${totalPeople}\n总人数`,
          fontSize: 20,
          fontWeight: 'bold',
          color: '#333',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 22,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: malePartyMembers, name: '数据一', itemStyle: { color: '#5470C6' } },
          { value: femalePartyMembers, name: '数据二', itemStyle: { color: '#EE6666' } },
        ],
        silent: true, // Make the chart non-interactive if labels are outside
      },
    ],
  };

  return (
    <div className={styles['page2-container']}>
      <div className={styles['header-tabs']}>
        <span className={styles['tab-active']}>组织人事</span>
        <span>党建管理</span>
      </div>
      <div className={styles['content-wrapper']}>
        <h3 className={styles['section-title']}>整体概览</h3>
        <div className={styles['main-content']}>
          <div className={styles['chart-section']}>
            <ReactECharts option={option} style={{ height: '250px', width: '100%' }} />
            <div className={styles['chart-annotations']}>
              <div className={classnames(styles['annotation-item'], styles.left)}>
                <span className={styles.value}>{malePartyMembers}人</span>
              </div>
              <div className={classnames(styles['annotation-item'], styles.right)}>
                <span className={styles.value}>{femalePartyMembers}人</span>
              </div>
            </div>
          </div>
          <div className={classnames(styles['data-section'])}>
            <div className={styles['data-item']}>
              <div className={styles['data-value']}>1230</div>
              <div className={styles['data-label']}>组织类型</div>
            </div>
            <div className={styles['data-item']}>
              <div className={styles['data-value']}>1411</div>
              <div className={styles['data-label']}>党员总人数</div>
            </div>
            <div className={styles['data-item']}>
              <div className={styles['data-value']}>237</div>
              <div className={styles['data-label']}>成立党支部</div>
            </div>
            <div className={styles['data-item']}>
              <div className={styles['data-value']}>53,411</div>
              <div className={styles['data-label']}>群众</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page2;
