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
        watchEffect,
    } from 'vue';
    import AutoScalContainerV2 from '@/components/autoScalContainerV2.vue';
    import ViewHead from './components/viewHead.vue';
    import {
        setRem
    } from '@/common/rem.js';
    import img_1 from './assets/bg.png';
    import img_2 from './assets/1-1-bg.png';
    import ProjectInfor from './components/projectInfor.vue';
    import Box_1 from './components/box_1.vue';
    import Box_2 from './components/box_2.vue';
    import Box_3 from './components/box_3.vue';
    import Box_4 from './components/box_4.vue';
    import Box_5 from './components/box_5.vue';
    import {
        useRoute
    } from 'vue-router';
    import totalData from './components/totalData.vue';
    import axios from "axios";

    export default defineComponent({
        name: 'BigScreenView',
        components: {
            AutoScalContainerV2,
            ViewHead,
            ProjectInfor,
            totalData,
            Box_1,
            Box_2,
            Box_3,
            Box_4,
            Box_5,
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
                piedata: [],
                ddl:'',
                projectName:'',
                status:'',
                step:''
            });
            // 使用 watchEffect 来追踪 piedata 的变化
            watchEffect(() => {
                console.log("Piedata 更新了:", dataContainer.piedata);
                dataContainer.ddl = dataContainer.piedata.ddl;
                dataContainer.projectName = dataContainer.piedata.projectName;
                dataContainer.status = dataContainer.piedata.status;
                dataContainer.step = dataContainer.piedata.step;
            });
          const projectId = localStorage.getItem('project_id');

          if (!projectId) {
            console.error('未找到项目 ID，请先选择项目');
            dataContainer.loading = false;
            return;
          }
            loadData(Number(projectId));
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
            /* 获取数据方法 */
            function loadData(project_id) {
                axios.get('http://localhost:9000/project/findProject', {
                    params: {
                      project_id
                    }
                }).then(res => {
                    if (res.data.isOk) {
                        dataContainer.piedata = res.data.project;
                        console.log(dataContainer.piedata)
                    }
                })
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
                }, {
                    immediate: true,
                },
            );
            return {
                dataContainer,
                handleResizeScreen,
                loadData,
            };
        },
    });
</script>

<template>
    <div class="big-screen-view" v-if="dataContainer.piedata.step">
        <AutoScalContainerV2 :ratio="1920 / 1080" @onResizeScreen="handleResizeScreen" :fit="dataContainer.fit">
            <div class="big-screen-view-container" :style="{
                    '--bg-img-1': `url(${dataContainer.img.img_1})`,
                    '--bg-img-2': `url(${dataContainer.img.img_2})`,
                }">
                <div class="head">
                    <ViewHead title="项目评估进度状态看板"></ViewHead>
                </div>
                <div class="content">
                    <div class="top">
                        <totalData :data="dataContainer.piedata" />
                    </div>
                    <div class="content">
                        <div class="left">
                            <div class="box">
                                <Box_2 :data="dataContainer.piedata"/>
                            </div>
                            <div class="box">
                                <Box_3 :data="dataContainer.piedata"/>
                            </div>
                        </div>
                        <div class="middle">
                            <div class="box_resource">
                                <ProjectInfor :data="dataContainer.piedata"/>
                            </div>

                        </div>
                        <div class="right">
                            <div class="box">
                                <Box_4 :data="dataContainer.piedata"/>
                            </div>
                            <div class="box">
                                <Box_5 />
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
            background-image: var(--bg-img-1);
            background-repeat: no-repeat;
            background-size: 100% 100%;
            background-position: center;

            >.head {
                height: 5.688rem;
            }

            >.content {
                display: flex;
                flex-direction: column;
                flex: 1 1 0;
                width: 100%;
                height: 0;

                >.top {
                    width: 100%;
                    height: 12.438rem;
                }

                >.content {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    flex: 1 1 0;
                    width: 100%;
                    height: 0;
                    padding: 0 0.938rem 0.938rem 0.938rem;
                    box-sizing: border-box;

                    >.left,
                    >.middle,
                    >.right {
                        display: flex;
                        flex-direction: column;

                        >.box {
                            width: 100%;
                            flex: 1 1 0;
                            height: 0;
                            background-image: var(--bg-img-2);
                            background-repeat: no-repeat;
                            background-size: 100% 100%;
                            background-position: center;
                            margin: 0 0 0.938rem 0;

                            &:last-child {
                                margin: 0;
                            }
                        }

                        >.box_resource {
                            width: 100%;
                            flex: 1 1 0;
                            height: 0;
                            background-image: var(--bg-img-2);
                            background-repeat: no-repeat;
                            background-size: 100% 100%;
                            background-position: center;
                            margin: 0 0 0.938rem 0;

                            &:last-child {
                                margin: 0;
                            }
                        }
                    }

                    >.left {
                        height: 100%;
                        width: 34.375rem;
                    }

                    >.middle {
                        height: 100%;
                        width: 34.375rem;
                    }

                    >.right {
                        height: 100%;
                        width: 34.375rem;
                    }
                }
            }
        }
    }
</style>