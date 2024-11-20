<template>
    <div class="page-container main-view">
        <el-row :gutter="0" class="page-query-box">
            <DifinCollapse
                :show="dataContainer.showSearch"
                :showBt="true"
                @onClick="dataContainer.showSearch = !dataContainer.showSearch"
            >
                <el-col :span="24" :xs="24">
                    <el-form
                        :model="dataContainer.form"
                        ref="QueryFormRef"
                        :inline="true"
                        label-width="110px"
                    >
                        <el-row :gutter="0">
                            <el-col class="anchor-point-target" :span="5" :xs="5">
                                <el-form-item label="项目名称" prop="project_name">
                                    <el-input
                                        style="width: 100%"
                                        v-model="searchKeyword"
                                        placeholder="请输入"
                                        clearable
                                        @clear="handleQuery"
                                        @keyup.enter="searchProgBN"
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col :span="5" :xs="5">
                                <el-form-item label="状态" prop="status">
                                    <el-select
                                        style="width: 100%"
                                        v-model="searchKeystatus"
                                        placeholder="请选择"
                                        clearable
                                        @clear="handleQuery"
                                        @change="searchProgStatus"
                                    >
                                        <el-option
                                            v-for="item in dataContainer.optionList"
                                            :key="item.id"
                                            :label="item.label"
                                            :value="item.value"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6" :xs="6">
                                <el-form-item label="截止日期" prop="date">
                                    <el-date-picker v-model="searchdate" size="default" @change="handleDateChange"></el-date-picker>   
                                </el-form-item>                         
                            </el-col>
                            <!-- <div>
                                <label for="datePicker">选择日期:</label>
                                <input type="date" id="datePicker" v-model="selectedDate" @change="handleDateChange">
                                <p>选择的日期是: {{ searchdate }}</p>
                            </div> -->
                            <el-col :span="2" :xs="4">
                                <el-form-item label=" ">
                                    <el-button type="primary" @click="handleNSD">
                                        <SvgIcon
                                            :style="'width:15px;height:15px;margin-right:5px;'"
                                            name="svg:search-bt.svg"
                                        ></SvgIcon>
                                        查询
                                    </el-button>
                                </el-form-item>
                            </el-col>

                            <el-col :span="4" :xs="4">
                                <el-form-item label=" ">
                                    <el-button @click="resetQuery">
                                        <SvgIcon
                                            :style="'width:15px;height:15px;margin-right:5px;'"
                                            name="svg:redo.svg"
                                        ></SvgIcon>
                                        重置
                                    </el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-col>
            </DifinCollapse>
        </el-row>
        <div class="table-box content-container page-content-box">

            <div class="table-container">
                <el-table
                    v-loading="dataContainer.loading"
                    :data="dataContainer.list"
                    border
                    @cell-dblclick="handleCopyVale"
                    @sort-change="handleSortChange"
                    height="100%"
                >
                    <el-table-column
                        label="多选组件"
                        align="center"
                        width="40"
                        fixed="left"
                        class-name="small-padding fixed-width"
                    >
                        <template #header>
                            <el-checkbox
                                style="height: fit-content"
                                v-model="dataContainer.checked__"
                                @change="
                                    (e) => {
                                        changeAllCheck(e);
                                        handleSelectionChange(
                                            dataContainer.list.filter((e) => e.checked__),
                                        );
                                    }
                                "
                                label=""
                                size="large"
                            />
                        </template>
                        <template #default="scope">
                            <el-checkbox
                                v-model="scope.row.checked__"
                                :status="isDisabled(scope.row)"
                                @change="
                                    () => {
                                        handleSelectionChange(
                                            dataContainer.list.filter((e) => e.checked__),
                                        );
                                    }
                                "
                                label=""
                                size="large"
                            />
                        </template>
                    </el-table-column>
                    <!-- <el-table-column
                        type="index"
                        align="center"
                        label="序号"
                        width="60"
                        fixed="left"
                    /> -->
                    <el-table-column
                        label="项目ID"
                        show-overflow-tooltip
                        align="center"
                        min-width="170"
                        prop="project_id"
                        sortable="custom"
                        :sort-orders="['descending', 'ascending']"
                    />
                    <el-table-column
                        label="项目名称"
                        show-overflow-tooltip
                        align="center"
                        min-width="170"
                        prop="project_name"
                        sortable="custom"
                        :sort-orders="['descending', 'ascending']"
                    />
                    <el-table-column
                        label="截止时间"
                        show-overflow-tooltip
                        align="center"
                        prop="ddl"
                        min-width="150"
                        sortable="custom"
                        :sort-orders="['descending', 'ascending']"
                    />
                    <el-table-column
                        label="公司"
                        show-overflow-tooltip
                        align="center"
                        prop="company"
                        min-width="150"
                        sortable="custom"
                        :sort-orders="['descending', 'ascending']"
                    />
                    <el-table-column
                        label="基本信息"
                        show-overflow-tooltip
                        align="center"
                        prop="project_info"
                        min-width="150"
                        sortable="custom"
                        :sort-orders="['descending', 'ascending']"
                    />
                    <el-table-column
                        label="状态"
                        show-overflow-tooltip
                        align="center"
                        prop="status"
                        min-width="150"
                        sortable="custom"
                        :sort-orders="['descending', 'ascending']"
                    >
                        <template #default="scope">
                            <DictTags
                                :options="dataContainer.optionList"
                                :value="scope.row.status"
                                valueKey="value"
                                labelKey="label"
                            ></DictTags>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="250"
                        fixed="right"
                        class-name="small-padding fixed-width"
                    >
                        <template #default="scope">
                            <el-button
                                link
                                type="primary"
                                @click="
                                    handleDetails(scope.row, {
                                        isShow: true,
                                        afterTitle: ' - 查看',
                                    })
                                "
                            >
                                项目详情
                            </el-button>
                            <el-button
                                link
                                type="success"
                                @click="
                                    handleEdit(scope.row, {
                                        isShow: true,
                                        afterTitle: ' - 编辑',
                                    })
                                "
                            >
                                进入评估
                            </el-button>
                            <el-dropdown>
                                <span class="el-dropdown-link">
                                查看结果
                                <el-icon class="el-icon--right">
                                    <arrow-down />
                                </el-icon>
                                </span>
                                <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item divided 
                                    @click="
                                    handleResulta(scope.row, {
                                        isShow: true,
                                        afterTitle: ' - 编辑',
                                    })
                                ">方式 1</el-dropdown-item>
                                <el-dropdown-item divided 
                                    @click="
                                    handleResultb(scope.row, {
                                        isShow: true,
                                        afterTitle: ' - 编辑',
                                    })
                                ">方式 2</el-dropdown-item>
                                <el-dropdown-item divided 
                                    @click="
                                    handleResultc(scope.row, {
                                        isShow: true,
                                        afterTitle: ' - 编辑',
                                    })
                                ">方式 3</el-dropdown-item>
                                </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pagination-container">
                <el-pagination
                    v-show="true"
                    :total="dataContainer.config.total"
                    :background="true"
                    :current-page="dataContainer.params.pageNum"
                    :page-size="dataContainer.params.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :page-sizes="[10, 20, 30, 50]"
                    :pager-count="7"
                    @size-change="
                        (size) => {
                            dataContainer.params.pageSize = size;
                            getDataList();
                        }
                    "
                    @current-change="
                        (page) => {
                            dataContainer.params.pageNum = page;
                            getDataList();
                        }
                    "
                />
            </div>
        </div>
    </div>
