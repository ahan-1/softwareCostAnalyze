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
            console.log("---");
            console.log(props.data)
            const total =(props.data/100+1+0+0+0)/5
            const EchartContainerRef = ref(); //组件实例
            const dataContainer = reactive({
                loading: false,
            });
            watch(
                [toRef(props, 'data')],
                () => {
                    return;
                    let data = props.data.data || [];
                }, {
                    immediate: true,
                },
            );
            onMounted(() => {
                if (!EchartContainerRef.value) return;
                var option = {
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        top: '5%',
                        left: 'center'
                    },
                    series: [{
                        name: 'Access From',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: 40,
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [{
                                value: total,
                                name: '已完成'
                            },
                            {
                                value: 1-total,
                                name: '未完成'
                            }
                        ]
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
        <div class="text_title">评估信息总览</div>
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
        font-size: 24px;
        /* 设置字体大小为24像素 */
        color: white
    }
</style>