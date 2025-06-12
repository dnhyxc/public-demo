import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const MyPieChartComponent = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
        legend: {
          show: false, // 根据图片，图例似乎没有显示，而是直接在图上标注
        },
        series: [
          {
            name: '人员构成',
            type: 'pie',
            radius: ['50%', '70%'], // 设置为环形图
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2,
            },
            label: {
              show: false,
              position: 'center', // 中心标签默认不显示，我们通过graphic来绘制中心文字
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '20',
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 325, name: '校招', itemStyle: { color: '#5470c6' } }, // 蓝色
              { value: 272, name: '社招', itemStyle: { color: '#ee6666' } }, // 红色
              { value: 18, name: '编外转正', itemStyle: { color: '#fac858' } }, // 黄色
            ],
          },
        ],
        graphic: [
          {
            type: 'text',
            left: 'center',
            top: '45%', // 调整位置使其在环形内部居中
            style: {
              text: '453', // 总人数，可以动态计算 sum(data.value)
              textAlign: 'center',
              fill: '#333',
              fontSize: 24,
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
      };

      // 根据图片样式，我们需要自定义标签来显示在外部并用引线连接
      // ECharts 5 提供了更丰富的标签配置，这里我们用rich文本格式化标签
      option.series[0].label = {
        show: true,
        position: 'outside',
        formatter: (params: { name: string; value: number }) => {
          return `{name|${params.name}}\n{value|${params.value}人}`;
        },
        rich: {
          name: {
            fontSize: 12,
            color: '#333',
            padding: [0, 0, 5, 0], // 上右下左
          },
          value: {
            fontSize: 14,
            fontWeight: 'bold',
            color: '#333',
          },
        },
      };
      option.series[0].labelLine = {
        show: true,
        length: 15,
        length2: 10,
        smooth: true,
      };

      myChart.setOption(option);

      // 监听窗口大小变化，自适应图表
      const resizeHandler = () => {
        myChart.resize();
      };
      window.addEventListener('resize', resizeHandler);

      // 组件卸载时销毁图表实例和移除监听
      return () => {
        myChart.dispose();
        window.removeEventListener('resize', resizeHandler);
      };
    }
  }, []);

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }}></div>;
};

export default MyPieChartComponent;
