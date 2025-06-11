/*
 * @Description: 路由配置
 * @Author: dnh
 * @Date: 2022-06-13 09:41:39
 * @LastEditors: dnh
 * @FilePath: \src\router\config.tsx
 */
import { lazy, Suspense, ReactNode } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import { Spin } from 'antd';
import AppLayout from '@/layout';
import styles from './index.less';

const Home = lazy(() => import('@/view/home/echarts'));
const Page2 = lazy(() => import('@/view/page2'));
const Page3 = lazy(() => import('@/view/page3'));
const Page4 = lazy(() => import('@/view/page4'));
const Page5 = lazy(() => import('@/view/page5'));
const Page6 = lazy(() => import('@/view/page6'));
const Page7 = lazy(() => import('@/view/page7'));
const Page8 = lazy(() => import('@/view/page8'));

const lazyLoad = (children: ReactNode, needSpin = true): ReactNode => {
  return (
    <Suspense
      fallback={
        needSpin ? <Spin className={styles.loading} tip="正在卖力加载中..." /> : null
      }
    >
      {children}
    </Suspense>
  );
};

const children = [
  {
    path: 'home',
    element: lazyLoad(<Home />),
  },
  {
    path: 'page2',
    element: lazyLoad(<Page2 />),
  },
  {
    path: 'page3',
    element: lazyLoad(<Page3 />),
  },
  {
    path: 'page4',
    element: lazyLoad(<Page4 />),
  },
  {
    path: 'page5',
    element: lazyLoad(<Page5 />),
  },
  {
    path: 'page6',
    element: lazyLoad(<Page6 />),
  },
  {
    path: 'page7',
    element: lazyLoad(<Page7 />),
  },
  {
    path: 'page8',
    element: lazyLoad(<Page8 />),
  },
  {
    path: '/',
    element: <Navigate to="/home" />, // 路由重定向
  },
];

const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />, // 指定路由渲染容器
    children,
  },
  {
    path: '*',
    element: <Navigate to="/home" />, // 路由重定向
  },
];

export default routes;
