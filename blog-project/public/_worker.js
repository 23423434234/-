// _worker.js
import { handleRequest } from '../server.js'; // 导入您的 server.js

export default {
  async fetch(request, env, ctx) {
    // 将请求传递给 server.js 中的 handleRequest 函数
    return handleRequest(request);
  },
};