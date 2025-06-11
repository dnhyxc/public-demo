import { useState, useRef, useEffect, useCallback } from 'react';
import './index.css';
import Guide from './guide';
const WeChatVoiceRecorder = () => {
  const steps = [
    {
      target: '.feature-1',
      placement: 'center',
      title: '',
      disableBeacon: true, // 这里是开启自动引导的关键属性
      content: '',
    },
    {
      target: '.feature-2',
      // placement: 'bottom',
      title: '高频功能定制',
      content: '增加常用功能，可自定义配置，高频操作快捷触达',
    },
    {
      target: '.feature-3',
      // placement: 'top',
      title: '流程中心优化',
      content: '申请/待办入口首页直观呈现，帮助您快速了解已申请流程进展',
    },
    {
      target: '.feature-4',
      // placement: 'top',
      title: '功能触达便捷',
      content: '功能和专业系统在这里而且分组啦～更易查找',
    },
    {
      target: '.feature-5',
      // placement: 'top',
      title: '个人中心拆分',
      content: '根据移动端使用习惯优化入口，拆分为独立菜单',
    },
    {
      target: '.feature-6',
      // placement: 'bottom',
      title: '数字人力美眉',
      content: '首页入口点击，或在所有页面下拉均可唤起我',
    },
  ];
  useEffect(() => {
    setRun(true);
  }, []);

  const [run, setRun] = useState(false);
  return (
    <div id="mainApp" style={{ height: '100vh', background: '#fff' }}>
      {run && <Guide steps={steps} run={run} skipCb={() => setRun(false)} />}
      <div className="feature feature-1">功能区域 1</div>
      <div className="feature feature-2">功能区域 2</div>
      <div className="feature feature-3">功能区域 3</div>
      <div className="feature feature-4">功能区域 4</div>
      <div className="feature feature-5">功能区域 5</div>
      <div className="feature feature-6">功能区域 6</div>

      {/* <Joyride
        steps={steps}
        // 这里如果需要记录用户是否已经完成过引导，就自己根据后端记录的用户完成引导状态手动控制 run 为 false，这样该用户下次进来就不会再显示引导了
        run
        tooltipComponent={tooltipComponent}
        continuous // 允许连续步骤
        showProgress // 显示进度
        showSkipButton // 显示跳过按钮
        styles={{
          options: {
            arrowColor: '#E03A53',
            primaryColor: '#ff6b6b', // 自定义主色调
            zIndex: 1000, // 确保在最上层
          },
        }}
      /> */}

      <div
        className="chatFooters"
        style={{ position: 'fixed', left: 0, bottom: 0, width: '100%' }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <textarea
            style={{ width: '90%', height: '34px', fontSize: '16px0' }}
            placeholder="你可以问我任何问题"
          />
        </div>
        <h1>测试</h1>
      </div>
    </div>
  );
};

export default WeChatVoiceRecorder;
