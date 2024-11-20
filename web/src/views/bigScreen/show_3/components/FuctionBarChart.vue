<script>
/**
 * 成本分布柱状图
 */
import {defineComponent, ref, reactive, onMounted} from 'vue';
import EchartContainer from '@/components/echartContainer.vue';
import {getProjectInfo} from '@/api/EvaluationResult/index.ts'; // 假设这是调用接口的方法

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
      chartData: {
        xAxis: [],
        yAxis: [],
      },
      projectName: '', // 保存项目名称
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

        const response = await getProjectInfo(Number(projectId)); // 调用接口获取数据
        if (response.isOk && response.project) {
          const {ei_num, eo_num, eq_num, ilf_num, elf_num, project_name} = response.project;
          dataContainer.chartData.xAxis = ['ei_num', 'eo_num', 'eq_num', 'ilf_num', 'elf_num'];
          dataContainer.chartData.yAxis = [ei_num, eo_num, eq_num, ilf_num, elf_num];
          dataContainer.projectName = project_name; // 保存项目名称
          updateChart();
        }
      } catch (error) {
        console.error('获取项目数据失败', error);
      } finally {
        dataContainer.loading = false;
      }
    };

    const updateChart = () => {
      if (!EchartContainerRef.value) return;

      // 柱状图配置
      const option = {
        title: {
          text: dataContainer.projectName || '成本分布柱状图', // 默认标题
          left: 'center', // 标题居中
          top: '5%', // 距离顶部的间距
          textStyle: {
            fontSize: 16,
            fontWeight: 'bold',
          },
        },
        xAxis: {
          type: 'category',
          data: dataContainer.chartData.xAxis,
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: dataContainer.chartData.yAxis,
            type: 'bar',
            barWidth: '50%', // 调整柱宽度
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
  </div>
</template>

<style lang="scss" scoped>
.box-cp-container {
  width: 100%;
  height: 100%;
}
</style>
