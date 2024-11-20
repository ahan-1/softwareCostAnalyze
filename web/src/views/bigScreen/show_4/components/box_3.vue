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
            data: {
                type: Object,
                default: () => {
                    return {};
                },
            },
        },
        setup(props) {
            console.log(props.data.step);
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
                var scale = 0.6;
                var rich = {
                    yellow: {
                        color: '#ffc72b',
                        fontSize: 30 * scale,
                        padding: [5, 4],
                        align: 'center',
                    },
                    total: {
                        color: '#ffc72b',
                        fontSize: 40 * scale,
                        align: 'center',
                    },
                    white: {
                        color: '#fff',
                        align: 'center',
                        fontSize: 14 * scale,
                        padding: [21, 0],
                    },
                    blue: {
                        color: '#49dff0',
                        fontSize: 16 * scale,
                        align: 'center',
                    },
                    hr: {
                        borderColor: '#0b5263',
                        width: '100%',
                        borderWidth: 1,
                        height: 0,
                    },
                };
                let option = {
                    grid: {
                        top: '3%',
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        boundaryGap: [0, 0.01],
                        axisLine: {
                        show: false,
                        },
                    },
                    yAxis: [{
                        type: 'category',
                        inverse: true,
                        data: ['项目创建', '计算功能点', '综合造价计算', '报告生成', '报告评审'],
                        axisLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            color: "#fff"
                        }
                    }, {
                        type: 'category',
                        inverse: true,
                        data: ['完成', props.data.status, '进行中', '未开始', '未开始'],
                        axisLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            color: "#fff"
                        }
                    }],
                    series: [{
                            name: '条',
                            type: 'bar',
                            data: [100, props.data.step, 10, 0, 0],
                            yAxisIndex: 0,
                            itemStyle: {
                                barBorderRadius: 20,
                                // color:function(params){
                                // var num = myColor.length;
                                // return mYColor[params.valueIndex]
                                // }
                            },
                            barCategoryGap: 50,
                            barWidth: 10,
                            label: {
                                show: true,
                                position: 'inside',
                                formatter: "{c}%"
                            }
                        },
                        {
                            name: '框',
                            type: 'bar',
                            barCategoryGap: 50,
                            barWidth: 15,
                            yAxisIndex: 1,
                            itemStyle: {
                                color: "none",
                                borderColor: "#00c1de",
                                borderWidth: 3,
                                barBorderRadius: 15,
                            },
                            data: [100, 100, 100, 100, 100, 100]
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
    <div class="box-cp-container">
        <div class="text_title">评估进度细化</div>
        <EchartContainer ref="EchartContainerRef"></EchartContainer>
    </div>
</template>

<style lang="scss" scoped>
    .box-cp-container {
        width: 100%;
        height: 90%;
    }
    .text_title{
    text-align: center; /* 保持文本居中 */
    font-size: 20px; /* 设置字体大小为24像素 */
    color:white
    }
</style>