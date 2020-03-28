import axios from 'axios';
import qs from 'qs';
import { Message } from 'iview';
import $ from 'jquery';
import utils from '../utils'

const Jsonp = require('jsonp');

// 配置 host
const HOST = process.NODE_ENV === 'production' ? '' : '';

// 设置header参数 可以使用封装的 cookie 包处理
export const headers = {};

// 配置错误信息map
const RequestErrorMessage = {
    403: '请求资源不可用！',
    500: '服务器繁忙，请稍后重试！',
    1: '请求出错，请稍后再试',
};

// 处理错误函数
export const errorHandler = (error) => {
    Message.error(`${error.msg || RequestErrorMessage[error.code]}`);
};

// 配置axios参数
export const ax = axios.create({
    baseURL: HOST,
    timeout: 10000,
    responseType: 'json',
    transformRequest: [
        (data) => {
            if (data instanceof FormData) {
                return data;
            }
            return qs.stringify(data);
        },
    ],
    paramsSerializer(params) {
        return qs.stringify(utils.filterUndefinedParams(params));
    },
});

// 发送json
export function postJson(url, data, dataType, silent) {
    return axios.post(url, data, { headers: `${headers}`, responseType: dataType })
                .then((res) => {
                    return preHandle(res, silent);
                });
}

// GET
export function get(url, data, dataType, silent) {
    return ax.get(url, {params: data, headers: `${headers}`, responseType: dataType })
             .then((res) => {
                return preHandle(res, silent);
             });
}

// POST
export function post(url, data, dataType, silent) {
    return ax.post(url, data, { headers: `${headers}`, responseType: dataType })
             .then((res) => {
                 return preHandle(res, silent);
             });
}

// DELETE
export function Delete(url, data, dataType, silent) {
    return ax.delete(url, {headers: `${headers}`, responseType: dataType, params: data})
             .then((res) => {
                 return preHandle(res, silent);
             });
}

// PUT
export function put(url, data, dataType, silent) {
    return ax.put(url, data, {headers: `${headers}`, responseType: dataType})
             .then((res) => {
                 return preHandle(res, silent);
             });
}

export function syncPost(url, data, dataType, silent) {

}

export function syncGet(url, data, dataType, silent) {

}

// JSONP
export function jsonp(url, data, dataType, silent) {
    return new Promise((resolve, reject) => {
        const keys = Object.keys(data);
        const values = Object.values(data);
        const param = [];
        for (let i = 0; i < keys.length; i++) {
            const str = keys[i] + '=' + values[i];
            param.push(str);
        }
        Jsonp(`${url}?${param.join('&')}`, null, (error) => {
            if (error) {
                reject('');
            } else {
                resolve(data);
            }
        });
    });
}

// 处理返回参数  这里要根据具体业务进行判断
function preHandle(response, silent) {
    const status = response.headers['api-status'];
    console.log(response)
    if (!isNaN(status) && status === '0') {
        if (!silent) {
            errorHandler({ msg: response.data && response.data.message });
        }
        // 实际的业务处理  是否特殊处理
        if (response.data && response.data.code && response.data.code === 997) {
            // console.log(response);
        }
    }
    return response.data;
}

// 导出
export default {
    ax: `${ax}`,
    get: `${get}`,
    post: `${post}`,
    put: `${put}`,
    jsonp: `${jsonp}`,
    Delete: `${Delete}`,
    errorHandler: `${errorHandler}`,
};
