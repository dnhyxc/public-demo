/*
 * @Description: 布局组件
 * @Author: dnh
 * @Date: 2022-06-13 09:41:39
 * @LastEditors: dnh
 * @FilePath: \src\layout\index.tsx
 */
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import styles from './index.less';

const { Content } = Layout;

const AppLayout = () => {
  return (
    <Layout className={styles.layout}>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default AppLayout;
