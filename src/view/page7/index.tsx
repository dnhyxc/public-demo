import React, { useState } from 'react';
import { Grid, NavBar, Space, Button, List, Tag, Dropdown, Badge } from 'antd-mobile';
import {
  LeftOutline,
  AppstoreOutline, // Placeholder for home/app icon
  MoreOutline,
  CloseOutline,
  DownOutline,
  UpOutline,
} from 'antd-mobile-icons';
import styles from './index.less';

interface AnniversaryItem {
  id: string;
  name: string;
  tag?: string; // For the small red '新' tag
  date: string;
  type: string;
}

const initialAnniversaryData: AnniversaryItem[] = [
  { id: '1', name: '李四', tag: '新', date: '02-18', type: '入职纪念日' },
  { id: '2', name: '张杰杰杰', tag: '新', date: '02-18', type: '入职纪念日' },
  { id: '3', name: '张三三', tag: '新', date: '02-18', type: '生日' },
  { id: '4', name: '张杰', tag: '新', date: '02-18', type: '生日' },
  { id: '5', name: '李鸣', tag: '新', date: '02-19', type: '家属生日' },
  { id: '6', name: '陈建军', tag: '新', date: '02-19', type: '家属生日' },
  { id: '7', name: '张好', tag: '新', date: '02-20', type: '家属生日' },
  { id: '8', name: '张好', tag: '新', date: '02-20', type: '家属生日' },
  { id: '9', name: '张好', tag: '新', date: '02-21', type: '家属生日' },
  { id: '10', name: '张好', tag: '新', date: '02-21', type: '家属生日' },
  { id: '11', name: '张好', tag: '新', date: '02-21', type: '家属生日' },
  { id: '12', name: '张好', tag: '新', date: '02-22', type: '家属生日' },
];

type SortKey = 'name' | 'date';
type SortOrder = 'asc' | 'desc' | 'none';

const Page8: React.FC = () => {
  const [data, setData] = useState<AnniversaryItem[]>(initialAnniversaryData);
  const [dateRange, setDateRange] = useState<string>('02.18 至 02.24');
  const [anniversaryType, setAnniversaryType] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; order: SortOrder }[]>([
    { key: 'name', order: 'none' },
    { key: 'date', order: 'desc' }, // Date initially sorted desc as per image
  ]);

  const handleSort = (key: SortKey) => {
    setSortConfig((prevConfig: any[]) => {
      const newConfig = prevConfig.map((sc) => {
        if (sc.key === key) {
          const newOrder =
            sc.order === 'asc' ? 'desc' : sc.order === 'desc' ? 'none' : 'asc';
          return { ...sc, order: newOrder };
        }
        return { ...sc, order: 'none' }; // Reset other sort orders
      });
      // Apply sort to data
      const activeSort = newConfig.find((sc) => sc.order !== 'none');
      if (activeSort) {
        const sortedData = [...initialAnniversaryData].sort((a, b) => {
          if (a[activeSort.key] < b[activeSort.key]) {
            return activeSort.order === 'asc' ? -1 : 1;
          }
          if (a[activeSort.key] > b[activeSort.key]) {
            return activeSort.order === 'asc' ? 1 : -1;
          }
          return 0;
        });
        setData(sortedData);
      } else {
        setData(initialAnniversaryData); // Reset to initial if no sort
      }
      return newConfig;
    });
  };

  const getSortIcon = (key: SortKey) => {
    const config = sortConfig.find((sc) => sc.key === key);
    if (config?.order === 'asc') return <UpOutline fontSize={12} />;
    if (config?.order === 'desc') return <DownOutline fontSize={12} />;
    // Default icon (both up and down, or a neutral one)
    return (
      <Space direction="vertical" style={{ gap: 0 }}>
        <UpOutline fontSize={8} />
        <DownOutline fontSize={8} />
      </Space>
    );
  };

  return (
    <div className={styles.pageContainer}>
      <NavBar
        onBack={() => console.log('Navigate back')}
        backArrow={<LeftOutline />}
        left={<AppstoreOutline fontSize={20} style={{ marginLeft: '8px' }} />}
        right={
          <Space>
            <MoreOutline fontSize={20} />
            <CloseOutline fontSize={20} />
          </Space>
        }
        className={styles.navBar}
      >
        纪念日详情
      </NavBar>

      <div className={styles.filtersContainer}>
        <Button className={styles.filterButton}>
          {dateRange} <DownOutline fontSize={12} />
        </Button>
        <Dropdown>
          <Dropdown.Item key="type" title="纪念日类型">
            <div style={{ padding: 12 }}>
              <Button
                block
                color="primary"
                size="small"
                onClick={() => setAnniversaryType(null)}
              >
                全部类型
              </Button>
              <Button
                block
                size="small"
                style={{ marginTop: 8 }}
                onClick={() => setAnniversaryType('入职纪念日')}
              >
                入职纪念日
              </Button>
              <Button
                block
                size="small"
                style={{ marginTop: 8 }}
                onClick={() => setAnniversaryType('生日')}
              >
                生日
              </Button>
              <Button
                block
                size="small"
                style={{ marginTop: 8 }}
                onClick={() => setAnniversaryType('家属生日')}
              >
                家属生日
              </Button>
            </div>
          </Dropdown.Item>
        </Dropdown>
        <Badge content="1" color="purple" style={{ '--right': '10px', '--top': '10px' }} />
        <Badge content="4.8" color="red" style={{ '--right': '-15px', '--top': '10px' }} />
      </div>

      <div className={styles.listHeader}>
        <div className={styles.headerItem} onClick={() => handleSort('name')}>
          姓名 {getSortIcon('name')}
        </div>
        <div className={styles.headerItem} onClick={() => handleSort('date')}>
          日期 {getSortIcon('date')}
        </div>
        <div className={styles.headerItem}>纪念日类型</div>
      </div>

      <List className={styles.anniversaryList}>
        {data
          .filter((item) => !anniversaryType || item.type === anniversaryType)
          .map((item) => (
            <List.Item key={item.id} className={styles.listItem}>
              <Grid columns={3} gap={8}>
                <Grid.Item className={styles.itemName}>
                  {item.name}
                  {item.tag && (
                    <Tag color="danger" fill="outline" className={styles.nameTag}>
                      {item.tag}
                    </Tag>
                  )}
                </Grid.Item>
                <Grid.Item className={styles.itemDate}>{item.date}</Grid.Item>
                <Grid.Item className={styles.itemType}>{item.type}</Grid.Item>
              </Grid>
            </List.Item>
          ))}
      </List>
    </div>
  );
};

export default Page8;
