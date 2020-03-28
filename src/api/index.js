// 接口管理 相关
import {ax, get, post, put, Delete, jsonp, postJson, errorHandler} from './myAxois';


// 配置 host
const HOST = process.NODE_ENV === 'production' ? '' : '';

// 自动挂载模块
const modules = {};

// 获取modules内容
const fileModules = require.context('./modules', true, /\.js$/);

// 组织模块内容
fileModules.keys().forEach((item) => {
    const module = fileModules(item).default;
    const path = item.split(/[\\\/]/g);
    const moduleName = path[path.length - 1].split(/\./g)[0];
    modules[moduleName] = packageReq(module);
});

console.log('api modules', modules);

export default Object.assign({}, modules);

function packageReq(module) {
    const finalModule = {};
    let k;
    for (k in module) {
        if (module[k]) {
            ((moduleName, req) => {
                let url;
                if (!req.method) {
                    req.method = 'GET';
                }
                if (req.url.indexOf('http') === -1) {
                    url = HOST + req.url;
                } else {
                    url = req.url;
                }
                req.method = req.method.toUpperCase();
                if (!req.dataType) {
                    req.dataType = 'json';
                }
                if (module[moduleName]) {
                    finalModule[moduleName] = async (
                        data, // 请求参数
                        silent = false, // 设为true屏蔽默认请求出错提示
                        rejectMode= false, // 设为true请求出错将会reject处理，默认 resolve({error:e}) unknow
                    ) => {
                        const allMethods = {
                            GET: get,
                            POST: post,
                            PUT: put,
                            DELETE: Delete,
                            JSONP: jsonp,
                        };
                        const moduleMethod = req.postJson
                            ? postJson
                            : allMethods[req.method];
                        if (!module) {
                            throw `[DEV] undefined request method ${req.method}`;
                        }
                        if (rejectMode) {
                            return await moduleMethod(
                                url,
                                data,
                                req.dataType,
                                silent,
                            );
                        } else {
                            let res;
                            try {
                                res = await moduleMethod(
                                    url,
                                    data,
                                    req.dataType,
                                    silent,
                                );
                            } catch (e) {
                                if (!silent) {
                                    errorHandler(e);
                                }
                                res = { error: e };
                            }
                            return res;
                        }
                    };
                }
            })(k, module[k]);
        }
    }
    return finalModule;
}






