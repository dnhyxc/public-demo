import React, { useEffect, useRef } from 'react';
// @ts-ignore
import echarts from './echarts-import';
import styles from './index.less';

const Page4: React.FC = () => {
  const chartRef1 = useRef<HTMLDivElement | null>(null);
  const chartRef2 = useRef<HTMLDivElement | null>(null);

  let chartInstance1: echarts.ECharts | null = null;
  let chartInstance2: echarts.ECharts | null = null;

  const setLabelBeforeLine = (color: string) => {
    return {
      formatter: '{line|}{name|{b}}\n{value|{c}} {unit|人}',
      rich: {
        line: {
          width: 3,
          height: 12,
          borderRadius: 2,
          backgroundColor: color,
        },
      },
    };
  };

  const getChartOption = (title: string) => ({
    tooltip: {
      show: false,
      // trigger: 'item',
      // formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
    title: {
      // text: title,
      left: '-5px',
      top: '-5px',
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        padding: [0, 0, 50, 0], // 上右下左
      },
    },
    legend: {
      show: false,
    },
    series: [
      {
        type: 'pie',
        radius: ['50px', '60px'],
        center: ['50%', '50%'],
        data: [
          {
            value: 325,
            name: '校招',
            lineColor: '#4B7BE5',
            line: {
              backgroundColor: '#4B7BE5', // 竖线的颜色,
            },
            itemStyle: {
              color: '#4B7BE5',
            },
            label: setLabelBeforeLine('#4B7BE5'),
          },
          {
            value: 272,
            name: '社招',
            itemStyle: { color: '#E86452' },
            label: setLabelBeforeLine('#E86452'),
          },
          {
            value: 150,
            name: '编外转正',
            itemStyle: { color: '#d3bc63' },
            label: setLabelBeforeLine('#d3bc63'),
          },
        ],
        label: {
          // 标签的位置，设置为外部
          position: 'outside',
          // 标签对齐方式，对齐到边缘
          alignTo: 'edge',
          // 标签格式化，使用富文本显示名称和时间
          // formatter: '{line|}{name|{b}}\n{value|{c}} {unit|人}',
          // 标签之间的最小间距
          minMargin: 5,
          // 标签与图形边缘的距离
          edgeDistance: 15,
          // 标签文本的行高
          lineHeight: 25,
          // 添加竖线标识
          // 只给name设置左边线
          rich: {
            // 名称文本样式
            name: {
              fontSize: 14,
              color: '#333',
              padding: [0, 0, 0, 5], // 上右下左
            },
            // 数值文本样式
            value: {
              fontSize: 16,
              fontWeight: 'bold',
              color: '#333',
            },
            unit: {
              fontSize: 14,
              color: '#999',
            },
          },
        },
        labelLine: {
          // 第一段引导线长度，从圆形边缘开始
          length: 35,
          // 第二段引导线长度，连接到文字
          length2: 0,
          // 控制引导线与圆形边缘的最小距离
          minTurnAngle: 10,
          // 控制引导线的平滑度
          // smooth: 0.2,
          // 控制引导线与圆形表面的最大角度
          maxSurfaceAngle: 60,
        },
        labelLayout(params: {
          labelRect: { x: number; width: number };
          labelLinePoints: number[][];
        }) {
          const isLeft = params.labelRect.x < chartInstance1!.getWidth() / 2;
          const points = params.labelLinePoints;
          // 计算第一个点到第二个点的方向向量
          const dx = points[1][0] - points[0][0];
          const dy = points[1][1] - points[0][1];
          // 计算向量的长度
          const length = Math.sqrt(dx * dx + dy * dy);
          // 单位向量
          const ux = dx / length;
          const uy = dy / length;
          // 沿着方向向量移动起始点10像素
          points[0][0] += ux * 10;
          points[0][1] += uy * 10;
          // 调整文字连接点的位置
          points[2][0] = isLeft
            ? params.labelRect.x
            : params.labelRect.x + params.labelRect.width;
          return {
            labelLinePoints: points,
          };
        },
        emphasis: {
          disabled: true,
        },
      },
    ],
    graphic: [
      {
        type: 'text',
        left: 'center',
        top: '40%', // 调整位置使其在环形内部居中
        style: {
          text: '453', // 总人数，可以动态计算 sum(data.value)
          textAlign: 'center',
          fill: '#333',
          fontSize: 25,
          fontWeight: 'bold',
        },
      },
      {
        type: 'text',
        left: 'center',
        top: '55%', // 调整位置使其在环形内部居中
        style: {
          text: '总人数',
          textAlign: 'center',
          fill: '#666',
          fontSize: 14,
        },
      },
    ],
  });

  useEffect(() => {
    if (chartRef1.current) {
      chartInstance1 = echarts.init(chartRef1.current);
      const option = getChartOption('本年度新招聘员工人数');
      chartInstance1.setOption(option);
    }

    if (chartRef2.current) {
      chartInstance2 = echarts.init(chartRef2.current);
      chartInstance2.setOption(getChartOption('本年度离职员工人数'));
    }

    const resizeCharts = () => {
      chartInstance1?.resize();
      chartInstance2?.resize();
    };

    window.addEventListener('resize', resizeCharts);

    return () => {
      chartInstance1?.dispose();
      chartInstance2?.dispose();
      window.removeEventListener('resize', resizeCharts);
    };
  }, []);

  const renderStats = () => (
    <div className={styles.statsContainer}>
      <div className={styles.statItem}>
        <span className={styles.label}>重点院校人数</span>
        <span className={styles.value}>
          29<span className={styles.unit}>人</span>
        </span>
      </div>
      <div className={styles.statItem}>
        <span className={styles.label}>Stem占比</span>
        <span className={styles.value}>
          3<span className={styles.unit}>%</span>
        </span>
      </div>
      <div className={styles.statItem}>
        <span className={styles.label}>男女比例</span>
        <span className={styles.value}>58:42</span>
      </div>
    </div>
  );

  return (
    <div className={styles.page3Container}>
      <div className={styles.header}>
        <div className={styles.tab}>1</div>
        <span className={styles.title}>招聘管理</span>
      </div>

      <div className={styles.chartsContainer}>
        <div className={styles.chartWrapper}>
          <div ref={chartRef1} style={{ height: '250px', width: '100%' }} />
          {/* <div className={styles.centerText}>
            <span className={styles.number}>453</span>
            <span className={styles.label}>总人数</span>
          </div> */}
          {/* <div className={styles.chartLabels}>
            <div className={styles.labelItem}>
              <span className={styles.dot} style={{ backgroundColor: '#4B7BE5' }} />
              <span className={styles.text}>校招 325人</span>
            </div>
            <div className={styles.labelItem}>
              <span className={styles.dot} style={{ backgroundColor: '#E86452' }} />
              <span className={styles.text}>社招 272人</span>
            </div>
          </div> */}
          {renderStats()}
        </div>

        <div className={styles.chartWrapper}>
          <div ref={chartRef2} style={{ height: '250px', width: '100%' }} />
          {/* <div className={styles.centerText}>
            <span className={styles.number}>453</span>
            <span className={styles.label}>总人数</span>
          </div> */}
          {/* <div className={styles.chartLabels}>
            <div className={styles.labelItem}>
              <span className={styles.dot} style={{ backgroundColor: '#4B7BE5' }} />
              <span className={styles.text}>校招 325人</span>
            </div>
            <div className={styles.labelItem}>
              <span className={styles.dot} style={{ backgroundColor: '#E86452' }} />
              <span className={styles.text}>社招 272人</span>
            </div>
          </div> */}
          {renderStats()}
        </div>
      </div>
    </div>
  );
};

export default Page4;
