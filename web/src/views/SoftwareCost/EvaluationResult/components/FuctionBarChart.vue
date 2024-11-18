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
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
          }
        ]
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
