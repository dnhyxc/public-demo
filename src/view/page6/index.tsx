import React, { useState } from 'react';
import { NavBar, Tabs, Card, Space, Grid, Avatar, Image, Divider } from 'antd-mobile';
import { DownOutline, MoreOutline, CloseOutline } from 'antd-mobile-icons';
import styles from './index.less';

// Placeholder for an icon, replace with actual icons or an icon component
const WarningIcon = () => (
  <Image
    src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" // Example warning icon
    width={16}
    height={16}
    fit="contain"
    style={{ marginRight: '4px' }}
  />
);

const Page6: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('teamAttendance');

  const abnormalAttendanceData = {
    title: '异常考勤',
    period: '考勤周期 01.26-02.25',
    longTermAbnormal: [
      {
        name: '张三三',
        avatar:
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: '李思思',
        avatar:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: '李思思',
        avatar:
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: '王浩晨',
        avatar:
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    ],
    stats: [
      { label: '迟到', value: '22', unit: '人次', todayChange: '+11' },
      { label: '未打卡', value: '1', unit: '人次', todayChange: '' }, // No todayChange in image for this
      { label: '早退', value: '22', unit: '人次', todayChange: '+6' },
      { label: '旷工', value: '22', unit: '人次', todayChange: '+1' },
    ],
  };

  const otherAttendanceData = {
    title: '其他考勤',
    stats: [
      {
        label: '日均加班中位数(原始)',
        value: '22',
        unit: '时',
        comparisonYoY: '+3.21%',
        comparisonMoM: '-3.21%',
      },
      {
        label: '公出(含外出)人数',
        value: '1',
        unit: '人',
        comparisonYoY: '+3.21%',
        comparisonMoM: '-3.21%',
      },
    ],
  };

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

      {/* Abnormal Attendance Section */}
      <div className={styles.attendancePeriod}>{abnormalAttendanceData.period}</div>
      <Card
        title={abnormalAttendanceData.title}
        className={styles.customCard}
        bodyClassName={styles.abnormalCardBody}
      >
        <div className={styles.longTermAbnormalTitle}>
          <WarningIcon />
          长期考勤异常人员 ({abnormalAttendanceData.longTermAbnormal.length})
        </div>
        <Grid columns={4} gap={8} className={styles.avatarGrid}>
          {abnormalAttendanceData.longTermAbnormal.map((person, index) => (
            <Grid.Item key={index} className={styles.avatarItem}>
              <Avatar src={person.avatar} className={styles.avatar} />
              <div className={styles.avatarName}>{person.name}</div>
            </Grid.Item>
          ))}
        </Grid>
        <Grid columns={2} gap={16} className={styles.statsGrid}>
          {abnormalAttendanceData.stats.map((stat, index) => (
            <Grid.Item key={index}>
              <div className={styles.statLabel}>{stat.label}</div>
              <div className={styles.statValue}>
                {stat.value} <span className={styles.statUnit}>{stat.unit}</span>
              </div>
              {stat.todayChange && (
                <div className={styles.statTodayChange}>今日 {stat.todayChange}</div>
              )}
            </Grid.Item>
          ))}
        </Grid>
      </Card>

      {/* Other Attendance Section */}
      <Card
        title={otherAttendanceData.title}
        className={`${styles.customCard} ${styles.otherAttendanceCard}`}
      >
        <Grid columns={2} gap={16}>
          {otherAttendanceData.stats.map((stat, index) => (
            <Grid.Item key={index} className={styles.otherStatItem}>
              <div className={styles.otherStatLabel}>{stat.label}</div>
              <div className={styles.otherStatValue}>
                {stat.value} <span className={styles.otherStatUnit}>{stat.unit}</span>
              </div>
              <div className={styles.comparisonContainer}>
                <span className={styles.comparisonText}>同比</span>
                <span
                  className={`${styles.comparisonValue} ${
                    stat.comparisonYoY.startsWith('+') ? styles.positive : styles.negative
                  }`}
                >
                  {stat.comparisonYoY}
                </span>
              </div>
              <div className={styles.comparisonContainer}>
                <span className={styles.comparisonText}>环比</span>
                <span
                  className={`${styles.comparisonValue} ${
                    stat.comparisonMoM.startsWith('+') ? styles.positive : styles.negative
                  }`}
                >
                  {stat.comparisonMoM}
                </span>
              </div>
            </Grid.Item>
          ))}
        </Grid>
      </Card>
    </div>
  );
};

export default Page6;
