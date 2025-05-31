// src/App.js
import React, { useState } from 'react';
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';
import './index.css';
import { Button } from 'antd';

const App = () => {
  const [runTour, setRunTour] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const steps = [
    {
      target: '.app-logo',
      title: '欢迎使用我们的应用',
      content: '这是您的新手引导之旅，我们将带您了解主要功能。',
      placement: 'center',
      disableBeacon: true,
    },
    {
      target: '.dashboard-button',
      title: '仪表板',
      content: '点击这里可以查看您的数据概览和关键指标。',
      placement: 'bottom',
    },
    {
      target: '.analytics-button',
      title: '数据分析',
      content: '在这里您可以查看详细的数据分析图表和报告。',
      placement: 'bottom',
    },
    {
      target: '.user-button',
      title: '用户管理',
      content: '管理您的用户账户和权限设置。',
      placement: 'bottom',
    },
    {
      target: '.settings-button',
      title: '系统设置',
      content: '自定义应用设置以满足您的需求。',
      placement: 'bottom',
    },
    {
      target: '.notification-button',
      title: '通知中心',
      content: '查看您的所有通知和消息提醒。',
      placement: 'bottom',
    },
    {
      target: '.stats-card',
      title: '数据卡片',
      content: '这里显示关键业务指标，帮助您快速了解业务状态。',
      placement: 'right',
    },
    {
      target: '.chart-container',
      title: '数据图表',
      content: '可视化数据帮助您更好地理解趋势和模式。',
      placement: 'top',
    },
    {
      target: '.help-button',
      title: '帮助中心',
      content: '任何时候需要帮助，点击这里即可获得支持。',
      placement: 'left',
    },
    {
      target: 'body',
      title: '导览完成！',
      content: '您已成功完成新手引导，现在可以开始使用应用了！',
      placement: 'center',
    }
  ];

  const handleJoyrideCallback = (data) => {
    const { action, index, status, type } = data;

    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRunTour(false);
      setStepIndex(0);
    } else if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
      // 模拟异步加载
      if (index === 4) {
        setIsLoading(true);
        setTimeout(() => {
          setStepIndex(index + 1);
          setIsLoading(false);
        }, 1500);
      } else {
        setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1));
      }
    }
  };

  return (
    <div className="app">
      <Joyride
        steps={steps}
        run={runTour}
        stepIndex={stepIndex}
        callback={handleJoyrideCallback}
        continuous
        showSkipButton
        showProgress
        disableScrolling
        styles={{
          options: {
            arrowColor: '#fff',
            backgroundColor: '#fff',
            primaryColor: '#6a5acd',
            textColor: '#333',
            overlayColor: 'rgba(0, 0, 0, 0.5)',
            beaconSize: 36,
            zIndex: 1000,
          },
          tooltipContainer: {
            textAlign: 'left',
          },
          buttonNext: {
            backgroundColor: '#6a5acd',
          },
          buttonBack: {
            color: '#6a5acd',
          }
        }}
      />

      {/* 顶部导航栏 */}
      <header className="app-header">
        <div className="app-logo">
          <div className="logo-circle">A</div>
          <span>应用名称</span>
        </div>
        <div className="header-actions">
          <Button className="notification-button">
            FiBell
            <span className="badge">3</span>
          </Button>
          <Button className="help-button" onClick={() => setRunTour(true)}>
            FiHelpCircle
          </Button>
          <div className="user-avatar">
            FiUser
          </div>
        </div>
      </header>

      {/* 主内容区 */}
      <div className="app-container">
        {/* 侧边栏 */}
        <nav className="sidebar">
          <Button className="dashboard-button active">
            <span>仪表板</span>
          </Button>
          <Button className="analytics-button">
            <span>数据分析</span>
          </Button>
          <Button className="user-button">
            <span>用户管理</span>
          </Button>
          <Button className="settings-button">
            <span>系统设置</span>
          </Button>
        </nav>

        {/* 主内容 */}
        <main className="main-content">
          <div className="content-header">
            <h1>仪表板</h1>
            <Button className="start-tour-btn" onClick={() => { setRunTour(true); setStepIndex(0); }}>
              FiHelpCircle 开始导览
            </Button>
          </div>

          {/* 数据卡片 */}
          <div className="stats-container">
            <div className="stats-card">
              <div className="card-icon" style={{ background: '#ffd6e0' }} />
              <div>
                <h3>用户总数</h3>
                <p>2,548</p>
                <span className="positive">↑ 12.5%</span>
              </div>
            </div>

            <div className="stats-card">
              <div className="card-icon" style={{ background: '#d1f0ff' }} />

              <div>
                <h3>消息</h3>
                <p>1,248</p>
                <span className="positive">↑ 8.2%</span>
              </div>
            </div>

            <div className="stats-card">
              <div className="card-icon" style={{ background: '#d9f7d0' }} />
              <div>
                <h3>转化率</h3>
                <p>24.8%</p>
                <span className="negative">↓ 2.1%</span>
              </div>
            </div>

            <div className="stats-card">
              <div className="card-icon" style={{ background: '#f0e3ff' }}>
                FiSettings
              </div>
              <div>
                <h3>完成率</h3>
                <p>86.5%</p>
                <span className="positive">↑ 5.3%</span>
              </div>
            </div>
          </div>

          {/* 图表容器 */}
          <div className="chart-container">
            <div className="chart-header">
              <h2>月度数据趋势</h2>
              <div className="chart-legend">
                <div className="legend-item">
                  <span className="color-dot" style={{ background: '#6a5acd' }} />
                  <span>2023年</span>
                </div>
                <div className="legend-item">
                  <span className="color-dot" style={{ background: '#1890ff' }} />
                  <span>2024年</span>
                </div>
              </div>
            </div>
            <div className="chart-placeholder" />
          </div>

          {/* 模拟加载状态 */}
          {isLoading && (
            <div className="loading-overlay">
              <div className="loading-spinner" />
              <p>正在加载下一步...</p>
            </div>
          )}
        </main>
      </div>

      <footer className="app-footer">
        <p>© 2023 应用名称. 保留所有权利。</p>
      </footer>
    </div>
  );
};

export default App;
