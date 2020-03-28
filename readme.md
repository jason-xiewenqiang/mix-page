### vue 单页 多页应用

+ 使用相关技术：webpack4 vue2.x iview vue-router vuex axios等

### 安装  
+ 配置淘宝镜像  npm install -g cnpm --registry=https://registry.npm.taobao.org

+ 多页 开发生产
+ cnpm install 安装依赖
+ cnpm run dll
+ cnpm run dev 开启多页模式 localhost:8080/xxx.html 访问
+ cnpm run build 进行生产打包
+ cnpm run analyzer 进行包分析 localhost:8888

+ 单页 开发生产
+ cnpm install 安装依赖
+ cnpm run dll
+ cnpm run dev:s 开启多页模式 localhost:8080/xxx.html 访问
+ cnpm run build:s  进行生产打包
+ cnpm run analyzer 进行包分析 localhost:8888

### 待解决 
+ split chunks 分包无法进行合适的分包
+ mock 接入
+ api 管理方案 接入
+ store 接入
