<template>
    <div id="app">
      <!-- 日历展示 -->
      <div class="chart-container">
        <h2>任务分配日历</h2>
        <VueCal
          :events="calendarEvents"
          :language="'zh'"
          :cell-height="50"
          :event-style="getEventStyle" 
        />
      </div>
      
      <!-- 折线图展示 -->
      <div class="chart-container">
        <h2>任务分配折线图</h2>
        <div ref="lineChart" style="width: 100%; height: 400px;"></div>
      </div>
  
      <!-- 树图展示 -->
      <div class="chart-container">
        <h2>任务层级树图</h2>
        <div ref="treeChart" style="width: 100%; height: 400px;"></div>
      </div>
    </div>
  </template>
  
  <script>
  // 导入 VueCal 和 ECharts
  import VueCal from 'vue-cal'
  import 'vue-cal/dist/vuecal.css'
  import * as echarts from 'echarts'
  import taskData from './data/tasks.json' 
  
  export default {
    name: 'App',
    components: {
      VueCal,
    },
    data() {
      return {
        // 从 JSON 文件加载任务数据
        calendarEvents: taskData.map(task => ({
          start: task.start,
          end: task.end,
          title: task.title,
          colorClass: task.colorClass, // 事件颜色
        })),
        // 示例的折线图数据，按需调整
        lineChartData: {
          xAxisData: taskData.map(task => task.start),
          seriesData: taskData.map(task => task.priority === '高' ? 100 : 70), // 根据任务优先级设定完成度
        },
        treeData: {
          name: '任务 A',
          children: [
            { name: '子任务 1' },
            { name: '子任务 2', children: [
                { name: '子任务 2.1' },
                { name: '子任务 2.2' }
              ]
            },
          ],
        },
      }
    },
    mounted() {
      this.initLineChart()
      this.initTreeChart()
    },
    methods: {
      getEventStyle(event) {
        return {
          backgroundColor: this.getEventColor(event),
        }
      },
  
      getEventColor(event) {
        switch (event.colorClass) {
          case 'event-green':
            return '#4caf50';
          case 'event-blue':
            return '#2196F3';
          case 'event-yellow':
            return '#FFC107';
          case 'event-red':
            return '#FF5722';
          default:
            return '#4caf50'; // 默认绿色
        }
      },
  
      initLineChart() {
        const lineChart = echarts.init(this.$refs.lineChart)
        const option = {
          xAxis: {
            type: 'category',
            data: this.lineChartData.xAxisData,
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              data: this.lineChartData.seriesData,
              type: 'line',
              smooth: true,
              lineStyle: {
                color: '#4caf50',
              },
              symbol: 'circle',
              symbolSize: 8,
            },
          ],
        }
        lineChart.setOption(option)
      },
  
      initTreeChart() {
        const treeChart = echarts.init(this.$refs.treeChart)
        const option = {
          tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove',
          },
          series: [
            {
              type: 'tree',
              data: [this.treeData],
              top: '5%',
              left: '10%',
              bottom: '5%',
              right: '20%',
              symbolSize: 7,
              label: {
                position: 'right',
                verticalAlign: 'middle',
                fontSize: 12,
              },
              itemStyle: {
                color: '#4caf50',
                borderColor: '#fff',
                borderWidth: 1,
              },
              emphasis: {
                itemStyle: {
                  color: '#ff7043',
                },
                label: {
                  color: '#fff',
                },
              },
              leaves: {
                itemStyle: {
                  color: '#4caf50',
                },
              },
            },
          ],
        }
        treeChart.setOption(option)
      },
    },
  }
  </script>
  
  <style scoped>
  .chart-container {
    margin-bottom: 30px;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 15px;
  }
  
  /* 为不同类型的事件添加颜色 */
  .event-green {
    background-color: #4caf50 !important; /* 绿色 */
  }
  
  .event-blue {
    background-color: #2196F3 !important; /* 蓝色 */
  }
  
  .event-yellow {
    background-color: #FFC107 !important; /* 黄色 */
  }
  
  .event-red {
    background-color: #FF5722 !important; /* 红色 */
  }
  
  .event-purple {
    background-color: #9C27B0 !important; /* 紫色 */
  }
  
  .event-grey {
    background-color: #607D8B !important; /* 灰色 */
  }
  </style>
  