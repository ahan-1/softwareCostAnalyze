<script>
/**
 * 成本分布饼状图
 */
import {
  defineComponent,
  ref,
  reactive,
  onMounted,
  watch,
  toRef,
} from 'vue';
import EchartContainer from '@/components/echartContainer.vue';
import * as echarts from 'echarts';

export default defineComponent({
  components: {
    EchartContainer,
  },
  props: {
    dataInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  setup(props) {
    const EchartContainerRef = ref(); // 图表容器实例
    const dataContainer = reactive({
      loading: false,
    });

    watch(
        [toRef(props, 'dataInfo')],
        () => {
          // 可以在此处理数据更新逻辑
          const dataInfo = props.dataInfo.data || [];
          return;
        },
        {
          immediate: true,
        },
    );

    onMounted(() => {
      if (!EchartContainerRef.value) return;

      // 饼图配置
      const option = {
        tooltip: {
          trigger: 'item',
        },
        legend: {
          top: '1%',
          left: 'center',
          textStyle: {
            color: '#fff', // 图例文字颜色为白色
          },
        },
        series: [
          {
            name: 'Cost Distribution',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 8,
              borderColor: '#fff',
              borderWidth: 2,
            },
            label: {
              color: '#fff',
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {

                show: true,
                fontSize: 20,
                fontWeight: 'bold',
              },
            },
            labelLine: {

              show: false,
            },
            data: [
              {value: 50, name: '人力成本'},
              {value: 15, name: '工具和技术成本 '},
              {value: 10, name: '需求分析和设计成本'},
              {value: 10, name: '测试和质量保证成本'},
              {value: 8, name: '维护和支持成本'},
              {value: 5, name: '管理和沟通成本'},
              {value: 2, name: '其他成本'},
            ],
          },
        ],
      };

      /** 初始化图表 */
      EchartContainerRef.value.initData(option);
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
    <EchartContainer ref="EchartContainerRef"></EchartContainer>
  </div>
</template>

<style lang="scss" scoped>
.box-cp-container {
  width: 100%;
  height: 100%;
}
</style>
