<template>
  <div>
    <div class="Infor">租户： {{ props.data.company }}</div>
    <div class="Infor">项目名： {{ props.data.project_name }}</div>
    <div class="Infor-des">进度评估看板主要包括：评估进度基本数据信息、评估信息总览、燃尽图、评估进度细化、资源风险评估五个板块.</div>
    <div class="Infor-des">评估进度基本数据信息展示了评估资源总量，由“评估时间资源*评估人力资源”计算得到，可用于评估过程中的资源分配控制</div>
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
    font-size: 24px;
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
</style>