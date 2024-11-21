<template>
    <div class="page-container">
      <!-- 搜索区域 -->
      <div class="search-container">
        <el-row :gutter="20" align="middle">
          <!-- 项目名称输入框 -->
          <el-col :span="6">
            <el-form-item label="项目名称">
              <el-input
                v-model="searchKeyword"
                placeholder="请输入项目名称"
                clearable
                @keyup.enter="searchProgBN"
              ></el-input>
            </el-form-item>
          </el-col>
          <!-- 状态选择框 -->
          <el-col :span="6">
            <el-form-item label="状态">
              <el-select
                v-model="searchKeystatus"
                placeholder="请选择状态"
                clearable
                 >
                <el-option
                  v-for="item in dataContainer.optionList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 截止日期选择框 -->
          <el-col :span="6" :xs="6">
            <el-form-item label="截止日期" prop="date">
                <el-date-picker
                 v-model="searchdate" 
                size="default" 
                ></el-date-picker>   
            </el-form-item>
          </el-col>
          <!-- 按钮操作 -->
          <el-col :span="6" class="search-actions">
            <el-button type="primary" @click="searchProgNSD">查询</el-button>
            <el-button type="default" @click="resetQuery">重置</el-button>
          </el-col>
        </el-row>
      </div>
      <!-- 内容区域 -->
      <div class="content-wrapper">
        <!-- 卡片容器 -->
        <el-row :gutter="20" class="card-container">
          <el-col :span="8" v-for="(item, index) in dataContainer.list" :key="index">
            <el-card shadow="hover" class="project-card">
              <div class="card-content">
                <!-- 项目名称 -->
                <h3 class="project-name">{{ item.project_name }}</h3>
                <!-- 截止时间 -->
                <p class="project-info">
                  <strong>截止时间:</strong> {{ item.ddl }}
                </p>
                <!-- 公司 -->
                <p class="project-info">
                  <strong>所属公司:</strong> {{ item.company }}
                </p>
                <!-- 状态 -->
                <p class="project-info">
                  <strong>评估状态:</strong>
                  <el-tag
                    :type="item.status === '已评估' ? 'success' : item.status === '进行中' ? 'primary' : 'danger'"
                  >
                    {{ item.status }}
                  </el-tag>
                </p>
              </div>
<el-table-column
    label="开始时间"
    prop="begin"
    v-if="false" 
/>
<el-table-column
    label="EI编号"
    prop="ei_num"
    v-if="false" 
/>
<el-table-column
    label="EO编号"
    prop="eo_num"
    v-if="false" 
/>
<el-table-column
    label="EQ编号"
    prop="eq_num"
    v-if="false" 
/>
<el-table-column
    label="ILF编号"
    prop="ilf_num"
    v-if="false" 
/>
<el-table-column
    label="ELF编号"
    prop="elf_num"
    v-if="false" 
/>
<el-table-column
    label="UFP"
    prop="ufp"
    v-if="false" 
/>
<el-table-column
    label="DFP"
    prop="dfp"
    v-if="false" 
/>
<el-table-column
    label="S"
    prop="s"
    v-if="false" 
/>
<el-table-column
    label="步骤"
    prop="step"
    v-if="false" 
/>
<el-table-column
    label="审核状态"
    prop="auditStatus"
    v-if="false" 
/>
<el-table-column
    label="审核建议"
    prop="auditSuggest"
    v-if="false" 
/>
<el-table-column
    label="URL"
    prop="url"
    v-if="false" 
