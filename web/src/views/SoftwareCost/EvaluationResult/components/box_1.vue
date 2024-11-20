<script>
import { defineComponent, reactive, onMounted } from 'vue';
import {getProjectInfo} from '@/api/EvaluationResult/index.ts'; // 假设接口文件路径为/api/project

export default defineComponent({
  props: {
    dataInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  setup() {
    const dataContainer = reactive({
      loading: false,
      ufp: null, // 调整前功能点
      dfp: null, // 调整后功能点
      costBefore: '17000 元', // 调整前成本
      costAfter: '15000 元', // 调整后成本
    });

    // 获取项目数据
    const fetchProjectInfo = async () => {
      dataContainer.loading = true;
      try {
        const response = await getProjectInfo(2);
        console.log(response);
        if (response && response.project) {
          const {ufp_num,dfp_num} =response.project;
          dataContainer.ufp = ufp_num;
          dataContainer.dfp = dfp_num;
        }
      } catch (error) {
        console.error('Error fetching project info:', error);
      } finally {
        dataContainer.loading = false;
      }
    };

    // 初始化获取数据
    onMounted(() => {
      fetchProjectInfo();
    });

    return {
      dataContainer,
    };
  },
});
</script>

<template>
  <div class="box-cp-container">
    <div class="container">
      <!-- 数据分布布局 -->
      <div class="data-item">调整前功能点：{{ dataContainer.ufp }}</div>
      <div class="data-item">调整后功能点：{{ dataContainer.dfp }}</div>
      <div class="data-item">调整前成本：{{ dataContainer.costBefore }}</div>
      <div class="data-item">调整后成本：{{ dataContainer.costAfter }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.box-cp-container {
  width: 100%;
  height: 100%;
  padding: 0.938rem;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;

  > .container {
    background-color: rgba(0, 128, 255, 0.313);
    width: 100%;
    height: 100%;
    font-size: 2.25rem;
    color: white;
    padding: 0.938rem;
    box-sizing: border-box;
    border-radius: 0.5rem;
    display: grid;
    grid-template-columns: repeat(4, 1fr); /* 4列布局 */
    grid-gap: 0.5rem; /* 增加列间距 */
    align-items: center; /* 垂直居中 */

    > .data-item {
      background-color: rgba(255, 255, 255, 0.1);
      text-align: center;
      padding: 0.5rem;
      border-radius: 0.25rem;
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