</template>

<script>
/**
 * 页面例子
 */
import {
    defineComponent,
    onBeforeUnmount,
    ref,
    reactive,
    getCurrentInstance,
    onActivated,
} from 'vue';
import { useRouter } from 'vue-router';
import { copyValue } from '@/common/otherTools';
import DictTags from '@/components/dictTags.vue';
import { debounceFn } from '@/common/debounceAndThrottle';
import { responseData } from './common/data.js';
import { messageSuccess, confirm } from '@/action/messagePrompt.js';
import SvgIcon from '@/components/svgIcon/index.vue';
import { hasPermi } from '@/action/powerTools';
import { saveAs } from 'file-saver';
import axios from 'axios';
import { status } from 'nprogress';


export default defineComponent({
    components: {
        DictTags,
        SvgIcon,
    },
    setup() {
        const router = useRouter();
        const searchKeyword = ref('');
        const searchKeystatus = ref('');
        const searchdate = ref('');
        const searchdat = ref('');
        const selectedDate = ref('');
        const dataContainer = reactive({
            loading: false,
            showSearch: true,
            checked__: false, //是否全选
            form: {},
            params: {
                //基础参数
                pageNum: 1,
                pageSize: 10,
            },
            config: {
                total: 0,
            },
            list: [], //当前展示的数据列表
            currentRows: [], //当前多选的数据列表
            optionList: [
                { value: 1, label: '未评估', elTagType: 'danger' },
                { value: 2, label: '已评估', elTagType: 'success' },
                { value: 3, label: '进行中', elTagType: 'primary' },
            ],
        });
        /** 获取数据列表 */
        const getDataList = debounceFn(function () {
        if (dataContainer.loading) return;
        dataContainer.loading = true;
    
        fetch('http://localhost:9000/project/selectAllProjects')
        .then(response => response.json())
        .then(res => {
            dataContainer.list = res.projects || [];
            dataContainer.config.total = res.total;
            /** 默认不选择 */
            dataContainer.list.forEach((item) => {
                item.checked__ = false;
            });
            dataContainer.checked__ = false;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        })
        .finally(() => {
            dataContainer.loading = false;
        });
        }, 70);
        getDataList();
        /** 双击单元格，复制单元格内容 */
        function handleCopyVale(_, __, ___, event) {
            copyValue(event.target.innerText);
            messageSuccess('复制成功，内容为：' + event.target.innerText);
        }
        /** 排序触发事件 */
        function handleSortChange(column, prop, order) {
            dataContainer.form.orderByColumn = column.prop;
            dataContainer.form.isAsc = column.order;
            getDataList();
        }

    // const searchProgBN = () => {
    //   const projectName = searchKeyword.value;
    //   if (projectName) {
    //     axios.post('http://localhost:9000/project/selectProjectsByNameshr', { project_name: projectName })
    //       .then(response => {
    //         console.log('Response:', response.data);
    //         // 在这里处理响应数据
    //       })
    //       .catch(error => {
    //         console.error('Error:', error);
    //         // 在这里处理错误
    //       });
    //   } else {
    //     console.warn('Project name is empty');
    //   }
    // }
    const searchProgBN = () => {
    const projectName = searchKeyword.value;
    if (projectName) {
        axios.post('http://localhost:9000/project/selectProjectsByNameshr', { project_name: projectName })
            .then(response => {
                console.log('Response:', response.data);
                // 在这里处理响应数据
                const res = response.data;
                dataContainer.list = res.projects || [];
                dataContainer.config.total = res.total;
                /** 默认不选择 */
                dataContainer.list.forEach((item) => {
                    item.checked__ = false;
                });
                dataContainer.checked__ = false;
            })
            .catch(error => {
                console.error('Error:', error);
                // 在这里处理错误
            });
    } else {
        console.warn('Project name is empty');
    }
}


    // const searchProgStatus = () => {
    //   const ProjectStatus = searchKeystatus.value;
    //   if (ProjectStatus) {
    //     axios.post('http://localhost:9000/project/selectProjectsByStatus', { status: ProjectStatus })
    //       .then(response => {
    //         console.log('Response:', response.data);
    //         // 在这里处理响应数据
    //       })
    //       .catch(error => {
    //         console.error('Error:', error);
    //         // 在这里处理错误
    //       });
    //   } else {
    //     console.warn('Project status is empty');
    //   }
    // }

    const searchProgStatus = () => {
  const ProjectStatus = searchKeystatus.value;
  let statusString;

  switch (ProjectStatus) {
    case 1:
      statusString = "未评估";
      break;
    case 2:
      statusString = "已评估";
      break;
    case 3:
      statusString = "进行中";
      break;
    default:
      console.warn('Invalid project status');
      return; // 退出函数，不发送请求
  }
  axios.post('http://localhost:9000/project/selectProjectsByStatusshr', { status: statusString })
  .then(response => {
                console.log('Response:', response.data);
                // 在这里处理响应数据
                const res = response.data;
                dataContainer.list = res.projects || [];
                dataContainer.config.total = res.total;
                /** 默认不选择 */
                dataContainer.list.forEach((item) => {
                    item.checked__ = false;
                });
                dataContainer.checked__ = false;
            })
    .catch(error => {
      console.error('Error:', error);
      // 在这里处理错误
    });
}


const handleDateChange = () => {
    const selectDate=searchdate.value;

    const utcDate = new Date(selectDate);
      // Beijing time is UTC+8
      const offset = 8 * 60; // 8 hours in minutes
      const localDate = new Date(utcDate.getTime() + offset * 60 * 1000);
      
      // Format the date to only include year, month, and day
      const year = localDate.getFullYear();
      const month = String(localDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      const day = String(localDate.getDate()).padStart(2, '0');
      
      const beijingTime = `${year}-${month}-${day}`;

    axios.post('http://localhost:9000/project/selectProjectsByDDLshr', { ddl: beijingTime })
    .then(response => {
                console.log('Response:', response.data);
                // 在这里处理响应数据
                const res = response.data;
                dataContainer.list = res.projects || [];
                dataContainer.config.total = res.total;
                /** 默认不选择 */
                dataContainer.list.forEach((item) => {
                    item.checked__ = false;
                });
                dataContainer.checked__ = false;
            })
      .catch(error => {
        console.error('Error:', error);
        // 在这里处理错误
      });
  
}

        /** 搜索按钮操作 */
        function handleQuery() {
            dataContainer.params.pageNum = 1;
            getDataList();
        }
        /** 重置按钮操作 */
        function resetQuery() {
            dataContainer.form = {};
            handleQuery();
        }
        /** 导出数据 */
        function handleExport() {
            let str = '保存字符串的例子！！';
            let strData = new Blob([str], { type: 'text/plain;charset=utf-8' });
            saveAs(strData, '测试文件下载.txt');
            messageSuccess('导出成功！');
        }
        /** 新增按钮操作 */
        function handleAdd() {
            router.push({
                name: 'show-list-add',
            });
        }
        /** 项目详情按钮操作 */
        function handleDetails(row, querys) {
            if (row.project_id) {
                 localStorage.setItem('project_id', row.project_id);
             }
            router.push({
                name: 'show-list-info',
                params: {
                    sign: row.project_id ,
                },
                querys,
            });
        }
        /** 项目评估结果按钮操作 */
        function handleResulta(row, querys) {
            if (row.project_id) {
                 localStorage.setItem('project_id', row.project_id);
             }
            router.push({
                name: 'big-screen-show_4',//结果展示一
                params: {
                    sign: row.project_id ,
                },
                querys,
            });
        }

        function handleResultb(row, querys) {
            if (row.project_id) {
                 localStorage.setItem('project_id', row.project_id);
             }
            router.push({
                name: 'big-screen-show_3',//结果展示二
                params: {
                    sign: row.project_id ,
                },
                querys,
            });
        }

        function handleResultc(row, querys) {
            if (row.project_id) {
                 localStorage.setItem('project_id', row.project_id);
             }
            router.push({
                name: 'big-screen-show_2',//结果展示三
                params: {
                    sign: row.project_id ,
                },
                querys,
            });
        }


        /** 编辑按钮操作 */
        function handleEdit(row, querys) {
            router.push({
                name: 'show-list-update',
                params: {
                    sign: row.id || new Date().getTime(),
                },
                querys,
            });
        }
        /** 删除 */
        function handleDelete(rows) {
            confirm('确认删除所选数据？', '提示！')
                .then(() => {
                    messageSuccess('删除成功');
                })
                .catch(() => {});
        }
        /** 批次确认多选操作 */
        function changeAllCheck(value) {
            if (!value) {
                dataContainer.list.forEach((item) => {
                    item.checked__ = false;
                });
            } else {
                dataContainer.list.forEach((item) => {
                    if (isDisabled(item)) {
                        item.checked__ = false;
                        return;
                    }
                    item.checked__ = true;
                });
            }
        }
        /** 计算批量操作按钮的显示隐藏 */
        function isDisabled(row) {
            /** 如果该条数据是不可选择的话可以设置 */
            return row.status;
        }
        // 多选框选中数据
        function handleSelectionChange(selection) {
            dataContainer.currentRows = selection || [];
        }
        return {
            dataContainer,
            getDataList,
            handleCopyVale,
            handleSortChange,
            handleQuery,
            resetQuery,
            handleExport,
            handleAdd,
            handleDetails,
            handleEdit,
            handleDelete,
            hasPermi,
            changeAllCheck,
            isDisabled,
            handleSelectionChange,
            searchKeyword,
            searchProgBN,
            searchKeystatus,
            searchProgStatus,
            searchdate,
            handleDateChange,
            selectedDate,
            handleResulta,
            handleResultb,
            handleResultc
            
            
        };
    },
});
</script>

<style lang="scss" scoped>
.main-view {
    display: flex;
    flex-direction: column;
    /** 页面间隔css变量，可自行调节 */
    --view-gap: 10px;
    > .page-query-box {
        margin: 0 0 var(--view-gap) 0 !important;
        padding: var(--view-gap) var(--view-gap) 0px var(--view-gap);
        :deep(.el-form-item) {
            margin-bottom: var(--view-gap) !important;
        }
        :deep(.el-form-item--default) {
            width: 100%;
            margin-right: 0;
        }
    }
    > .content-container {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: var(--view-gap) var(--view-gap);
        box-sizing: border-box;
        background: #fff;
        > .top-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 0px 0 var(--view-gap) 0;
            > .left {
                display: flex;
                flex-direction: row;
                align-items: center;
                > * {
                    margin: 0 var(--view-gap) 0 0 !important;
                }
            }
            > .right {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: flex-end;
                > * {
                    margin: 0 0px 0 var(--view-gap) !important;
                }
            }
        }
        > .table-container {
            flex: 1 1 auto;
            height: 0;
            overflow: auto;
        }
    }
    .pagination-container {
        display: flex;
        justify-content: flex-end;
        padding: 0;
        margin: var(--view-gap) 0 0 0;
    }
}
</style>
