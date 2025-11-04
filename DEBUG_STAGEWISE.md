# Stagewise 调试指南

## 检查步骤

### 1. 确认依赖已安装

在终端运行：
```bash
npm list @stagewise/toolbar
```

应该看到：
```
└── @stagewise/toolbar@0.6.3
```

### 2. 确认开发服务器正在运行

在终端运行：
```bash
npm run dev
```

应该看到：
```
▲ Next.js 14.2.25
- Local:        http://localhost:3000
```

### 3. 打开浏览器并检查控制台

1. 访问 `http://localhost:3000`
2. 打开开发者工具（F12 或 Cmd+Option+I）
3. 查看 Console 标签页

**应该看到的成功消息：**
- ✅ `Stagewise toolbar initialized successfully`
- 💡 `点击页面上的元素来使用 Stagewise`

**可能看到的错误：**
- ⚠️ `Stagewise toolbar not available: [错误信息]` - 说明依赖未正确安装
- ❌ `Failed to initialize Stagewise toolbar: [错误信息]` - 说明初始化失败

### 4. 测试工具栏

1. 点击页面上的任意元素
2. 应该看到一个 Stagewise 工具栏出现在页面上
3. 工具栏应该显示元素的相关信息

### 5. 检查网络请求

在开发者工具的 Network 标签页中，检查是否有：
- Stagewise 相关的脚本加载
- WebSocket 连接（如果启用了 MCP）

## 常见问题

### 问题：控制台没有任何消息

**可能原因：**
1. 开发服务器未运行
2. 浏览器缓存问题
3. 组件未正确加载

**解决方案：**
1. 确认 `npm run dev` 正在运行
2. 硬刷新浏览器（Cmd+Shift+R 或 Ctrl+Shift+R）
3. 检查浏览器控制台是否有其他错误

### 问题：看到 "Stagewise toolbar not available" 警告

**可能原因：**
1. `@stagewise/toolbar` 包未正确安装
2. 模块导入路径错误

**解决方案：**
```bash
# 重新安装依赖
npm install -D @stagewise/toolbar --legacy-peer-deps

# 清理并重新构建
rm -rf .next node_modules
npm install
npm run dev
```

### 问题：工具栏初始化但点击元素没有反应

**可能原因：**
1. 工具栏的 iframe 可能被其他样式覆盖
2. 指针事件被禁用

**解决方案：**
检查是否有 CSS 样式阻止了工具栏的交互

### 问题：在 Cursor 命令面板中看不到任务

**可能原因：**
1. `.vscode/tasks.json` 文件位置不正确
2. Cursor 未识别任务配置

**解决方案：**
1. 确认 `.vscode/tasks.json` 存在于项目根目录
2. 重启 Cursor 编辑器
3. 或手动运行命令：
   ```bash
   npm install -D @stagewise/toolbar --legacy-peer-deps
   ```

## 手动测试

如果想直接测试 Stagewise 是否工作，可以在浏览器控制台中运行：

```javascript
import('@stagewise/toolbar').then(({ initToolbar }) => {
  initToolbar({ plugins: [] });
  console.log('Stagewise toolbar initialized!');
});
```

如果这能工作，说明依赖已正确安装，问题可能在组件加载时机。