/>
              <!-- 操作按钮 -->
              <div class="card-actions">
                <el-button type="primary" @click="handleDetails(item)">项目详情</el-button>
                <el-button
                            v-if="item.status === '进行中'"
                                type="success"
                                @click="
                                    handleEstimate(item, {
                                        isShow: true,
                                        afterTitle: ' - 评估',
                                    })
                                "
                            >
                                继续评估
                            </el-button>
                            <el-button
                            v-if="item.status === '未评估'"
                                type="warning"
                                @click="
                                    handleEstimate(item, {
                                        isShow: true,
                                        afterTitle: ' - 编辑',
                                    })
                                "
                            >
                                开始评估
                            </el-button>
                            <el-button
                            v-if="item.status === '已评估'"
                                type="info"
                                @click="
                                    handleEstimate(item, {
                                        isShow: true,
                                        afterTitle: ' - 编辑',
                                    })
                                "
                            >
                                重新评估
                            </el-button>
                <el-dropdown>
                  <el-button type="info" >
                    查看结果
                  </el-button>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item @click="handleResulta(item)">评估进度看板</el-dropdown-item>
                      <el-dropdown-item @click="handleResultb(item)">评估结果看板</el-dropdown-item>
                      <el-dropdown-item @click="handleResultc(item)">任务分配看板</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <!-- 分页 -->
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
                            searchProgNSD();
                        }
                    "
                    @current-change="
                        (page) => {
                            dataContainer.params.pageNum = page;
                            searchProgNSD();
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
        const tempname = ref('');
        const searchKeystatus = ref('');
        const tempstatus = ref('');
        const searchdate = ref('');
        const tempdate = ref('');
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
    
        fetch('http://localhost:9000/project/selectProjectsByNSD')
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

const searchProgNSD = () => {
    const projectName = searchKeyword.value;
    tempname.value = projectName;
    const selectDate = searchdate.value;
    let beijingTime;

    if (selectDate) {
        const utcDate = new Date(selectDate);
        // Beijing time is UTC+8
        const offset = 8 * 60; // 8 hours in minutes
        const localDate = new Date(utcDate.getTime() + offset * 60 * 1000);
        // Format the date to only include year, month, and day
        const year = localDate.getFullYear();
        const month = String(localDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(localDate.getDate()).padStart(2, '0');
        beijingTime = `${year}-${month}-${day}`;
    } else {
        beijingTime = null;
    }
    tempdate.value= beijingTime;
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
            statusString = null;
            break;
    }
    tempstatus.value=statusString;
    axios.post('http://localhost:9000/project/selectProjectsByNSD', {
        project_name: projectName,
        ddl: beijingTime,
        status: statusString,
        pageNum: dataContainer.params.pageNum,
        pageSize: dataContainer.params.pageSize
    })
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


const handleChangePage = () => {
    axios.post('http://localhost:9000/project/selectProjectsByNSD', {
        project_name: tempname.value,
        ddl: tempdate.value,
        status: tempstatus.value,
        pageNum: dataContainer.params.pageNum,
        pageSize: dataContainer.params.pageSize
    })
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


const searchAllProgNSD = () => {
    axios.post('http://localhost:9000/project/selectProjectsByNSD', {
        pageNum: dataContainer.params.pageNum,
        pageSize: dataContainer.params.pageSize
    })
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
            searchKeyword.value="";
            searchdate.value="";
            searchKeystatus.value="";
            searchAllProgNSD();
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
                 localStorage.setItem('project', ('project', JSON.stringify(row)));
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
                name: 'show-list-info',
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
                name: 'show-list-info',
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
                name: 'show-list-info',
                params: {
                    sign: row.project_id ,
                },
                querys,
            });
        }


        /** 编辑按钮操作 */
        function handleEstimate(row, querys) {
            router.push({
                name: 'show-list-update',
                params: {
                    sign: row.project_id ,
                },
                querys,
            });
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
            searchAllProgNSD,
            handleExport,
            handleAdd,
            handleDetails,
            handleEstimate,
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
            handleResultc,
            searchProgNSD,
            handleChangePage
            

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
.page-container {
  padding: 20px; /* 内部间距 */
  background-color: #ebeaea; /* 背景颜色 */
  width: 95%; /* 宽度设为95%，占满父容器的95% */
  height: 600px; /* 固定高度 */
  border: 1px solid #dcdcdc1d; /* 边框颜色 */
  margin: 20px auto; /* 上下左右都有20px的外边距，并且水平居中 */
  border-radius: 10px; /* 圆角效果 */
}

.card-container {
  margin-top: 20px;
}

.card-wrapper {
  background-color: #ffffff; /* 背景框的颜色 */
  padding: 20px;
  border-radius: 10px; /* 圆角效果 */
  border: 1px solid #e8e8e84b; /* 边框颜色 */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05); /* 阴影效果 */
}

.project-card {
  border: 1px solid #e8e8e8;
  border-radius: 10px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05); /* 给卡片添加阴影 */
  transition: all 0.3s ease;
}

.project-card:hover {
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1); /* 增加悬浮时的阴影 */
  transform: translateY(-5px); /* 悬浮效果 */
}

.card-content {
  margin-bottom: 15px;
}

.project-name {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.project-info {
  font-size: 16px;
  color: #666;
  margin-bottom: 5px;
  line-height: 3; /* 增加每行文字的间距 */
}

.card-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.card-actions el-button {
  margin-right: 10px;
}

.el-button {
  border-radius: 6px; /* 按钮圆角 */
}

.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
/* 搜索区域 */
.search-container {
  background-color: #f7f7f7;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  border: 1px solid #e8e8e8;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.search-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  align-items: center;
}

.page-container {
  padding: 20px;
  background-color: #ebeaea;
  width: 95%;
  height: auto;
  border: 1px solid #dcdcdc1d;
  margin: 20px auto;
  border-radius: 10px;
}
</style>
