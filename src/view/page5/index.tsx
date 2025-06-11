import React, { useState } from 'react';
import { NavBar, Tabs, Card, List, Steps, Dropdown } from 'antd-mobile';
import { MoreOutline, CloseOutline, DownOutline } from 'antd-mobile-icons';
import styles from './index.less';

interface AnniversaryItem {
  date: string;
  events: {
    type: '入职纪念日' | '生日' | '家属生日' | '婚假';
    description: string;
    icon?: React.ReactNode; // For custom icons if needed
  }[];
}

const Page5: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('employeeCare');

  const overtimeData = [
    { title: '张三三等2人昨日加班过长', details: '' },
    { title: '张三三等4人本考勤月 (01.26-02.25) 加班过长', details: '' },
  ];

  const anniversaryData: AnniversaryItem[] = [
    {
      date: '02-18',
      events: [{ type: '入职纪念日', description: '李四等2人的入职纪念日' }],
    },
    {
      date: '02-19',
      events: [
        { type: '生日', description: '张三三等2人的生日' },
        { type: '家属生日', description: '李鸣宇等4人的家属生日' },
      ],
    },
    {
      date: '02-20',
      events: [
        { type: '婚假', description: '李沐湾等3人的婚假' },
        { type: '家属生日', description: '张海权等4人的家属生日' },
      ],
    },
    {
      date: '02-21',
      events: [
        { type: '生日', description: '李海波等4人的生日' },
        // { type: '家属生日', description: '欧阳丽丽等2人的家属生日' }, // Example of more data
      ],
    },
  ];

  const getEventIcon = (type: AnniversaryItem['events'][0]['type']) => {
    // Placeholder for icons, you can use antd-mobile icons or custom svgs
    switch (type) {
      case '入职纪念日':
        return <span className={styles.iconPlaceholder}>🎉</span>;
      case '生日':
        return <span className={styles.iconPlaceholder}>🎂</span>;
      case '家属生日':
        return <span className={styles.iconPlaceholder}>🎁</span>;
      case '婚假':
        return <span className={styles.iconPlaceholder}>💍</span>;
      default:
        return null;
    }
  };

  return (
    <div className={styles.pageContainer}>
      <NavBar
        backArrow={false}
        left={
          <span className={styles.departmentName}>
            人力资源部 <DownOutline />
          </span>
        }
        right={
          <div style={{ fontSize: 20 }}>
            <MoreOutline style={{ marginRight: '12px' }} />
            <CloseOutline />
          </div>
        }
        className={styles.navBar}
      >
        9:41
      </NavBar>

      <Tabs activeKey={activeTab} onChange={setActiveTab} className={styles.tabs}>
        <Tabs.Tab title="团队出勤" key="teamAttendance" />
        <Tabs.Tab title="员工关怀" key="employeeCare" />
        <Tabs.Tab title="团队构成" key="teamComposition" />
      </Tabs>

      <div className={styles.content}>
        <Card title="加班过长" className={styles.card}>
          <div className={styles.overtimeContainer}>
            {overtimeData.map((item, index) => (
              <div key={index} className={styles.overtimeItem}>
                {item.title}
              </div>
            ))}
          </div>
        </Card>

        <Card
          title="纪念日"
          className={styles.card}
          extra={
            <Dropdown>
              <Dropdown.Item key="dateRange" title="02-18 至 02-24">
                {/* You can add date picker functionality here */}
              </Dropdown.Item>
            </Dropdown>
          }
        >
          <List className={styles.anniversaryList}>
            {anniversaryData.map((day, dayIndex) => (
              <React.Fragment key={dayIndex}>
                <List.Item className={styles.dateHeader}>
                  <span className={styles.dateDot} />
                  {day.date}
                </List.Item>
                {day.events.map((event, eventIndex) => (
                  <List.Item
                    key={eventIndex}
                    prefix={getEventIcon(event.type)}
                    className={styles.eventItem}
                  >
                    {event.description}
                  </List.Item>
                ))}
              </React.Fragment>
            ))}
          </List>
          {/* <Steps direction="vertical" className={styles.anniversarySteps}>
            {anniversaryData.map((day, dayIndex) => (
              <Steps.Step
                key={dayIndex}
                title={<span className={styles.stepDate}>{day.date}</span>}
                icon={<div className={styles.dateStepIcon} />}
                description={
                  <div className={styles.eventsContainer}>
                    {day.events.map((event, eventIndex) => (
                      <div key={eventIndex} className={styles.eventCard}>
                        {getEventIcon(event.type)}
                        <span className={styles.eventDescription}>{event.description}</span>
                      </div>
                    ))}
                  </div>
                }
              />
            ))}
          </Steps> */}
        </Card>
      </div>
    </div>
  );
};

export default Page5;
