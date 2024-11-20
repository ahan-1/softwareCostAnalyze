<script>
    /**
     * 盒子
     *  */
    import {
        defineComponent,
        ref,
        getCurrentInstance,
        reactive,
        toRef,
        computed,
        onMounted,
        onActivated,
        watch,
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
            const EchartContainerRef = ref(); //组件实例
            const dataContainer = reactive({
                loading: false,
            });
            watch(
                [toRef(props, 'dataInfo')],
                () => {
                    return;
                    let dataInfo = props.dataInfo.data || [];
                }, {
                    immediate: true,
                },
            );
            onMounted(() => {
                if (!EchartContainerRef.value) return;
                // prettier-ignore
                const hours = [
                    "初级阶段", "中期阶段", "最终阶段"
                ];
                // prettier-ignore
                const days = [
                    "项目创建", "计算功能点", "综合造价计算", "报告生成", "报告评审"
                ];
                // prettier-ignore
                const data = [
                    [0, 0, 5],
                    [0, 1, 3],
                    [0, 2, 2],
                    [1, 0, 7],
                    [1, 1, 4],
                    [1, 2, 6],
                    [2, 0, 8],
                    [2, 1, 5],
                    [2, 2, 3],
                    [3, 0, 2],
                    [3, 1, 1],
                    [3, 2, 4],
                    [4, 0, 6],
                    [4, 1, 8],
                    [4, 2, 5]
                ].map(function (item) {
                    return [item[1], item[0], item[2] || '-'];
                });

                var option = {
                    tooltip: {
                        position: 'top'
                    },
                    grid: {
                        height: '50%',
                        top: '10%'
                    },
                    xAxis: {
                        type: 'category',
                        data: hours,
                        splitArea: {
                            show: true
                        }
                    },
                    yAxis: {
                        type: 'category',
                        data: days,
                        inverse: true,
                        splitArea: {
                            show: true
                        }
                    },
                    visualMap: {
                        min: 0,
                        max: 10,
                        calculable: true,
                        orient: 'horizontal',
                        left: 'center',
                        bottom: '15%'
                    },
                    series: [{
                        name: '资源风险评估',
                        type: 'heatmap',
                        data: data,
                        label: {
                            show: true
                        },
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }]
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
    <div class="box-cp-container">
        <div class="text_title">资源风险评估</div>
        <EchartContainer ref="EchartContainerRef"></EchartContainer>
    </div>
</template>

<style lang="scss" scoped>
    .box-cp-container {
        width: 100%;
        height: 100%;
    }

    .text_title {
        text-align: center;
        /* 保持文本居中 */
        font-size: 20px;
        /* 设置字体大小为24像素 */
        color: white
    }
</style>