<template>
  <div>
    <div class="Infor">项目名： {{ props.data.project_name }}</div>
    <div class="Infor">评估开始日期： {{ props.data.begin }}</div>
    <div class="Infor">租户： {{ props.data.company }}</div>
    <div class="Infor-des">
      进度评估看板主要包括以下五个板块.
      </div>
    <div class="Infor-des"><strong>评估进度基本数据信息</strong>展示了评估资源总量，由“评估时间资源*评估人力资源”计算得到，可用于评估过程中的资源分配控制</div>
    <div class="Infor-des"><strong>评估进度总览</strong>展示了项目评估的整体完成情况，可视化已完成、未完成任务占比.</div>
    <div class="Infor-des"><strong>评估进度细化</strong>将评估过程细化为五个具体任务：项目创建, 计算功能点, 综合造价计算, 报告生成, 报告评审</div>
    <div class="Infor-des"><strong>燃尽图</strong>展示了随着时间的减少评估工作量的剩余情况</div>
    <div class="Infor-des"><strong>资源风险评估</strong>展示了项目评估过程中，针对具体任务的资源总量计算，有助于识别评估进度的资源分配风险</div>
  </div>
</template>

<script setup>
  import {
    ref
  } from 'vue';
  const props = defineProps({
    data: {
      type: Object,
      required: true,
      default: () => ({})
    }
  })
  console.log("*****")
  console.log(props.data)

</script>

<style scoped>
  .text_title {
    margin-top: 5%;
    text-align: center;
    /* 保持文本居中 */
    font-size: 20px;
    /* 设置字体大小为24像素 */
    color: white
  }
  .assess-pie{
    width: 100%;
    height: 100%;
  }
  .Infor {
  font-family: '仿宋', sans-serif; /* 使用仿宋字体，如果不可用则回退到sans-serif */
  color: white; /* 文字颜色为白色 */
  font-size: 20px; /* 文字大小为24像素 */
  text-align: center;
  margin-top: 5%;
  }
  .Infor-des{
    font-family: '仿宋', sans-serif; /* 使用仿宋字体，如果不可用则回退到sans-serif */
    color: white; /* 文字颜色为白色 */
    font-size: 15px; /* 文字大小为24像素 */
    text-align:left;
    margin-top: 5%;
    margin-left: 5%;
    margin-right: 5%;
  }
  .Infor-des strong {
  font-size: 1.2em;
  font-weight: bold;
  color: #ADD8E6;
  }
</style>