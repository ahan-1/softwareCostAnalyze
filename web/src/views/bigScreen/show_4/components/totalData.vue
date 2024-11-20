<template>
    <div class="container">
        <div class="total-count">
            评估资源总量：
            <span ref="totalCount" class="total-count-number">
            </span>
            （时间*人力）
        </div>
        <div class="regions">
            <div class="region">
                评估进行时长：
                <span ref="time" class="region-number"></span>
                分钟
            </div>
            <div class="region">
                评估参与人数：
                <span ref="people" class="region-number"></span>
                人
            </div>
            <div class="region">
                项目评估截止日期：
                <span ref="date" class="region-number">{{ props.data.begin }}</span>
            </div>
        </div>
    </div>

</template>

<script setup>
    import {
        CountUp
    } from 'countup.js'
    import {
        ref,
        onMounted
    } from 'vue';

    const totalCount = ref(null)
    const time = ref(null)
    const people = ref(null)
    const date = ref(null)
    const props = defineProps({
        data: {
            type: String,
            required: true
        }
    })
    console.log("***")
    console.log(props.data.begin)


    onMounted(() => {
        const currentTime = new Date();
        const beginTime = new Date(props.data.begin);
        const durationInMillis = currentTime - beginTime; // 获取毫秒差
        date.value = Math.floor(durationInMillis / (1000 * 60)); // 转换为分钟
        new CountUp(totalCount.value, date.value * 5).start()
        new CountUp(time.value, date.value).start()
        new CountUp(people.value, 5).start()
        //new CountUp(date.value,year,month,day).start()
    })
</script>

<style scoped>
    /* 容器样式 */
    .container {
        padding: 24px;
    }

    /* 总数据量 */
    .total-count {
        color: #94a3b8;
        /* 使用一个灰色 */
        text-align: center;
    }

    .total-count-number {
        font-size: 4rem;
        /* 类似于 text-7xl */
        margin-left: 8px;
        margin-right: 8px;
        font-weight: bold;
        font-family: 'Electronic', sans-serif;
        background: linear-gradient(to right, #5dc5ef, #3a82f7);
        /* 创建渐变效果 */
        -webkit-background-clip: text;
        color: transparent;
    }

    /* 区域列表样式 */
    .regions {
        margin-top: 12px;
        display: flex;
        flex-wrap: wrap;
    }

    /* 单个区域样式 */
    .region {
        width: 33%;
        /* 每个区域占宽度的 1/3 */
        text-align: center;
        color: #94a3b8;
        font-size: 0.875rem;
        /* 类似于 text-sm */
    }

    .region-number {
        color: #5DC5EF;
        font-size: 2rem;
        /* 类似于 text-3xl */
        font-family: 'Electronic', sans-serif;
    }
</style>