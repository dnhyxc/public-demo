import { FC, useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import style from './guide.less';
import { Button } from 'antd-mobile';
import Joyride, { Step } from 'react-joyride';
import GuideStep from './guideStep.jpg';
import GuideStepDown from './guideStepDown.jpg';
import GuidBg from './guideBg.jpg';

interface PropTypes {
  run: boolean;
  steps: Step[];
  skipCb: () => void;
}
const Guide: FC<PropTypes> = (props) => {
  const { run, steps, skipCb } = props;
  const stepOneNormalContent = [
    // 普通员工
    { title: '数字人力美眉', subTitle: 'AI赋能，全方位解决人事场景问题' },
    { title: '高频功能定制', subTitle: '自定义常用功能，高频操作快捷触达' },
    { title: '流程中心优化', subTitle: '直观高效，切换便捷' },
    { title: '功能触达便捷', subTitle: '分类清晰，容易查找' },
    { title: '个人中心拆分', subTitle: '根据移动端使用习惯优化入口' },
  ];
  const renderContent = () => {
    return (
      <div className={style.stepOne}>
        <div className={style.title}>欢迎进入新版人力门户</div>
        <div className={style.subTitle}>全新数字化办公体验</div>
        {stepOneNormalContent.map((item) => (
          <div className={style.itemWrap} key={item.title}>
            <span>你好</span>
            <div className={style.itemRight}>
              <div className={style.itemTop}>{item.title}</div>
              <div className={style.itemBottom}>{item.subTitle}</div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  const renderSubTitle = useCallback((content: string) => {
    return content.includes('<br/>')
      ? content.split('<br/>').map((item) => <div>{item}</div>)
      : content;
  }, []);
  // const [background, setBackground] = useState(GuideStep)
  const boxRef = useRef<any>(null);
  const cardRef = useRef<any>(null);

  useLayoutEffect(() => {
    const handleScroll = () => {
      // console.log(parseInt(cardRef.current?.top),parseInt(boxRef.current?.top))
      if (run) {
        const card = document.querySelector('.__floater__open')?.getBoundingClientRect();
        const box = document
          .querySelector('.react-joyride__spotlight')
          ?.getBoundingClientRect();
        if (card && box) {
          // console.log(222, card.top, box.top,  card.top > box.top)
          // setBackground(card.top < box.top ? GuideStepDown : GuideStep)
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 先执行一次，防止箭头大小为设置成功
  const tooltipComponent = ({
    index,
    step,
    isLastStep,
    size,
    primaryProps,
    skipProps,
    tooltipProps,
  }) => {
    isLastStep && showArrow();
    cardRef.current = document.querySelector('.__floater__open')?.getBoundingClientRect();
    boxRef.current = document
      .querySelector('.react-joyride__spotlight')
      ?.getBoundingClientRect();
    let image = GuideStep;
    if (cardRef.current && boxRef.current) {
      // console.log(parseInt(cardRef.current.top),parseInt(boxRef.current.top))
      if (cardRef.current.top < boxRef.current.top) {
        image = GuideStepDown;
      }
    }

    const polygon = document.querySelector('.__floater__arrow polygon');
    const changeArrowSize = (polygon: any) => {
      if (polygon) {
        const points = polygon.getAttribute('points');
        console.log('----', points);
      }
    };
    useEffect(() => {
      changeArrowSize(polygon);
      const onScroll = () => {
        changeArrowSize(polygon);
      }; // 使用防抖处理滚动事件
      window.addEventListener('scroll', onScroll);
    }, [polygon]);

    return (
      <div
        {...tooltipProps}
        className={[style.guideWrap, index === 0 ? '' : style.otherStep].join(' ')}
        style={{ backgroundImage: `url(${index === 0 ? GuidBg : image})` }}
      >
        {index === 0 ? (
          renderContent()
        ) : (
          <div className={style.stepWrap}>
            <div className={style.stepTitle}>{step.title}</div>
            <div className={style.stepSubTitle}>{renderSubTitle(step.content)}</div>
          </div>
        )}
        <div className={style.toolbox}>
          <div className={style.toolStep}>
            {index + 1}/{size}
          </div>
          <div className={style.toolRight}>
            <div className={style.toolSkip} onClick={skipCb}>
              {isLastStep ? '知道了' : '跳过'}
            </div>
            <Button className={style.toolNext} {...primaryProps}>
              {isLastStep ? '开启AI全新体验' : '下一步'}
            </Button>
          </div>
        </div>
      </div>
    );
  };
  return (
    <Joyride
      steps={steps}
      // 这里如果需要记录用户是否已经完成过引导，就自己根据后端记录的用户完成引导状态手动控制 run 为 false，这样该用户下次进来就不会再显示引导了
      run={run}
      tooltipComponent={tooltipComponent}
      continuous // 允许连续步骤
      showProgress // 显示进度
      showSkipButton // 显示跳过按钮
      disableOverlayClose
      locale={{ skip: '跳过' }}
      spotlightPadding={4}
      // disableScrolling
      scrollOffset={100}
      styles={{
        options: {
          arrowColor: '#E03A53',
          primaryColor: '#ff6b6b', // 自定义主色调
          zIndex: 1000, // 确保在最上层
        },
      }}
    />
  );
};

export default Guide;
