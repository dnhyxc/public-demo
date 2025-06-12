// 修改导入方式
import * as echarts from 'echarts/core';
import { PieChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GraphicComponent
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import type { ECharts, PieSeriesOption } from 'echarts';

// 注册必须的组件
echarts.use([
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GraphicComponent,
  CanvasRenderer
]);

export default echarts;
