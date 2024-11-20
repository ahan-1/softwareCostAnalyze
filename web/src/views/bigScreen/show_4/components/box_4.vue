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
        console.log("[DEBUG]"+props.dataInfo)
        const EchartContainerRef = ref(); //组件实例
        const dataContainer = reactive({
            loading: false,
        });
        watch(
            [toRef(props, 'dataInfo')],
            () => {
                return;
                let dataInfo = props.dataInfo.data || [];
            },
            {
                immediate: true,
            },
        );
        onMounted(() => {
            if (!EchartContainerRef.value) return;
            let option = {
            legend: {
            data: ['计划剩余工作量', '剩余工作量']
            },
            xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
            type: 'value'
            },
            series: [
            {
            name: "计划剩余工作量",
            data: [35,30,25,20,15,10,5],
            type: 'line',
            lineStyle: {
            type: 'dashed' // 设置为虚线
            }
            },
            {
            name: "剩余工作量",
            data: [35,28,22,19,10,8,3],
            type: 'line'
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
        <div class="text_title">燃尽图</div>
        <EchartContainer ref="EchartContainerRef"></EchartContainer>
    </div>
</template>

<style lang="scss" scoped>
.box-cp-container {
    width: 100%;
    height: 100%;
}
.text_title{
text-align: center; /* 保持文本居中 */
font-size: 20px; /* 设置字体大小为24像素 */
color:white
}
</style>
