# 使用官方 Node 20 轻量镜像
FROM node:20-alpine

# 1. 全局安装 json-server
RUN npm config set registry https://registry.npmmirror.com \
    && npm install -g json-server@0.17.4

# 2. 拷数据
WORKDIR /app
COPY mock ./mock

# 3. 声明端口
EXPOSE 3001

# 4. 启动
CMD ["json-server","--watch","mock/db.json","--host","0.0.0.0","--port","3001" ,"--no-cors"]