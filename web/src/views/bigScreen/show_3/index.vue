<script>
/**
 * 大屏主页面
 * 采用缩放的形式进行适配，搭配rem的话很方便实用
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
import AutoScalContainerV2 from '@/components/autoScalContainerV2.vue';
import ViewHead from './components/viewHead.vue';
import { setRem } from '@/common/rem.js';
import img_1 from './assets/bg.png';
import img_2 from './assets/1-1-bg.png';
import Box_1 from './components/box_1.vue';
import PieChart from './components/PieChart.vue';
import CostStackChart from './components/CostStackChart.vue';
import FuctionBarChart from './components/FuctionBarChart.vue';
import BubbleChart from './components/BubbleChart.vue';
import { useRoute } from 'vue-router';
import {getProjectInfo} from '@/api/EvaluationResult/index.ts';

export default defineComponent({
  name: 'BigScreenView',
  components: {
    AutoScalContainerV2,
    ViewHead,
    Box_1,
    PieChart,
    CostStackChart,
    FuctionBarChart,
    BubbleChart,
  },
  setup() {
    let route = useRoute();
    const dataContainer = reactive({
      loading: false,
      img: {
        img_1,
        img_2,
      },
      fit: 'contain',
    });
    /**
     * 缩放计算事件
     *  */
    function handleResizeScreen(rect) {
      rect = rect || {};
      /**
       * 计算缩放倍数 1920 * 1080
       * 根据设计图自己配置
       *  */
      let baseSize = 16; //基础大小，相当于1rem = 16像素
      let scale = rect.width / 1920;
      let fontSize = Math.round(baseSize * scale * 100) / 100 + 'px';
      setRem(fontSize);
    }
    watch(
        route,
        () => {
          let queryParams = route.query || {};
          let fitMap = {
            cover: 'cover',
            contain: 'contain',
          };
          dataContainer.fit = fitMap[queryParams.fit] || 'contain';

        },
        {
          immediate: true,
        },
    );
    return {
      dataContainer,
      handleResizeScreen,
    };
  },
});
</script>

<template>
  <div class="big-screen-view">
    <AutoScalContainerV2
        :ratio="1920 / 1080"
        @onResizeScreen="handleResizeScreen"
        :fit="dataContainer.fit"
    >
      <div
          class="big-screen-view-container"
          :style="{
                    '--bg-img-1': `url(${dataContainer.img.img_1})`,
                    '--bg-img-2': `url(${dataContainer.img.img_2})`,
                }"
      >
        <div class="head">
          <ViewHead title="项目评估结果看板"></ViewHead>
        </div>
        <div class="content">
          <div class="top">
            <Box_1></Box_1>
          </div>
          <div class="content">
            <div class="left">
              <div class="box">
                <PieChart></PieChart>
              </div>
              <div class="box">
                <CostStackChart></CostStackChart>
              </div>
            </div>
            <div class="right">
              <div class="box">
                <FuctionBarChart></FuctionBarChart>
              </div>
              <div class="box">
                <BubbleChart></BubbleChart>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AutoScalContainerV2>
  </div>
</template>

<style lang="scss" scoped>
.big-screen-view {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #031045c7;

  .big-screen-view-container {
    width: 100%;
    height: 100%;
    background-color: rgb(169, 169, 169);
    display: flex;
    flex-direction: column;
    background-image: var(--bg-img-1); // 使用背景图片1作为大屏背景
    background-repeat: no-repeat; // 背景图片不重复
    background-size: 100% 100%; // 背景图片铺满整个容器
    background-position: center; // 背景图片居中显示

    > .head {
      height: 5.688rem; // 顶部标题区域的高度
    }

    > .content {
      display: flex;
      flex-direction: column; // 内容区域按列排列
      flex: 1 1 0; // 内容区域的高度由父容器自适应分配
      width: 100%;
      height: 0;

      > .top {
        width: 100%;
        height: 12.438rem; // 上方第一行内容区域的固定高度
      }

      > .content {
        display: flex;
        flex-direction: row; // 左右两列内容并排显示
        justify-content: space-between; // 左右两列之间的空间平均分布
        flex: 1 1 0; // 自适应分配剩余高度
        width: 100%;
        height: 0;
        padding: 0 5rem 0.938rem 5rem; // 四周内边距
        box-sizing: border-box;

        > .left,
        > .right {
          display: flex;
          flex-direction: column; // 每列中的内容按列排列

          > .box {
            width: 100%; // `box` 的宽度占满其父容器
            flex: 1 1 0; // 高度自适应分配
            height: 0; // 高度基于 flex 分配
            background-image: var(--bg-img-2); // 使用背景图片2
            background-repeat: no-repeat;
            background-size: 100% 100%;
            background-position: center;
            margin: 0 0 0.938rem 0; // 每个 `box` 的下方间距

            &:last-child {
              margin: 0; // 最后一个 `box` 无下边距
            }
          }
        }

        > .left {
          height: 100%; // 左侧列的高度占满父容器
          width: 50rem; // 左侧列的固定宽度，可修改此值改变列宽
        }

        > .right {
          height: 100%; // 右侧列的高度占满父容器
          width: 50rem; // 右侧列的固定宽度，可修改此值改变列宽
        }
      }
    }
  }
}
</style>
