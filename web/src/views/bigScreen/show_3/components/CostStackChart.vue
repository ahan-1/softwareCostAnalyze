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
          trigger: 'axis',
          axisPointer: {
            type: 'shadow' // 默认是 shadow，也可以是 line
          }
        },
        legend: {
          textStyle: {
            color: '#fff', // 图例文字颜色为白色
          },
          data: ['人员成本', '工具成本', '时间成本', '外包成本', '管理成本', '总成本']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value', // x轴表示数值，堆叠柱状图的高度即为总成本
        },
        yAxis: {
          type: 'category', // y轴表示阶段名称
          data: ['需求分析', '设计', '开发', '测试', '部署']
        },
        series: [
          {
            name: '人员成本',
            type: 'bar',
            stack: '总成本', // 堆叠
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [50, 60, 100, 70, 30] // 每个阶段的人员成本
          },
          {
            name: '工具成本',
            type: 'bar',
            stack: '总成本',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [20, 30, 50, 40, 10] // 每个阶段的工具成本
          },
          {
            name: '时间成本',
            type: 'bar',
            stack: '总成本',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [30, 40, 80, 60, 20] // 每个阶段的时间成本
          },
          {
            name: '外包成本',
            type: 'bar',
            stack: '总成本',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [10, 15, 20, 10, 5] // 每个阶段的外包成本
          },
          {
            name: '管理成本',
            type: 'bar',
            stack: '总成本',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [5, 10, 15, 5, 3] // 每个阶段的管理成本
          },
          {
            name: '总成本',
            type: 'line', // 使用折线图
            smooth: true, // 平滑折线
            symbol: 'circle', // 圆形标记
            label: {
              show: true,
              position: 'top',
              formatter: function (params) {
                return params.value; // 显示总成本值
              }
            },
            data: [
              50 + 20 + 30 + 10 + 5, // 需求分析总成本
              60 + 30 + 40 + 15 + 10, // 设计总成本
              100 + 50 + 80 + 20 + 15, // 开发总成本
              70 + 40 + 60 + 10 + 5, // 测试总成本
              30 + 10 + 20 + 5 + 3 // 部署总成本
            ],
            emphasis: {
              focus: 'series'
            }
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
