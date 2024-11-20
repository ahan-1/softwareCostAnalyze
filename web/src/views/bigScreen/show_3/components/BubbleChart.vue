<script>
/**
 * 功能点气泡图
 */
import { defineComponent, ref, reactive, onMounted } from 'vue';
import EchartContainer from '@/components/echartContainer.vue';
import * as echarts from 'echarts';
import { getModuleInfo } from '@/api/EvaluationResult/index.ts'; // 假设这是调用接口的方法

export default defineComponent({
  components: {
    EchartContainer,
  },
  props: {
    dataInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const EchartContainerRef = ref(); // 图表容器实例
    const dataContainer = reactive({
      loading: false,
      moduleData: [],
    });

    const fetchProjectData = async () => {
      dataContainer.loading = true;

      try {
        // 从 localStorage 获取 project_id
        const projectId = localStorage.getItem('project_id');

        if (!projectId) {
          console.error('未找到项目 ID，请先选择项目');
          dataContainer.loading = false;
          return;
        }

        // 调用接口获取数据
        const response = await getModuleInfo(Number(projectId));
        if (response.isOk && response.project) {
          const modules = response.project.map((module) => ({
            module_name: module.module_name,
            ufp: module.ufp,
            cost: Math.random() * 100, // 随机生成成本
            value: Math.random() * 100, // 随机生成价值
          }));
          dataContainer.moduleData = modules; // 保存数据
          updateChart(modules);
        }
      } catch (error) {
        console.error('获取项目数据失败', error);
      } finally {
        dataContainer.loading = false;
      }
    };

    const updateChart = (modules) => {
      if (!EchartContainerRef.value) return;

      // 柱状图配置
      const chartData = modules.map((module) => [
        module.cost, // x: 成本
        module.value, // y: 价值
        module.ufp, // 气泡大小
        module.module_name, // 模块名
      ]);

      const option = {
        backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [
          { offset: 0, color: '#f7f8fa' },
          { offset: 1, color: '#cdd0d5' },
        ]),
        title: {
          text: '据模块划分的功能点气泡图',
          left: '5%',
          top: '3%',
        },
        tooltip: {
          trigger: 'item',
          formatter: (param) => {
            return `模块名: ${param.data[3]}<br/>成本: ${param.data[0].toFixed(2)}<br/>价值: ${param.data[1].toFixed(2)}<br/>功能点(UFP): ${param.data[2]}`;
          },
        },
        xAxis: {
          name: '成本',
          splitLine: {
            lineStyle: { type: 'dashed' },
          },
        },
        yAxis: {
          name: '价值',
          splitLine: {
            lineStyle: { type: 'dashed' },
          },
          scale: true,
        },
        series: [
          {
            name: '模块功能点',
            data: chartData,
            type: 'scatter',
            symbolSize: (data) => Math.sqrt(data[2]) * 3, // 气泡大小与 UFP 相关
            emphasis: {
              focus: 'series',
              label: {
                show: true,
                formatter: (param) => param.data[3], // 显示模块名
                position: 'top',
              },
            },
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(120, 36, 50, 0.5)',
              shadowOffsetY: 5,
              color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                { offset: 0, color: 'rgb(251, 118, 123)' },
                { offset: 1, color: 'rgb(204, 46, 72)' },
              ]),
            },
          },
        ],
      };

      /** 初始化图表 */
      EchartContainerRef.value.initData(option);
    };

    onMounted(() => {
      fetchProjectData(); // 获取数据
    });

    return {
      dataContainer,
      EchartContainerRef,
    };
  },
});
</script>

<template>
  <div className="box-cp-container">
    <EchartContainer ref="EchartContainerRef"/>
    <div v-if="dataContainer.loading" class="loading">加载中...</div>
  </div>
</template>

<style lang="scss" scoped>
.box-cp-container {
  width: 100%;
  height: 100%;
}

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 16px;
  color: #555;
}
</style>
