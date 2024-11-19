import axios from 'axios';

/**
 * 获取项目信息
 * @param {number} projectId 项目 ID
 * @returns {Promise<any>} 接口返回的项目信息
 */
export const getProjectInfo = async (projectId: number): Promise<any> => {
    try {
        const response = await axios.get('http://localhost:9000/project/getall', {
            params: { projectId },
        });
        return response.data; // 返回接口的完整数据
    } catch (error) {
        console.error('获取项目信息失败:', error);
        throw error; // 抛出错误以便调用者处理
    }
};

export const getModuleInfo = async (projectId: number): Promise<any> => {
    try {
        const response = await axios.get('http://localhost:9000/structure/getModule', {
            params: { projectId },
        });
        return response.data; // 返回接口的完整数据
    } catch (error) {
        console.error('获取模块信息失败:', error);
        throw error; // 抛出错误以便调用者处理
    }
};
