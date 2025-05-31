import { useState, useRef, useEffect, useCallback } from 'react';
import './index.css';
import { Toast, Modal, Popup, Button } from 'antd-mobile';
import { flushSync } from 'react-dom';
import Joyride from 'react-joyride';
// import Guide from './guide';
// import TestImg from './bg3.jpg';
// import './guide.css';

const WeChatVoiceRecorder = () => {
  const joyrideRef = useRef(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [curIndex, setCurIndex] = useState(0);

  const handleSkip = useCallback(() => {
    // setRun(false)
  }, []);

  const renderContent = () => {
    return (
      <div>
        <h1 style={{ color: '#000' }}>高频功能定制</h1>
        <h2 style={{ color: '#000' }}>添加常用功能，i定义</h2>
      </div>
    );
  };

  const changeArrowSize = (polygon) => {
    if (polygon) {
      // 获取 points 属性值并替换 32 为 20，16 为 10
      const points = polygon
        .getAttribute('points')
        .replace(/32/g, '20')
        .replace(/16/g, '10');
      polygon.setAttribute('points', points);
    }
  };

  const tooltipComponent = ({
    index,
    step,
    isLastStep,
    size,
    primaryProps,
    skipProps,
    tooltipProps,
  }) => {
    console.log(
      '--',
      index,
      step.placement.startsWith('top'),
      step.placement.startsWith('bottom')
    );

    const polygon = document.querySelector('.__floater__arrow polygon');

    // 先执行一次，防止箭头大小为设置成功
    changeArrowSize(polygon);

    useEffect(() => {
      const onScroll = () => {
        changeArrowSize(polygon);
      };
      // 使用防抖处理滚动事件
      window.addEventListener('scroll', onScroll);

      return () => {
        window.removeEventListener('scroll', onScroll);
      };
    }, [step.placement, polygon]);

    return (
      <div
        {...tooltipProps}
        style={{
          width: '280px',
          height: 'auto',
          padding: '12px 20px',
          // backgroundImage: `url(${TestImg})`,
          background: '#E03A53',
          backgroundSize: 'contain',
          borderRadius: '10px',
          position: 'relative',
        }}
      >
        {renderContent()}
        {/* <div
          style={{
            position: 'absolute',
            [step.placement.startsWith('top') ? 'bottom' : 'top']: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            // borderLeft: '10px solid transparent',
            // borderRight: '10px solid transparent',
            // borderTop: step.placement.startsWith('top')
            //   ? '10px solid #E03A53'
            //   : '10px solid transparent',
            // borderBottom: step.placement.startsWith('bottom')
            //   ? '10px solid #E03A53'
            //   : '10px olid transparent',
          }}
        /> */}
        <div className="toolbox">
          <div className="toolStep">
            {index + 1}/{size}
          </div>
          <div className="toolRight">
            <div className="toolSkip" onClick={handleSkip}>
              {isLastStep ? '知道了' : '跳过'}
            </div>
            <Button className="toolNext" {...primaryProps}>
              {isLastStep ? '开启AI全新体验' : '下一步'}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const steps = [
    {
      target: '.feature-1',
      placement: 'bottom',
      disableBeacon: true, // 这里是开启自动引导的关键属性
    },
    {
      target: '.feature-2',
      placement: 'bottom',
    },
    {
      target: '.feature-3',
      placement: 'bottom',
    },
  ];

  return (
    <div id="mainApp" style={{ height: '100vh', background: '#fff' }}>
      <div className="feature feature-1">功能区域 1</div>
      <div className="feature feature-2">功能区域 2</div>
      <div className="feature feature-3">功能区域 3</div>
      <Joyride
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
      />

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
